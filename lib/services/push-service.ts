import { prisma } from "@/lib/prisma";

// VAPID keys - in production, generate these with web-push
const VAPID_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "BEl7yYJ6...";
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || "x4k...";

export interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export class PushNotificationService {
  // Store subscription for user
  async saveSubscription(userId: string, subscription: PushSubscription) {
    return prisma.setting.upsert({
      where: { key: `push_subscription_${userId}` },
      create: {
        key: `push_subscription_${userId}`,
        value: JSON.stringify(subscription),
        isPublic: false,
      },
      update: {
        value: JSON.stringify(subscription),
      },
    });
  }

  // Get user subscription
  async getSubscription(userId: string): Promise<PushSubscription | null> {
    const setting = await prisma.setting.findUnique({
      where: { key: `push_subscription_${userId}` },
    });

    return setting ? JSON.parse(setting.value) : null;
  }

  // Remove subscription
  async removeSubscription(userId: string) {
    return prisma.setting.delete({
      where: { key: `push_subscription_${userId}` },
    });
  }

  // Send notification to user
  async notifyUser(
    userId: string,
    title: string,
    body: string,
    data?: Record<string, string>,
  ) {
    const subscription = await this.getSubscription(userId);

    if (!subscription) {
      console.log("No push subscription found for user", userId);
      return false;
    }

    // In production, use web-push library to send notifications
    // This is a mock implementation
    console.log(`[Push] ${title}: ${body}`, data);

    // Store notification in database for history
    await prisma.analyticsEvent.create({
      data: {
        eventType: "push_notification_sent",
        eventData: JSON.stringify({ title, body, userId }),
        path: data?.url || "/notifications",
      },
    });

    return true;
  }

  // Notify booking status change
  async notifyBookingStatus(
    bookingId: string,
    oldStatus: string,
    newStatus: string,
  ) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: true,
      },
    });

    if (!booking?.user) return;

    const statusMessages: Record<string, string> = {
      PENDING: "Your booking request has been received",
      CONFIRMED: "Your booking is confirmed!",
      ASSIGNED: "A driver has been assigned to your ride",
      DRIVER_REACHED: "Driver has arrived at pickup location",
      TRIP_STARTED: "Your trip has started",
      COMPLETED: "Trip completed successfully",
      CANCELLED: "Booking was cancelled",
    };

    const message = statusMessages[newStatus];

    if (message) {
      await this.notifyUser(booking.user.id, "Booking Update", message, {
        bookingId,
        url: `/tracking/${bookingId}`,
      });
    }
  }
}

export default new PushNotificationService();
