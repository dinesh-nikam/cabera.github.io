import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: driverId } = await params;
    const body = await request.json();
    const { lat, lng, heading, speed } = body;

    // Validate input
    if (typeof lat !== "number" || typeof lng !== "number") {
      return NextResponse.json(
        { error: "Invalid location data" },
        { status: 400 },
      );
    }

    // Validate driver exists
    const driver = await prisma.driver.findUnique({
      where: { id: driverId },
      select: { id: true, status: true },
    });

    if (!driver) {
      return NextResponse.json({ error: "Driver not found" }, { status: 404 });
    }

    // Update driver location
    const updated = await prisma.driver.update({
      where: { id: driverId },
      data: {
        lastLocationLat: lat,
        lastLocationLng: lng,
        heading: heading || null,
        speed: speed || null,
      },
    });

    // Return success
    return NextResponse.json({
      success: true,
      location: {
        lat: updated.lastLocationLat,
        lng: updated.lastLocationLng,
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Location update error:", error);
    return NextResponse.json(
      { error: "Failed to update location" },
      { status: 500 },
    );
  }
}
