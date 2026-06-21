// ============================================
// WHATSAPP AUTOMATION SERVICE
// ============================================

import { TemplateCategory, BookingStatus } from "@/lib/types";

interface WhatsAppMessage {
  to: string;
  template: TemplateCategory;
  variables: Record<string, string>;
}

export class WhatsAppService {
  private templates: Record<
    TemplateCategory,
    (vars: Record<string, string>) => string
  > = {
    BOOKING_CREATED: ({ bookingNumber, customerName, pickupDateTime }) =>
      `Hello ${customerName}! Your booking ${bookingNumber} has been created for ${pickupDateTime}. Our team will contact you shortly.`,

    BOOKING_CONFIRMED: ({ bookingNumber, driverName, driverPhone }) =>
      `Your booking ${bookingNumber} is confirmed! Driver: ${driverName}, Phone: ${driverPhone}`,

    DRIVER_ASSIGNED: ({ bookingNumber, driverName, driverPhone, eta }) =>
      `Driver ${driverName} is assigned to your booking ${bookingNumber}. ETA: ${eta} mins. Phone: ${driverPhone}`,

    TRIP_STARTED: ({ bookingNumber, driverName }) =>
      `Trip started for booking ${bookingNumber}. Have a safe journey with ${driverName}!`,

    TRIP_COMPLETED: ({ bookingNumber, fare }) =>
      `Trip completed for booking ${bookingNumber}. Total fare: ₹${fare}. Thank you for choosing us!`,

    REVIEW_REQUEST: ({ bookingNumber }) =>
      `How was your ride? Please rate your experience for booking ${bookingNumber}: https://punemumbaicab.com/review`,

    PROMO: ({ discount, code }) =>
      `Special offer! Get ${discount}% off with code ${code}. Valid for next 24 hours only!`,

    REMINDER: ({ pickupDateTime, pickupAddress }) =>
      `Reminder: Your cab is scheduled for ${pickupDateTime} from ${pickupAddress}`,
  };

  async sendMessage(
    message: WhatsAppMessage,
  ): Promise<{ success: boolean; messageId?: string }> {
    // Would integrate with Twilio, Gupshup, or Meta WhatsApp API
    const body = this.templates[message.template](message.variables);

    // Simulate API call
    console.log(`WhatsApp to ${message.to}:`, body);

    return { success: true, messageId: `wamid-${Date.now()}` };
  }

  // Trigger messages based on booking status changes
  async triggerByStatus(booking: any, status: BookingStatus): Promise<void> {
    const customer = booking.customer;

    const messageMap: Record<BookingStatus, TemplateCategory | null> = {
      DRAFT: null,
      PENDING: "BOOKING_CONFIRMED",
      CONFIRMED: "BOOKING_CONFIRMED",
      ASSIGNED: "DRIVER_ASSIGNED",
      DRIVER_REACHED: "DRIVER_ASSIGNED",
      TRIP_STARTED: "TRIP_STARTED",
      COMPLETED: "TRIP_COMPLETED",
      CANCELLED: null,
      NO_SHOW: null,
    };

    const template = messageMap[status];
    if (!template) return;

    const variables: Record<string, string> = {
      bookingNumber: booking.bookingNumber,
      customerName: customer.name,
      pickupDateTime: booking.pickupDateTime.toISOString(),
      driverName: booking.driver?.name || "",
      driverPhone: booking.driver?.phone || "",
      fare: booking.totalAmount.toString(),
      eta: "15", // Calculate dynamically
      discount: "10",
      code: "WELCOME10",
      pickupAddress: booking.pickupAddress,
    };

    await this.sendMessage({
      to: customer.phone,
      template,
      variables,
    });
  }

  // Bulk message for promotions
  async sendBulkMessages(
    customers: Array<{ phone: string; name: string }>,
    template: TemplateCategory,
    variables: any,
  ): Promise<void> {
    // Would use queue system for bulk sending
    for (const customer of customers) {
      await this.sendMessage({
        to: customer.phone,
        template,
        variables: { ...variables, customerName: customer.name },
      });
    }
  }
}
