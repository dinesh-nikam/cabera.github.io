import { prisma } from "@/lib/prisma";
import type { BookingStatus } from "@/lib/state-machines/booking";

export function createBookingService() {
  return {
    async getBooking(bookingId: string) {
      return prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          customer: true,
          driver: {
            include: {
              vehicle: true,
            },
          },
          vehicle: true,
          payment: true,
          review: true,
        },
      });
    },

    async getBookingsByCustomer(customerId: string) {
      return prisma.booking.findMany({
        where: { customerId },
        include: {
          driver: {
            include: { vehicle: true },
          },
          vehicle: true,
        },
        orderBy: { createdAt: "desc" },
      });
    },

    async getBookingsByDriver(driverId: string) {
      return prisma.booking.findMany({
        where: { driverId },
        include: {
          customer: true,
        },
        orderBy: { pickupDateTime: "desc" },
      });
    },

    async updateBookingStatus(bookingId: string, status: BookingStatus) {
      return prisma.booking.update({
        where: { id: bookingId },
        data: { status },
      });
    },

    async updateDriverLocation(driverId: string, lat: number, lng: number) {
      return prisma.driver.update({
        where: { id: driverId },
        data: {
          lastLocationLat: lat,
          lastLocationLng: lng,
        },
      });
    },
  };
}
