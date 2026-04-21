/** Simple client-side rate limiter using localStorage */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const STORAGE_PREFIX = "Kaza_rl_";

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; retryAfterMs: number } {
  const storageKey = `${STORAGE_PREFIX}${key}`;
  const now = Date.now();

  try {
    const raw = localStorage.getItem(storageKey);
    const entry: RateLimitEntry = raw
      ? JSON.parse(raw)
      : { count: 0, resetAt: now + windowMs };

    // Reset window if expired
    if (now >= entry.resetAt) {
      const newEntry: RateLimitEntry = { count: 1, resetAt: now + windowMs };
      localStorage.setItem(storageKey, JSON.stringify(newEntry));
      return { allowed: true, retryAfterMs: 0 };
    }

    // Check if under limit
    if (entry.count < maxRequests) {
      entry.count++;
      localStorage.setItem(storageKey, JSON.stringify(entry));
      return { allowed: true, retryAfterMs: 0 };
    }

    return { allowed: false, retryAfterMs: entry.resetAt - now };
  } catch {
    return { allowed: true, retryAfterMs: 0 };
  }
}

// Rate limit configs for different features
export const RATE_LIMITS = {
  recipes: { maxRequests: 5, windowMs: 60 * 1000 }, // 5 per minute
  shoppingList: { maxRequests: 3, windowMs: 60 * 1000 }, // 3 per minute
  checkout: { maxRequests: 3, windowMs: 5 * 60 * 1000 } // 3 per 5 minutes
} as const;
