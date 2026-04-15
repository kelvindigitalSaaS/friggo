import { Share as CapShare } from "@capacitor/share";
import { isNative } from "./capacitor";

export interface ShareOptions {
  title: string;
  text: string;
  url?: string;
}

/**
 * Share content using the native share sheet on mobile,
 * falling back to navigator.share or clipboard on web.
 */
export async function shareContent(opts: ShareOptions): Promise<boolean> {
  if (isNative) {
    try {
      await CapShare.share({
        title: opts.title,
        text: opts.text,
        url: opts.url,
        dialogTitle: opts.title
      });
      return true;
    } catch {
      return false;
    }
  }

  // Web fallback
  if (navigator.share) {
    try {
      await navigator.share({
        title: opts.title,
        text: opts.text,
        url: opts.url
      });
      return true;
    } catch {
      return false;
    }
  }

  // Final fallback: clipboard
  try {
    await navigator.clipboard.writeText(opts.text);
    return true;
  } catch {
    return false;
  }
}
