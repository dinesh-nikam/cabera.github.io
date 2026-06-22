import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bookingStatusStateMachine } from "@/lib/state-machines/booking";

// GET /api/bookings - List all bookings with filters
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");
  const date = searchParams.get("date");

  const where: any = {};
  if (status && bookingStatusStateMachine.isValidStatus(status)) {
    where.status = status;
  }
  if (date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    where.pickupDateTime = {
      gte: startOfDay,
      lte: endOfDay,
    };
  }

  try {
    const bookings = await prisma.booking.findMany({
      where,
      include: {
        customer: true,
        driver: {
          include: {
            vehicle: true,
          },
        },
        vehicle: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error listing bookings:", error);
    return NextResponse.json(
      { error: "Failed to list bookings" },
      { status: 500 },
    );
  }
}

// POST /api/bookings - Create new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      pickupAddress,
      dropAddress,
      pickupDateTime,
      tripType = "ONE_WAY",
      vehicleType = "SEDAN",
      customerId,
      // For manual booking inline creation:
      customerName,
      customerPhone,
      customerEmail,
    } = body;

    // Validate required fields
    if (!pickupAddress || !dropAddress || !pickupDateTime) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: pickupAddress, dropAddress, pickupDateTime",
        },
        { status: 400 },
      );
    }

    let finalCustomerId = customerId;

    // Auto-create customer if details are provided and customerId is missing
    if (!finalCustomerId && customerName && customerPhone) {
      // Check if customer already exists by phone
      let existingCustomer = await prisma.customer.findFirst({
        where: { phone: customerPhone },
      });

      if (!existingCustomer) {
        existingCustomer = await prisma.customer.create({
          data: {
            customerCode: `CUST-${Date.now()}`,
            name: customerName,
            phone: customerPhone,
            email: customerEmail || null,
            city: "Pune", // Default city
            source: "DIRECT",
          },
        });
      }
      finalCustomerId = existingCustomer.id;
    }

    if (!finalCustomerId) {
      return NextResponse.json(
        {
          error:
            "A valid customerId or customer details (name and phone) are required",
        },
        { status: 400 },
      );
    }

    // Calculate fare using pricing engine
    const fare = calculateFare({ pickupAddress, dropAddress, vehicleType });

    // Create booking in DRAFT status
    const booking = await prisma.booking.create({
      data: {
        bookingNumber: `PMCB-${Date.now()}`,
        pickupAddress,
        dropAddress,
        pickupDateTime: new Date(pickupDateTime),
        tripType,
        vehicleType,
        estimatedDistance: fare.distance,
        estimatedDuration: fare.duration,
        baseFare: fare.baseFare,
        distanceFare: fare.distanceFare,
        tollCharges: fare.tollCharges,
        driverAllowance: fare.driverAllowance,
        airportFee: fare.airportFee,
        stateTax: fare.stateTax,
        nightCharges: fare.nightCharges,
        totalAmount: fare.total,
        customerId: finalCustomerId,
        status: "PENDING", // Start at PENDING for operator manual booking
        paymentStatus: "PENDING",
      },
      include: {
        customer: true,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 },
    );
  }
}

function calculateFare(data: any) {
  // Simple pricing mock in API, PricingEngine is used inside booking widget.
  // We mirror standard rates
  const baseRates: Record<string, number> = {
    SEDAN: 1500,
    SUV: 2000,
    PREMIUM_SUV: 2500,
    LUXURY: 4000,
  };
  const category = data.vehicleType?.toUpperCase() || "SEDAN";
  const basePrice = baseRates[category] || 1500;
  const distance = 150; // Pune - Mumbai default
  const perKm =
    category === "LUXURY"
      ? 35
      : category === "PREMIUM_SUV"
        ? 22
        : category === "SUV"
          ? 20
          : 15;
  const distanceFare = distance * perKm;
  const toll = 320;
  const allowance = 300;
  const total = basePrice + distanceFare + toll + allowance;

  return {
    distance,
    duration: 210, // 3.5 hrs
    baseFare: basePrice,
    distanceFare,
    tollCharges: toll,
    driverAllowance: allowance,
    airportFee: 0,
    stateTax: Math.round(total * 0.05),
    nightCharges: 0,
    total,
  };
}
