// Service worker custom handlers (plain JS)
// This file is injected into the Workbox-generated SW via importScripts.
// It handles notification click, close and push events for the Kaza PWA.

// ── Push event handler (PWA web push) ────────────────────────────────────────
self.addEventListener("push", (event) => {
  let payload = {};
  try { payload = event.data ? event.data.json() : {}; } catch { payload = { title: "Kaza", body: event.data && event.data.text ? event.data.text() : "" }; }
  const title = payload.title || "Kaza";
  const options = {
    body: payload.body || "",
    icon: payload.icon || "/icons/100.png",
    badge: payload.badge || "/icons/badge-96.svg",
    tag: payload.tag || payload.category || "kaza",
    data: payload.data || payload,
    actions: payload.actions || [],
    vibrate: payload.vibrate,
  };
  event.waitUntil(
    self.registration.showNotification(title, options).then(() => {
      // Notify open app windows so they can persist the notification in the bell
      return self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: "push-notification-received",
            title,
            body: options.body,
            notifType: payload.type || "general",
          });
        });
      });
    })
  );
});

// ── Notification click handler ───────────────────────────────────────────────
self.addEventListener("notificationclick", (event) => {
  const notification = event.notification;
  const action = event.action;
  const data = notification.data || {};

  notification.close();

  // Determine target URL based on the action
  let targetUrl = "/";

  if (action === "recipe") {
    targetUrl = "/settings";
  } else if (action === "open" && data.url) {
    targetUrl = data.url;
  } else if (action === "snooze" && data.category === "garbage") {
    // Re-schedule garbage notification in 30 minutes
    // We'll show a new notification after 30min
    event.waitUntil(
      new Promise((resolve) => {
        setTimeout(async () => {
          await self.registration.showNotification(
            notification.title || "🗑️ Lembrete — Coleta de Lixo",
            {
              body: notification.body || "Não esqueça de colocar o lixo!",
              icon: "/icons/100.png",
              badge: "/icons/badge-96.svg",
              tag: "garbage-snooze-" + Date.now(),
              vibrate: [200, 100, 200, 100, 200],
              requireInteraction: true,
              actions: [
                { action: "done", title: "✅ Já coloquei!" },
                { action: "snooze", title: "⏰ +30min" }
              ],
              data: { category: "garbage", url: "/" }
            }
          );
          resolve();
        }, 30 * 60 * 1000);
      })
    );
    return;
  } else if (action === "done") {
    // User confirmed they took the action — just close
    return;
  } else if (action === "dismiss") {
    // Just close the notification
    return;
  }

  // Focus existing window or open a new one
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // Try to focus an existing window
        for (const client of clientList) {
          if (client.url.includes(self.registration.scope) && "focus" in client) {
            client.focus();
            client.postMessage({
              type: "notification-click",
              action,
              data
            });
            return;
          }
        }
        // No existing window — open a new one
        return self.clients.openWindow(targetUrl);
      })
  );
});

// ── Notification close handler (analytics) ───────────────────────────────────
self.addEventListener("notificationclose", (_event) => {
  // Could be used for analytics in the future
});
