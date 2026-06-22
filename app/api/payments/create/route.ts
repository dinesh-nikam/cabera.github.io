import { NextRequest, NextResponse } from "next/server";
import paymentService from "@/lib/services/payment-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, amount, method, customerPhone, customerEmail } = body;

    if (!bookingId || !amount || !method) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const paymentIntent = await paymentService.createRazorpayOrder({
      bookingId,
      amount,
      method,
      customerPhone,
      customerEmail,
    });

    return NextResponse.json(paymentIntent);
  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 },
    );
  }
}
