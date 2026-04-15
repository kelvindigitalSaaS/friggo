import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.kaza.app",
  appName: "Kaza",
  webDir: "dist",
  server: {
    // During development you can point to your Vite dev server.
    // Remove or comment this out for production builds.
    // url: 'http://192.168.x.x:8080',
    // cleartext: true,
    androidScheme: "https"
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2500,
      launchAutoHide: false,
      launchFadeOutDuration: 300,
      backgroundColor: "#22c55e",
      showSpinner: true,
      spinnerColor: "#ffffff",
      androidScaleType: "CENTER_CROP",
      splashImmersive: true,
      splashFullScreen: true
    },
    StatusBar: {
      style: "LIGHT",
      backgroundColor: "#22c55e"
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon",
      iconColor: "#22c55e",
      sound: "kaza_notification.wav"
    },
    Keyboard: {
      resize: "body",
      resizeOnFullScreen: true
    }
  },
  android: {
    allowMixedContent: false,
    backgroundColor: "#22c55e"
  },
  ios: {
    contentInset: "automatic",
    backgroundColor: "#22c55e",
    scheme: "kaza"
  }
};

export default config;
