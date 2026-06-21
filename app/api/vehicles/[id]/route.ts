import { NextRequest, NextResponse } from "next/server";
import {
  getVehicle,
  updateVehicle,
  deleteVehicle,
  updateVehicleStatus,
  assignDriverToVehicle,
} from "@/lib/services/vehicle-service";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/vehicles/[id] - Get single vehicle
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  try {
    const vehicle = await getVehicle(id);

    if (!vehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }

    return NextResponse.json(vehicle);
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicle" },
      { status: 500 },
    );
  }
}

// PUT /api/vehicles/[id] - Update vehicle
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  try {
    const data = await request.json();

    const vehicle = await updateVehicle(id, data);

    return NextResponse.json(vehicle);
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return NextResponse.json(
      { error: "Failed to update vehicle" },
      { status: 500 },
    );
  }
}

// DELETE /api/vehicles/[id] - Delete vehicle (soft delete)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  try {
    await deleteVehicle(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return NextResponse.json(
      { error: "Failed to delete vehicle" },
      { status: 500 },
    );
  }
}

// PATCH /api/vehicles/[id] - Update vehicle status or assign driver
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  try {
    const data = await request.json();

    let vehicle;

    if (data.action === "assign-driver" && data.driverId) {
      vehicle = await assignDriverToVehicle(id, data.driverId);
    } else if (data.status) {
      vehicle = await updateVehicleStatus(id, data.status);
    } else {
      return NextResponse.json(
        { error: "Invalid action or missing parameters" },
        { status: 400 },
      );
    }

    return NextResponse.json(vehicle);
  } catch (error) {
    if (error instanceof Error && error.message.includes("already assigned")) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    console.error("Error patching vehicle:", error);
    return NextResponse.json(
      { error: "Failed to update vehicle" },
      { status: 500 },
    );
  }
}
