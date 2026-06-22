import { prisma } from "@/lib/prisma";
import { bookingStatusStateMachine } from "@/lib/state-machines/booking";
import { WhatsAppService } from "./whatsapp-service";

const whatsappService = new WhatsAppService();

/**
 * Fetch all live dispatch queue bookings
 */
export async function getLiveDispatchQueue() {
  return prisma.booking.findMany({
    where: {
      status: {
        in: [
          "PENDING",
          "CONFIRMED",
          "ASSIGNED",
          "DRIVER_REACHED",
          "TRIP_STARTED",
        ],
      },
    },
    include: {
      customer: true,
      driver: {
        include: {
          vehicle: true,
        },
      },
      vehicle: true,
    },
    orderBy: {
      pickupDateTime: "asc",
    },
  });
}

/**
 * Assign a driver and vehicle to a booking
 */
export async function assignDriverAndVehicle(
  bookingId: string,
  driverId: string,
  vehicleId: string,
) {
  // Validate driver
  const driver = await prisma.driver.findUnique({
    where: { id: driverId },
    include: { vehicle: true },
  });

  if (!driver) {
    throw new Error("Driver not found");
  }
  if (driver.status !== "ACTIVE") {
    throw new Error("Driver is not active");
  }

  // Validate vehicle
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: vehicleId },
  });

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }
  if (vehicle.status !== "ACTIVE") {
    throw new Error("Vehicle is not active");
  }

  // Update booking
  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      driverId,
      vehicleId,
      status: "ASSIGNED",
    },
    include: {
      customer: true,
      driver: true,
      vehicle: true,
    },
  });

  // Trigger WhatsApp notification for driver assignment
  try {
    await whatsappService.triggerByStatus(booking, "ASSIGNED");
  } catch (error) {
    console.error("Failed to send WhatsApp notification:", error);
  }

  // Create audit log entry
  try {
    await prisma.auditLog.create({
      data: {
        action: "ASSIGN_DRIVER",
        resourceType: "BOOKING",
        resourceId: bookingId,
        newData: `Driver: ${driver.name}, Vehicle: ${vehicle.registrationNumber}`,
        status: "SUCCESS",
      },
    });
  } catch (e) {
    console.error("Failed to create audit log:", e);
  }

  return booking;
}

/**
 * Update booking status with state machine checks
 */
export async function updateBookingStatus(
  bookingId: string,
  targetStatus: string,
  userRole: string,
) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { customer: true, driver: true, vehicle: true },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  const currentStatus = booking.status;

  if (!bookingStatusStateMachine.isValidStatus(targetStatus)) {
    throw new Error(`Invalid target status: ${targetStatus}`);
  }

  // Enforce transition logic using RBAC
  const canTransition = bookingStatusStateMachine.canTransition(
    currentStatus as any,
    targetStatus,
    userRole,
  );

  if (!canTransition) {
    throw new Error(
      `Role ${userRole} is not authorized to transition booking from ${currentStatus} to ${targetStatus}`,
    );
  }

  // Update booking state
  const updatedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: { status: targetStatus },
    include: { customer: true, driver: true, vehicle: true },
  });

  // Trigger status notifications
  try {
    await whatsappService.triggerByStatus(updatedBooking, targetStatus as any);
  } catch (error) {
    console.error("Failed to send WhatsApp notification:", error);
  }

  // Log transition in audit log
  try {
    await prisma.auditLog.create({
      data: {
        action: `TRANSITION_${targetStatus}`,
        resourceType: "BOOKING",
        resourceId: bookingId,
        oldData: currentStatus,
        newData: targetStatus,
        status: "SUCCESS",
      },
    });
  } catch (e) {
    console.error("Failed to write audit log:", e);
  }

  return updatedBooking;
}
