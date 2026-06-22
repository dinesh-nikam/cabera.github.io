import { prisma } from "@/lib/prisma";

// Payment gateway types
export type PaymentMethod =
  | "RAZORPAY"
  | "STRIPE"
  | "UPI"
  | "NETBANKING"
  | "CASH";

export interface CreatePaymentIntentParams {
  bookingId: string;
  amount: number; // in paise for Razorpay
  method: PaymentMethod;
  customerPhone: string;
  customerEmail?: string;
}

export interface PaymentIntent {
  id: string;
  clientSecret?: string;
  keyId?: string;
  orderId?: string;
  amount: number;
  currency: string;
}

// Payment service supporting both Razorpay and Stripe
export class PaymentService {
  private razorpayKeyId = process.env.RAZORPAY_KEY_ID;
  private razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
  private stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  // Create Razorpay order
  async createRazorpayOrder(
    params: CreatePaymentIntentParams,
  ): Promise<PaymentIntent> {
    if (!this.razorpayKeyId || !this.razorpayKeySecret) {
      throw new Error("Razorpay not configured");
    }

    // In production, call Razorpay API to create order
    // For demo, create mock order
    const orderId = `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    // Create payment record in database
    const payment = await prisma.payment.create({
      data: {
        bookingId: params.bookingId,
        paymentMethod: "RAZORPAY",
        amount: params.amount,
        status: "PENDING",
        transactionId: orderId,
      },
    });

    return {
      id: payment.id,
      orderId,
      keyId: this.razorpayKeyId,
      amount: params.amount,
      currency: "INR",
    };
  }

  // Create Stripe payment intent
  async createStripePayment(
    params: CreatePaymentIntentParams,
  ): Promise<PaymentIntent> {
    if (!this.stripeSecretKey) {
      throw new Error("Stripe not configured");
    }

    // In production, call Stripe API to create payment intent
    const clientSecret = `pi_${Date.now()}_${Math.random().toString(36).slice(2, 8)}_secret`;

    const payment = await prisma.payment.create({
      data: {
        bookingId: params.bookingId,
        paymentMethod: "STRIPE",
        amount: params.amount,
        status: "PENDING",
        transactionId: clientSecret,
      },
    });

    return {
      id: payment.id,
      clientSecret,
      amount: params.amount,
      currency: "INR",
    };
  }

  // Verify payment
  async verifyPayment(
    paymentId: string,
    orderId: string,
    signature: string,
    gateway: "RAZORPAY" | "STRIPE",
  ): Promise<boolean> {
    // In production, verify Razorpay/Stripe signature

    const payment = await prisma.payment.findFirst({
      where: {
        transactionId: orderId,
        bookingId: paymentId,
      },
    });

    if (!payment) {
      return false;
    }

    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: "SUCCESS",
        gatewayOrderId: orderId,
        gatewayPaymentId: signature,
      },
    });

    // Update booking payment status
    await prisma.booking.update({
      where: { id: payment.bookingId },
      data: { paymentStatus: "COMPLETED" },
    });

    return true;
  }

  // Refund payment
  async refundPayment(paymentId: string, amount?: number): Promise<boolean> {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment || payment.status !== "SUCCESS") {
      return false;
    }

    // In production, call Razorpay/Stripe refund API

    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: "REFUNDED",
        updatedAt: new Date(),
      },
    });

    return true;
  }

  // Get payment by booking
  async getPaymentByBooking(bookingId: string) {
    return prisma.payment.findUnique({
      where: { bookingId },
    });
  }

  // Process UPI payment (mock)
  async processUPIPayment(
    params: CreatePaymentIntentParams,
  ): Promise<PaymentIntent> {
    // UPI payments - generate QR code or collect via app
    const transactionId = `upi_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const payment = await prisma.payment.create({
      data: {
        bookingId: params.bookingId,
        paymentMethod: "UPI",
        amount: params.amount,
        status: "PENDING",
        transactionId,
      },
    });

    return {
      id: payment.id,
      orderId: transactionId,
      amount: params.amount,
      currency: "INR",
    };
  }
}

export default new PaymentService();
