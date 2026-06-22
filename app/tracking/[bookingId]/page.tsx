import { notFound } from "next/navigation";
import { TrackingProvider } from "@/lib/tracking/tracking-context";
import { TrackingMap } from "@/components/ui/tracking-map";
import { Clock, MapPin, Car, Phone } from "lucide-react";
import Link from "next/link";

// This would be fetched from database in real implementation
async function getBookingDetails(bookingId: string) {
  // Placeholder - in production, use Prisma to fetch real booking
  return {
    id: bookingId,
    bookingNumber: "PMCB-2026-001",
    pickupAddress: "Hinjewadi Phase 1, Pune",
    dropAddress: "Mumbai Airport Terminal 2",
    status: "ASSIGNED",
  };
}

export default async function TrackingPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = await params;
  const booking = await getBookingDetails(bookingId);

  if (!booking) {
    notFound();
  }

  return (
    <TrackingProvider bookingId={bookingId}>
      <div className="min-h-screen bg-background pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-heading mb-2">
              Track Your Ride
            </h1>
            <p className="text-text-secondary font-body">
              Booking #{booking.bookingNumber}
            </p>
          </div>

          {/* Map */}
          <div className="h-[400px] mb-8 rounded-2xl overflow-hidden">
            <TrackingMap
              bookingId={bookingId}
              pickupLat={18.56}
              pickupLng={73.78}
              dropLat={19.09}
              dropLng={72.87}
              className="h-full"
            />
          </div>

          {/* Trip Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="glass p-6 rounded-xl">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-luxury-400 mt-1" />
                <div>
                  <p className="text-xs text-text-secondary uppercase tracking-widest font-body">
                    Pickup
                  </p>
                  <p className="text-white font-body">
                    {booking.pickupAddress}
                  </p>
                </div>
              </div>
            </div>

            <div className="glass p-6 rounded-xl">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-400 mt-1" />
                <div>
                  <p className="text-xs text-text-secondary uppercase tracking-widest font-body">
                    Drop
                  </p>
                  <p className="text-white font-body">{booking.dropAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Driver Info */}
          <div className="glass p-6 rounded-xl mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-luxury-400/20 rounded-full flex items-center justify-center">
                <Car className="w-8 h-8 text-luxury-400" />
              </div>
              <div>
                <p className="text-lg font-bold font-heading">
                  Driver Assigned
                </p>
                <p className="text-text-secondary font-body">
                  Toyota Innovia Crysta • MH-12-AB-1234
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Phone className="w-4 h-4 text-luxury-400" />
                  <span className="text-sm text-white">+91 98765 43210</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="glass p-6 rounded-xl">
            <h3 className="text-lg font-bold font-heading mb-4">Trip Status</h3>
            <div className="space-y-3">
              {[
                { status: "Pending", completed: true },
                { status: "Assigned", completed: true },
                { status: "Driver Reached", completed: false },
                { status: "Trip Started", completed: false },
                { status: "Completed", completed: false },
              ].map((step, idx) => (
                <div key={step.status} className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed ? "bg-luxury-400" : "bg-surface-light"
                    }`}
                  >
                    <span className="text-xs font-bold">
                      {step.completed ? "✓" : idx + 1}
                    </span>
                  </div>
                  <span
                    className={
                      step.completed ? "text-white" : "text-text-secondary"
                    }
                  >
                    {step.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TrackingProvider>
  );
}
