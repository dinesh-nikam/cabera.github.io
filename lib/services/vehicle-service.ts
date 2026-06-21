/**
 * Vehicle Service - CRUD operations and business logic
 */

import { prisma } from "@/lib/prisma";
import { Vehicle } from "@prisma/client";

export interface VehicleFormData {
  registrationNumber: string;
  make: string;
  model: string;
  vehicleType:
    | "SEDAN"
    | "SUV"
    | "PREMIUM_SUV"
    | "LUXURY"
    | "TEMPO_TRAVELLER"
    | "MINI_BUS";
  seatingCapacity: number;
  luggageCapacity: number;
  fuelType: "PETROL" | "DIESEL" | "CNG" | "ELECTRIC";
  color?: string;
  year: number;
  insuranceExpiry: Date;
  permitExpiry: Date;
  features: string[];
}

export interface VehicleFilters {
  status?: "ACTIVE" | "INACTIVE" | "MAINTENANCE" | "DOCUMENT_EXPIRED";
  vehicleType?: string;
  driverId?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface VehiclePaginatedResponse {
  vehicles: Vehicle[];
  total: number;
  pages: number;
  currentPage: number;
}

/**
 * Create a new vehicle
 */
export async function createVehicle(
  data: VehicleFormData,
  userId?: string,
): Promise<Vehicle> {
  // Validate registration number uniqueness
  const existing = await prisma.vehicle.findUnique({
    where: { registrationNumber: data.registrationNumber },
  });

  if (existing) {
    throw new Error("Vehicle with this registration number already exists");
  }

  // Check document expiry
  const now = new Date();
  const hasExpiredDocs = data.insuranceExpiry < now || data.permitExpiry < now;

  // Create vehicle
  const vehicle = await prisma.vehicle.create({
    data: {
      registrationNumber: data.registrationNumber.toUpperCase(),
      make: data.make,
      model: data.model,
      vehicleType: data.vehicleType,
      seatingCapacity: data.seatingCapacity,
      luggageCapacity: data.luggageCapacity,
      fuelType: data.fuelType,
      color: data.color,
      year: data.year,
      insuranceExpiry: data.insuranceExpiry,
      permitExpiry: data.permitExpiry,
      pollutionExpiry: data.permitExpiry, // Same as permit by default
      fitnessExpiry: addOneYear(data.permitExpiry),
      features: JSON.stringify(data.features),
      status: hasExpiredDocs ? "DOCUMENT_EXPIRED" : "ACTIVE",
      isActive: !hasExpiredDocs,
    },
  });

  return vehicle;
}

/**
 * Get all vehicles with filters and pagination
 */
export async function getVehicles(
  filters: VehicleFilters = {},
): Promise<VehiclePaginatedResponse> {
  const {
    status,
    vehicleType,
    driverId,
    search,
    page = 1,
    limit = 20,
  } = filters;

  const where: Record<string, unknown> = {};

  if (status) where.status = status;
  if (vehicleType) where.vehicleType = vehicleType;
  if (driverId) where.driverId = driverId;
  if (search) {
    where.OR = [
      { registrationNumber: { contains: search, mode: "insensitive" } },
      { make: { contains: search, mode: "insensitive" } },
      { model: { contains: search, mode: "insensitive" } },
    ];
  }

  const [vehicles, total] = await Promise.all([
    prisma.vehicle.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        driver: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.vehicle.count({ where }),
  ]);

  return {
    vehicles,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page,
  };
}

/**
 * Get single vehicle by ID
 */
export async function getVehicle(id: string): Promise<Vehicle | null> {
  return prisma.vehicle.findUnique({
    where: { id },
    include: {
      driver: true,
      bookings: {
        take: 10,
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

/**
 * Update vehicle
 */
export async function updateVehicle(
  id: string,
  data: Partial<VehicleFormData>,
): Promise<Vehicle> {
  const updateData: any = {
    ...data,
  };
  if (data.features) {
    updateData.features = JSON.stringify(data.features);
  }
  const vehicle = await prisma.vehicle.update({
    where: { id },
    data: updateData,
  });

  return vehicle;
}

/**
 * Delete vehicle (soft delete by setting inactive)
 */
export async function deleteVehicle(id: string): Promise<void> {
  await prisma.vehicle.update({
    where: { id },
    data: {
      isActive: false,
      status: "INACTIVE",
    },
  });
}

/**
 * Update vehicle status
 */
export async function updateVehicleStatus(
  id: string,
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE" | "DOCUMENT_EXPIRED",
): Promise<Vehicle> {
  return prisma.vehicle.update({
    where: { id },
    data: { status, isActive: status === "ACTIVE" },
  });
}

/**
 * Assign driver to vehicle
 */
export async function assignDriverToVehicle(
  vehicleId: string,
  driverId: string,
): Promise<Vehicle> {
  // Check if driver already has a vehicle
  const existingAssignment = await prisma.vehicle.findFirst({
    where: { driverId, id: { not: vehicleId } },
  });

  if (existingAssignment) {
    throw new Error("Driver already assigned to another vehicle");
  }

  return prisma.vehicle.update({
    where: { id: vehicleId },
    data: { driverId },
  });
}

/**
 * Get vehicle statistics
 */
export async function getVehicleStats(): Promise<{
  total: number;
  active: number;
  maintenance: number;
  byType: Record<string, number>;
}> {
  const vehicles = await prisma.vehicle.findMany({
    where: { isActive: true },
  });

  const byType: Record<string, number> = {};
  vehicles.forEach((v: Vehicle) => {
    const type = v.vehicleType;
    byType[type] = (byType[type] || 0) + 1;
  });

  return {
    total: await prisma.vehicle.count(),
    active: await prisma.vehicle.count({ where: { isActive: true } }),
    maintenance: await prisma.vehicle.count({
      where: { status: "MAINTENANCE" },
    }),
    byType,
  };
}

/**
 * Check for document expiry warnings
 */
export async function getExpiringDocuments(
  daysThreshold: number = 30,
): Promise<Vehicle[]> {
  const thresholdDate = new Date();
  thresholdDate.setDate(thresholdDate.getDate() + daysThreshold);

  return prisma.vehicle.findMany({
    where: {
      OR: [
        { insuranceExpiry: { lte: thresholdDate } },
        { permitExpiry: { lte: thresholdDate } },
        { fitnessExpiry: { lte: thresholdDate } },
      ],
      isActive: true,
    },
  });
}

function addOneYear(date: Date): Date {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + 1);
  return newDate;
}
