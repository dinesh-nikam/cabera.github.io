"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navigation, MapPin } from "lucide-react";

interface DriverTrackingBadgeProps {
  driverId: string;
  className?: string;
}

export function DriverTrackingBadge({
  driverId,
  className = "",
}: DriverTrackingBadgeProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  useEffect(() => {
    if (!driverId || !isTracking || typeof window === "undefined") return;

    let watchId: number;

    const startTracking = () => {
      if ("geolocation" in navigator) {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lng: longitude });

            // Send location to server
            fetch(`/api/drivers/${driverId}/location`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                lat: latitude,
                lng: longitude,
                heading: position.coords.heading || undefined,
                speed: position.coords.speed || undefined,
              }),
            }).catch(console.error);
          },
          (error) => {
            console.error("Geolocation error:", error);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 10000,
          },
        );
      }
    };

    startTracking();

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [driverId, isTracking]);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={() => setIsTracking(!isTracking)}
        className={`p-2 rounded-lg transition-all ${
          isTracking
            ? "bg-luxury-400 text-background"
            : "bg-surface-light text-text-secondary hover:text-white"
        }`}
        aria-label={
          isTracking ? "Stop location sharing" : "Start location sharing"
        }
      >
        <Navigation className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-1 text-xs">
        <div
          className={`w-2 h-2 rounded-full ${
            isTracking && location ? "bg-success" : "bg-text-secondary/30"
          }`}
        />
        <span className="text-text-secondary font-body">
          {isTracking ? "Sharing location" : "Location off"}
        </span>
      </div>
    </div>
  );
}
