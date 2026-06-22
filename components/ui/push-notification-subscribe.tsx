"use client";

import { useState, useEffect } from "react";
import { Bell, BellOff } from "lucide-react";
import { AnimatedButton } from "./animated-button";

// Convert VAPID key to application server format
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export function PushNotificationSubscribe({
  userId,
  className = "",
}: {
  userId?: string;
  className?: string;
}) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);

      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager.getSubscription().then((subscription) => {
          setIsSubscribed(!!subscription);
        });
      });
    }
  }, []);

  const subscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BEl7yYJ6...",
        ) as BufferSource,
      });

      // Save to backend
      await fetch("/api/notifications/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          subscription: subscription.toJSON(),
        }),
      });

      setIsSubscribed(true);
    } catch (error) {
      console.error("Subscription failed:", error);
    }
  };

  const unsubscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();

        // Remove from backend
        await fetch("/api/notifications/subscribe", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
      }

      setIsSubscribed(false);
    } catch (error) {
      console.error("Unsubscription failed:", error);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <AnimatedButton
      onClick={isSubscribed ? unsubscribe : subscribe}
      className={className}
      aria-label={
        isSubscribed
          ? "Unsubscribe from notifications"
          : "Subscribe to notifications"
      }
    >
      {isSubscribed ? (
        <BellOff className="w-4 h-4" />
      ) : (
        <Bell className="w-4 h-4" />
      )}
      <span>{isSubscribed ? "Notifications On" : "Enable Notifications"}</span>
    </AnimatedButton>
  );
}
