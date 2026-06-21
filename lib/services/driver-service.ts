import { prisma } from "@/lib/prisma";
import { Driver } from "@prisma/client";

export interface DriverFormData {
  name: string;
  phone: string;
  alternativePhone?: string;
  aadhaar?: string;
  licenseNumber: string;
  licenseExpiry: Date;
  experience?: number;
  userId?: string;
  vehicleId?: string;
}

export interface DriverFilters {
  status?: string;
  isOnline?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface DriverPaginatedResponse {
  drivers: any[];
  total: number;
  pages: number;
  currentPage: number;
}

/**
 * Create a new driver
 */
export async function createDriver(data: DriverFormData): Promise<Driver> {
  const existing = await prisma.driver.findFirst({
    where: {
      OR: [
        { phone: data.phone },
        { licenseNumber: data.licenseNumber }
      ]
    }
  });

  if (existing) {
    throw new Error("Driver with this phone or license number already exists");
  }

  // Create driver user first if userId not provided
  let finalUserId = data.userId;
  if (!finalUserId) {
    const user = await prisma.user.create({
      data: {
        email: `${data.phone}@cabera-driver.com`,
        phone: data.phone,
        name: data.name,
        role: "DRIVER",
        status: "ACTIVE"
      }
    });
    finalUserId = user.id;
  }

  const driver = await prisma.driver.create({
    data: {
      name: data.name,
      phone: data.phone,
      alternativePhone: data.alternativePhone,
      aadhaar: data.aadhaar,
      licenseNumber: data.licenseNumber,
      licenseExpiry: data.licenseExpiry,
      experience: data.experience || 0,
      status: "ACTIVE",
      userId: finalUserId,
      vehicleId: data.vehicleId || null
    }
  });

  // If vehicle is specified, update the vehicle assignments
  if (data.vehicleId) {
    await prisma.vehicle.update({
      where: { id: data.vehicleId },
      data: { driverId: driver.id }
    });
  }

  return driver;
}

/**
 * Get all drivers with filters
 */
export async function getDrivers(filters: DriverFilters = {}): Promise<DriverPaginatedResponse> {
  const { status, isOnline, search, page = 1, limit = 20 } = filters;

  const where: any = {};

  if (status) where.status = status;
  if (isOnline !== undefined) where.isOnline = isOnline;
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { phone: { contains: search } },
      { licenseNumber: { contains: search } }
    ];
  }

  const [drivers, total] = await Promise.all([
    prisma.driver.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        vehicle: true,
        user: true
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.driver.count({ where })
  ]);

  return {
    drivers,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page
  };
}

/**
 * Get driver by ID
 */
export async function getDriver(id: string) {
  return prisma.driver.findUnique({
    where: { id },
    include: {
      vehicle: true,
      user: true,
      bookings: {
        take: 10,
        orderBy: { createdAt: "desc" }
      }
    }
  });
}

/**
 * Update driver info
 */
export async function updateDriver(id: string, data: Partial<DriverFormData>) {
  // If vehicle assignment changes
  if (data.vehicleId !== undefined) {
    // Clear old vehicle association
    await prisma.vehicle.updateMany({
      where: { driverId: id },
      data: { driverId: null }
    });

    if (data.vehicleId) {
      await prisma.vehicle.update({
        where: { id: data.vehicleId },
        data: { driverId: id }
      });
    }
  }

  const updateData: any = { ...data };
  delete updateData.vehicleId; // Managed separately above

  return prisma.driver.update({
    where: { id },
    data: updateData,
    include: { vehicle: true }
  });
}

/**
 * Update driver location mock
 */
export async function updateDriverLocation(id: string, lat: number, lng: number): Promise<Driver> {
  return prisma.driver.update({
    where: { id },
    data: {
      lastLocationLat: lat,
      lastLocationLng: lng
    }
  });
}

/**
 * Set online/offline status
 */
export async function setDriverOnlineStatus(id: string, isOnline: boolean): Promise<Driver> {
  return prisma.driver.update({
    where: { id },
    data: { isOnline }
  });
}
