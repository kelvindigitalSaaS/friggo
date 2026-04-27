/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/integrations/supabase/client";

export interface SyncAction {
  id: string;
  method: "INSERT" | "UPDATE" | "DELETE" | "UPSERT";
  table: string;
  payload: any;
  timestamp: number;
}

const SYNC_QUEUE_KEY = "kaza_sync_queue";

export const getSyncQueue = (): SyncAction[] => {
  try {
    const queue = localStorage.getItem(SYNC_QUEUE_KEY);
    return queue ? JSON.parse(queue) : [];
  } catch {
    return [];
  }
};

const saveSyncQueue = (queue: SyncAction[]) => {
  localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
};

export const addToSyncQueue = (action: Omit<SyncAction, "id" | "timestamp">) => {
  const queue = getSyncQueue();
  const newAction: SyncAction = {
    ...action,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  };
  queue.push(newAction);
  saveSyncQueue(queue);
  
  // Try to process immediately if online
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
  
  // Process actions sequentially to maintain order
  for (const action of queue) {
    try {
      let error = null;
      
      switch (action.method) {
        case "INSERT":
          ({ error } = await supabase.from(action.table as any).insert(action.payload));
          break;
        case "UPDATE":
          // For updates, we expect the payload to have an 'id' or we use a filter
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
        console.error(`[OFFLINE] Error syncing action ${action.id}:`, error);
        // If it's a permanent error (like 404 or validation), we might want to skip it
        // For now, keep it in queue if it's not a network error
        if (error.status !== 0) {
          // Skip permanent errors to avoid blocking the queue
          console.warn(`[OFFLINE] Skipping permanent error for action ${action.id}`);
        } else {
          remainingActions.push(action);
        }
      }
    } catch (err) {
      console.error(`[OFFLINE] Fatal error syncing action ${action.id}:`, err);
      remainingActions.push(action);
    }
  }
  
  saveSyncQueue(remainingActions);
  isProcessing = false;
  
  if (remainingActions.length < queue.length) {
    console.log(`[OFFLINE] Sync completed. ${queue.length - remainingActions.length} actions processed.`);
  }
};

// Listen for online event
if (typeof window !== "undefined") {
  window.addEventListener("online", processSyncQueue);
}
