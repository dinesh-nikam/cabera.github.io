// Server-Sent Events endpoint for real-time tracking (Next.js compatible)
import { prisma } from "@/lib/prisma";

interface TrackingMessage {
  type: "location_update" | "status_update" | "ping";
  payload: any;
}

// WebSocket endpoint for real-time tracking
// Note: Next.js API Routes have limited WebSocket support
// For production, consider using a separate WebSocket server or socket.io

export async function GET(request: Request) {
  const url = new URL(request.url);
  const bookingId = url.searchParams.get("bookingId");

  if (!bookingId) {
    return new Response("Missing bookingId", { status: 400 });
  }

  // Server-Sent Events fallback for browsers without WebSocket support
  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (data: TrackingMessage) => {
        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
      };

      // Send initial booking status
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: { driver: true },
      });

      if (
        booking?.driverId &&
        booking.driver?.lastLocationLat &&
        booking.driver?.lastLocationLng
      ) {
        sendEvent({
          type: "location_update",
          payload: {
            lat: booking.driver.lastLocationLat,
            lng: booking.driver.lastLocationLng,
            heading: booking.driver.heading,
            speed: booking.driver.speed,
            lastUpdated: new Date().toISOString(),
          },
        });
      }

      // Poll for updates every 10 seconds
      const interval = setInterval(async () => {
        try {
          const updatedBooking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: { driver: true },
          });

          if (
            updatedBooking?.driverId &&
            updatedBooking.driver?.lastLocationLat &&
            updatedBooking.driver?.lastLocationLng
          ) {
            sendEvent({
              type: "location_update",
              payload: {
                lat: updatedBooking.driver.lastLocationLat,
                lng: updatedBooking.driver.lastLocationLng,
                heading: updatedBooking.driver.heading,
                speed: updatedBooking.driver.speed,
                lastUpdated: new Date().toISOString(),
              },
            });
          }
        } catch (error) {
          console.error("Tracking error:", error);
        }
      }, 10000);

      // Cleanup on close
      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
