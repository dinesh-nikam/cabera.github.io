import { NextRequest, NextResponse } from "next/server";
import { getDrivers, createDriver } from "@/lib/services/driver-service";

// GET /api/drivers - List all drivers
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status") || undefined;
  const isOnlineStr = searchParams.get("isOnline");
  const search = searchParams.get("search") || undefined;
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!)
    : 1;
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit")!)
    : 20;

  let isOnline: boolean | undefined = undefined;
  if (isOnlineStr === "true") isOnline = true;
  if (isOnlineStr === "false") isOnline = false;

  try {
    const result = await getDrivers({
      status,
      isOnline,
      search,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error listing drivers:", error);
    return NextResponse.json(
      { error: "Failed to list drivers" },
      { status: 500 },
    );
  }
}

// POST /api/drivers - Register a new driver
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      alternativePhone,
      aadhaar,
      licenseNumber,
      licenseExpiry,
      experience,
      vehicleId,
    } = body;

    if (!name || !phone || !licenseNumber || !licenseExpiry) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const driver = await createDriver({
      name,
      phone,
      alternativePhone,
      aadhaar,
      licenseNumber,
      licenseExpiry: new Date(licenseExpiry),
      experience: experience ? parseInt(experience) : 0,
      vehicleId,
    });

    return NextResponse.json(driver, { status: 201 });
  } catch (error) {
    console.error("Error creating driver:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create driver";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
