import { Capacitor } from "@capacitor/core";

/** Whether the app is running inside a native Capacitor shell (iOS / Android). */
export const isNative = Capacitor.isNativePlatform();

/** Current platform: 'ios' | 'android' | 'web' */
export const platform = Capacitor.getPlatform() as "ios" | "android" | "web";

export const isIOS = platform === "ios";
export const isAndroid = platform === "android";
export const isWeb = platform === "web";
