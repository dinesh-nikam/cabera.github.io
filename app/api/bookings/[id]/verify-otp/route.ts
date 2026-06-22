import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: bookingId } = await params;
  const body = await request.json();
  const { otp, phoneNumber } = body;

  // In production, verify against stored OTP
  // For demo, accept any 6-digit code
  const isValid = otp && otp.length === 6;

  if (isValid) {
    // Update booking as OTP verified
    // await prisma.booking.update({
    //   where: { id: bookingId },
    //   data: { otpVerified: true },
    // });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: bookingId } = await params;
  const body = await request.json();
  const { phoneNumber } = body;

  // Generate and send OTP
  const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

  // In production, send via WhatsApp
  console.log(
    `[OTP] Sending ${newOtp} to ${phoneNumber} for booking ${bookingId}`,
  );

  return NextResponse.json({ success: true, message: "OTP sent" });
}
