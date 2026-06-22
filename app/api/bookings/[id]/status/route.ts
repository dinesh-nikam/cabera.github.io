import { NextRequest, NextResponse } from "next/server";
import { updateBookingStatus } from "@/lib/services/dispatch-service";

type RouteParams = {
  params: Promise<{ id: string }>;
};

// PUT /api/bookings/[id]/status
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { status, role } = body;

    if (!status || !role) {
      return NextResponse.json(
        { error: "status and role are required" },
        { status: 400 },
      );
    }

    const booking = await updateBookingStatus(id, status, role);
    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error updating booking status:", error);
    const message =
      error instanceof Error ? error.message : "Failed to update status";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
