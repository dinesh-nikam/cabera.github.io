import { NextRequest, NextResponse } from "next/server";
import { assignDriverAndVehicle } from "@/lib/services/dispatch-service";

type RouteParams = {
  params: Promise<{ id: string }>
}

// POST /api/bookings/[id]/assign-driver
export async function POST(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { driverId, vehicleId } = body;

    if (!driverId || !vehicleId) {
      return NextResponse.json(
        { error: "driverId and vehicleId are required" },
        { status: 400 }
      );
    }

    const booking = await assignDriverAndVehicle(id, driverId, vehicleId);
    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error assigning driver to booking:", error);
    const message = error instanceof Error ? error.message : "Failed to assign driver";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
