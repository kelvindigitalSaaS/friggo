/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/integrations/supabase/client";

export interface SyncAction {
  id: string;
  method: "INSERT" | "UPDATE" | "DELETE" | "UPSERT";
  table: string;
  payload: any;
  timestamp: number;
  retryCount?: number;
  lastError?: string;
}

interface ErroredAction extends SyncAction {
  error: string;
  errorCode?: string;
  permanentError: boolean;
}

const SYNC_QUEUE_KEY = "kaza_sync_queue";
const ERROR_QUEUE_KEY = "kaza_error_queue";
const MAX_RETRIES = 3;

export const getSyncQueue = (): SyncAction[] => {
  try {
    const queue = localStorage.getItem(SYNC_QUEUE_KEY);
    return queue ? JSON.parse(queue) : [];
  } catch (err) {
    console.error("[OFFLINE] Failed to parse sync queue:", err);
    localStorage.removeItem(SYNC_QUEUE_KEY);
    return [];
  }
};

export const getErrorQueue = (): ErroredAction[] => {
  try {
    const queue = localStorage.getItem(ERROR_QUEUE_KEY);
    return queue ? JSON.parse(queue) : [];
  } catch (err) {
    console.error("[OFFLINE] Failed to parse error queue:", err);
    localStorage.removeItem(ERROR_QUEUE_KEY);
    return [];
  }
};

const saveSyncQueue = (queue: SyncAction[]) => {
  try {
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
  } catch (err) {
    console.error("[OFFLINE] Failed to save sync queue:", err);
  }
};

const saveErrorQueue = (queue: ErroredAction[]) => {
  try {
    localStorage.setItem(ERROR_QUEUE_KEY, JSON.stringify(queue));
  } catch (err) {
    console.error("[OFFLINE] Failed to save error queue:", err);
  }
};

export const addToSyncQueue = (action: Omit<SyncAction, "id" | "timestamp" | "retryCount">) => {
  const queue = getSyncQueue();
  const newAction: SyncAction = {
    ...action,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    retryCount: 0,
  };
  queue.push(newAction);
  saveSyncQueue(queue);

  if (navigator.onLine) {
    processSyncQueue();
  }
};

let isProcessing = false;

export const processSyncQueue = async () => {
  if (isProcessing || !navigator.onLine) return;

  const queue = getSyncQueue();
  if (queue.length === 0) return;

  isProcessing = true;
  console.log(`[OFFLINE] Processing sync queue (${queue.length} items)...`);

  const remainingActions: SyncAction[] = [];
  const errorQueue = getErrorQueue();

  // Process actions sequentially
  for (const action of queue) {
    try {
      let error = null;

      switch (action.method) {
        case "INSERT":
          ({ error } = await supabase.from(action.table as any).insert(action.payload));
          break;
        case "UPDATE":
          const { id, ...updates } = action.payload;
          ({ error } = await supabase.from(action.table as any).update(updates).eq("id", id));
          break;
        case "DELETE":
          ({ error } = await supabase.from(action.table as any).delete().eq("id", action.payload.id));
          break;
        case "UPSERT":
          ({ error } = await supabase.from(action.table as any).upsert(action.payload));
          break;
      }

      if (error) {
        const isPermanent = error.status ? error.status >= 400 && error.status < 500 : false;
        const retryCount = (action.retryCount || 0) + 1;
        const errorMsg = error.message || JSON.stringify(error);

        console.error(`[OFFLINE] Error syncing ${action.table} (attempt ${retryCount}/${MAX_RETRIES}):`, errorMsg);

        if (isPermanent || retryCount >= MAX_RETRIES) {
          // Move to error queue - user should be notified
          errorQueue.push({
            ...action,
            error: errorMsg,
            errorCode: error.code || String(error.status),
            permanentError: isPermanent,
            retryCount
          });
          console.warn(`[OFFLINE] Moving action ${action.id} to error queue (permanent: ${isPermanent})`);
        } else {
          // Retry
          action.retryCount = retryCount;
          action.lastError = errorMsg;
          remainingActions.push(action);
        }
      }
    } catch (err) {
      const retryCount = (action.retryCount || 0) + 1;
      const errorMsg = err instanceof Error ? err.message : String(err);

      console.error(`[OFFLINE] Fatal error syncing ${action.table} (attempt ${retryCount}/${MAX_RETRIES}):`, err);

      if (retryCount >= MAX_RETRIES) {
        errorQueue.push({
          ...action,
          error: errorMsg,
          permanentError: false,
          retryCount
        });
      } else {
        action.retryCount = retryCount;
        action.lastError = errorMsg;
        remainingActions.push(action);
      }
    }
  }

  saveSyncQueue(remainingActions);
  if (errorQueue.length > 0) {
    saveErrorQueue(errorQueue);
  }

  isProcessing = false;

  if (remainingActions.length < queue.length) {
    const processed = queue.length - remainingActions.length;
    const errored = errorQueue.length;
    console.log(`[OFFLINE] Sync completed: ${processed} processed, ${errored} errored`);
  }
};

// Retry errored items when coming back online (after delay)
export const retryErrorQueue = async () => {
  const errorQueue = getErrorQueue();
  if (errorQueue.length === 0) return;

  console.log(`[OFFLINE] Retrying ${errorQueue.length} errored items...`);

  const retryableItems = errorQueue.filter(item => !item.permanentError && (item.retryCount || 0) < MAX_RETRIES);
  const permanentItems = errorQueue.filter(item => item.permanentError || (item.retryCount || 0) >= MAX_RETRIES);

  // Re-queue retryable items
  for (const item of retryableItems) {
    addToSyncQueue({
      method: item.method,
      table: item.table,
      payload: item.payload
    });
  }

  // Keep permanent errors visible to user (log them)
  if (permanentItems.length > 0) {
    console.error(`[OFFLINE] ${permanentItems.length} permanent errors cannot be retried:`, permanentItems);
    // TODO: Notify user via toast about failed items
  }

  saveErrorQueue(permanentItems);
};

// Listen for online event
if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    // Small delay to ensure connection is stable
    setTimeout(() => {
      processSyncQueue();
      retryErrorQueue();
    }, 1000);
  });
}

export const getErrorQueueCount = () => getErrorQueue().length;
