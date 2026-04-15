import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { initNativeUI } from "./lib/nativeUI";
import {
  initPushNotifications,
  initLocalNotifications,
  requestWebNotificationPermission,
  registerNotificationHandlers
} from "./lib/pushNotifications";
import { startGarbageReminderMonitoring } from "./lib/garbageReminderNotifications";
import { initSentry } from "./lib/sentry";
import { isNative } from "./lib/capacitor";

// Initialize error tracking first
initSentry();

createRoot(document.getElementById("root")!).render(<App />);

// Initialise native features after first render
initNativeUI();
if (isNative) {
  initPushNotifications();
  initLocalNotifications();
} else {
  // On web/PWA: request browser Notification permission
  // Delay slightly so it happens after the app loads (avoids permission prompt before the page paints)
  setTimeout(() => requestWebNotificationPermission(), 3000);
  // Register notification click/action handlers
  registerNotificationHandlers();
}

// Iniciar monitoramento de notificações de coleta de lixo
startGarbageReminderMonitoring();
