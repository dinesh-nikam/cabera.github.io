// Service Worker for Push Notifications

self.addEventListener("push", (event) => {
  const data = event.data?.json();

  if (!data) return;

  const { title, body, icon, badge, url } = data;

  const options = {
    body,
    icon: icon || "/icons/icon-192.png",
    badge: badge || "/icons/badge-72.png",
    data: { url },
    vibrate: [200, 100, 200],
    actions: [
      {
        action: "open",
        title: "View Booking",
      },
    ],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "open" || !event.action) {
    const url = event.notification.data?.url || "/";
    event.waitUntil(clients.openWindow(url));
  }
});

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});
