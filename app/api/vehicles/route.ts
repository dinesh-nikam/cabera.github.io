// NOTE: Auth check disabled for initial implementation - add when auth is configured
// For now, direct access to API for development/testing

import { NextRequest, NextResponse } from "next/server";
import { getVehicles, createVehicle } from "@/lib/services/vehicle-service";

// GET /api/vehicles - List all vehicles
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status") as
    | "ACTIVE"
    | "INACTIVE"
    | "MAINTENANCE"
    | "DOCUMENT_EXPIRED"
    | undefined;
  const vehicleType = searchParams.get("type") || undefined;
  const driverId = searchParams.get("driverId") || undefined;
  const search = searchParams.get("search") || undefined;
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!)
    : 1;
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit")!)
    : 20;

  try {
    const result = await getVehicles({
      status,
      vehicleType,
      driverId,
      search,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 },
    );
  }
}

// POST /api/vehicles - Create new vehicle
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const vehicle = await createVehicle(data);

    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message.includes("already exists")) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    console.error("Error creating vehicle:", error);
    return NextResponse.json(
      { error: "Failed to create vehicle" },
      { status: 500 },
    );
  }
}
