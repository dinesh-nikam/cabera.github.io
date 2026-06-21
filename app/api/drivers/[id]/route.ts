import { NextRequest, NextResponse } from "next/server";
import { getDriver, updateDriver, setDriverOnlineStatus, updateDriverLocation } from "@/lib/services/driver-service";

type RouteParams = {
  params: Promise<{ id: string }>
}

// GET /api/drivers/[id] - Fetch a single driver's profile
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const driver = await getDriver(id);
    if (!driver) {
      return NextResponse.json({ error: "Driver not found" }, { status: 404 });
    }
    return NextResponse.json(driver);
  } catch (error) {
    console.error("Error fetching driver:", error);
    return NextResponse.json({ error: "Failed to fetch driver" }, { status: 500 });
  }
}

// PUT /api/drivers/[id] - Update a driver's details, online status, or location
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { isOnline, latitude, longitude, ...data } = body;

    // Toggle online status if explicitly passed
    if (isOnline !== undefined) {
      const driver = await setDriverOnlineStatus(id, !!isOnline);
      return NextResponse.json(driver);
    }

    // Update location coordinate mocks if passed
    if (latitude !== undefined && longitude !== undefined) {
      const driver = await updateDriverLocation(id, parseFloat(latitude), parseFloat(longitude));
      return NextResponse.json(driver);
    }

    // Otherwise, perform regular driver details update
    const updated = await updateDriver(id, {
      ...data,
      licenseExpiry: data.licenseExpiry ? new Date(data.licenseExpiry) : undefined,
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating driver:", error);
    const message = error instanceof Error ? error.message : "Failed to update driver";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
