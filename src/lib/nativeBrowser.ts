import { Browser } from "@capacitor/browser";
import { App as CapApp } from "@capacitor/app";
import { isNative } from "./capacitor";

/**
 * Opens a URL using in-app browser on native (needed for Checkout),
 * or window.open on web.
 * Returns a Promise that resolves when the browser is closed (native only).
 */
export async function openExternalUrl(url: string): Promise<void> {
  if (isNative) {
    await Browser.open({ url, presentationStyle: "popover" });
    return;
  }
  // Use location.href so Safari PWA (standalone mode) can navigate without
  // the popup blocker intercepting window.open
  window.location.href = url;
}

/**
 * Closes the in-app browser (after OAuth or checkout redirect).
 */
export async function closeInAppBrowser(): Promise<void> {
  if (isNative) {
    try {
      await Browser.close();
    } catch {
      // Browser may already be closed
    }
  }
}

/**
 * Listens for deep links (auth callbacks, etc) back to the app.
 * Call this once at app startup on native platforms.
 */
export function listenForDeepLinks(callback: (url: string) => void) {
  if (!isNative) return;

  CapApp.addListener("appUrlOpen", (event) => {
    callback(event.url);
  });
}
