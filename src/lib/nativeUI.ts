import { StatusBar, Style } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";
import { Keyboard } from "@capacitor/keyboard";
import { App as CapApp } from "@capacitor/app";
import { isNative, isAndroid } from "./capacitor";

/**
 * One-time native UI initialisation.
 * Call this from main.tsx after React renders.
 */
export async function initNativeUI() {
  if (!isNative) return;

  // Status bar
  try {
    await StatusBar.setStyle({ style: Style.Light });
    if (isAndroid) {
      await StatusBar.setBackgroundColor({ color: "#22c55e" });
    }
  } catch (_e) { /* StatusBar unavailable */ }

  // Hide splash screen after the app is rendered
  try {
    await SplashScreen.hide({ fadeOutDuration: 300 });
  } catch (_e) { /* SplashScreen unavailable */ }

  // Keyboard: scroll the focused input into view on iOS
  try {
    Keyboard.addListener("keyboardWillShow", () => {
      document.body.classList.add("keyboard-open");
    });
    Keyboard.addListener("keyboardWillHide", () => {
      document.body.classList.remove("keyboard-open");
    });
  } catch (_e) { /* Keyboard unavailable */ }
}

/**
 * Register Android hardware back-button handler.
 */
export function registerBackButton(onBack: () => void) {
  if (!isNative) return;

  CapApp.addListener("backButton", ({ canGoBack }) => {
    if (canGoBack) {
      onBack();
    } else {
      CapApp.exitApp();
    }
  });
}
