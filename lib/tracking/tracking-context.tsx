"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { BookingStatus } from "@/lib/state-machines/booking";

interface DriverLocation {
  lat: number;
  lng: number;
  heading?: number;
  speed?: number;
  lastUpdated: string;
}

interface TrackingContextType {
  driverLocation: DriverLocation | null;
  bookingStatus: BookingStatus;
  isConnected: boolean;
  error: string | null;
}

const TrackingContext = createContext<TrackingContextType>({
  driverLocation: null,
  bookingStatus: "DRAFT",
  isConnected: false,
  error: null,
});

export function useTracking() {
  return useContext(TrackingContext);
}

interface TrackingProviderProps {
  bookingId: string;
  children: React.ReactNode;
}

export function TrackingProvider({
  bookingId,
  children,
}: TrackingProviderProps) {
  const [driverLocation, setDriverLocation] = useState<DriverLocation | null>(
    null,
  );
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>("DRAFT");
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectSSE = useCallback(() => {
    if (!bookingId || typeof window === "undefined") return;

    const sseUrl = `${window.location.origin}/api/tracking/ws?bookingId=${bookingId}`;

    const eventSource = new EventSource(sseUrl);

    eventSource.onopen = () => {
      setIsConnected(true);
      setError(null);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "location_update") {
          setDriverLocation(data.payload);
        } else if (data.type === "status_update") {
          setBookingStatus(data.payload.status);
        }
      } catch (e) {
        console.error("Failed to parse tracking message:", e);
      }
    };

    eventSource.onerror = (err) => {
      setError("Connection error - real-time tracking unavailable");
      setIsConnected(false);
      console.error("SSE error:", err);
    };

    return () => {
      eventSource.close();
    };
  }, [bookingId]);

  useEffect(() => {
    const cleanup = connectSSE();
    return () => cleanup?.();
  }, [connectSSE]);

  return (
    <TrackingContext.Provider
      value={{ driverLocation, bookingStatus, isConnected, error }}
    >
      {children}
    </TrackingContext.Provider>
  );
}
