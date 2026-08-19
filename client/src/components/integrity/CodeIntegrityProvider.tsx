import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { apiRequest } from "@/lib/queryClient";

interface IntegrityEvent {
  eventType: string;
  timestamp: string;
  cursorOffset: number;
  payload: any;
}

interface IntegrityContextType {
  sessionId: string;
  recordEvent: (eventType: string, cursorOffset: number, payload?: any) => void;
  syncCodeSnapshot: (code: string, language: string) => Promise<void>;
  flushEvents: () => Promise<void>;
}

const IntegrityContext = createContext<IntegrityContextType | null>(null);

export function useIntegritySession() {
  const ctx = useContext(IntegrityContext);
  if (!ctx) throw new Error("useIntegritySession must be used within a CodeIntegrityProvider");
  return ctx;
}

interface CodeIntegrityProviderProps {
  problemId: string;
  children: React.ReactNode;
}

export function CodeIntegrityProvider({ problemId, children }: CodeIntegrityProviderProps) {
  // Generate a random session ID for this coding attempt
  const [sessionId] = useState(() => {
    // Generate UUID or a secure random token representation
    return Array.from({ length: 4 }, () => Math.random().toString(36).substring(2, 10)).join("-");
  });

  const eventBuffer = useRef<IntegrityEvent[]>([]);
  const isSyncing = useRef(false);

  // Buffer and Batch Telemetry upload to /api/integrity/events
  const flushEvents = async () => {
    if (eventBuffer.current.length === 0 || isSyncing.current) return;
    isSyncing.current = true;
    
    const batch = [...eventBuffer.current];
    eventBuffer.current = [];

    try {
      await apiRequest("POST", "/api/integrity/events", {
        sessionId,
        problemId,
        events: batch,
      });
    } catch (err) {
      console.error("Failed to sync telemetry events:", err);
      // Put events back in buffer to retry
      eventBuffer.current = [...batch, ...eventBuffer.current];
    } finally {
      isSyncing.current = false;
    }
  };

  // Record key actions during editing
  const recordEvent = (eventType: string, cursorOffset: number, payload: any = {}) => {
    eventBuffer.current.push({
      eventType,
      timestamp: new Date().toISOString(),
      cursorOffset,
      payload,
    });
  };

  // Periodic flushing of event queue (every 3s)
  useEffect(() => {
    const timer = setInterval(() => {
      flushEvents();
    }, 3000);

    return () => {
      clearInterval(timer);
      flushEvents(); // final flush on unmount
    };
  }, [sessionId, problemId]);

  // Telemetry code snapshot uploading
  const syncCodeSnapshot = async (code: string, language: string) => {
    try {
      await apiRequest("POST", "/api/integrity/snapshots", {
        sessionId,
        problemId,
        code,
        language,
        totalCharCount: code.length,
      });
    } catch (err) {
      console.error("Failed to sync code snapshot:", err);
    }
  };

  return (
    <IntegrityContext.Provider value={{ sessionId, recordEvent, syncCodeSnapshot, flushEvents }}>
      {children}
    </IntegrityContext.Provider>
  );
}
