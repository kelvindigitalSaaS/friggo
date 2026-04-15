import { Browser } from "@capacitor/browser";
import { App as CapApp } from "@capacitor/app";
import { isNative } from "./capacitor";

/**
 * Opens a URL using in-app browser on native (needed for Stripe Checkout),
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
 * Closes the in-app browser (after Stripe redirect, for example).
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
 * Listens for the Stripe redirect back to the app via deep link.
 * Call this once at app startup on native platforms.
 */
export function listenForDeepLinks(callback: (url: string) => void) {
  if (!isNative) return;

  CapApp.addListener("appUrlOpen", (event) => {
    callback(event.url);
  });
}

/**
 * Handles the Stripe redirect URL and extracts query params.
 * Expected patterns:
 *   friggo://checkout?subscription=success
 *   friggo://checkout?subscription=canceled
 *   com.friggo.app://checkout?subscription=success
 *   com.friggo.app://checkout?subscription=canceled
 */
export function parseStripeRedirect(
  url: string
): "success" | "canceled" | null {
  try {
    // Mobile deep links may use custom scheme
    const normalized = url
      .replace("com.friggo.app://", "https://friggo.app/")
      .replace("friggo://", "https://friggo.app/");
    const parsed = new URL(normalized);
    const result = parsed.searchParams.get("subscription");
    if (result === "success" || result === "canceled") return result;
  } catch {
    // ignore parse errors
  }
  return null;
}
