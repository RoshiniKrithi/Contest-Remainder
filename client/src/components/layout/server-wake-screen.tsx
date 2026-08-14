import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Wifi, WifiOff } from "lucide-react";

const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const IS_PROD = !!API_BASE;

type WakeStatus = "checking" | "waking" | "ready" | "failed";

interface ServerWakeScreenProps {
  onReady: () => void;
}

/**
 * Shown on production when the Render free-tier backend may be sleeping.
 * Pings /api/health until it gets a 200 (up to 60s), then calls onReady().
 * In development (no VITE_API_URL), skips immediately.
 */
export default function ServerWakeScreen({ onReady }: ServerWakeScreenProps) {
  const [status, setStatus] = useState<WakeStatus>("checking");
  const [elapsed, setElapsed] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    // Dev mode — skip entirely
    if (!IS_PROD) {
      onReady();
      return;
    }

    let cancelled = false;
    const MAX_WAIT_MS = 65_000;
    const POLL_INTERVAL_MS = 2_500;
    const startTime = Date.now();

    // Animated dots
    const dotsInterval = setInterval(() => {
      setDots(d => (d.length >= 3 ? "" : d + "."));
    }, 500);

    // Elapsed timer
    const elapsedInterval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    async function ping() {
      while (!cancelled) {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 8000);
          const res = await fetch(`${API_BASE}/api/health`, {
            method: "GET",
            signal: controller.signal,
            cache: "no-store",
          });
          clearTimeout(timeout);

          if (res.ok && !cancelled) {
            setStatus("ready");
            // Small pause so the "ready" state is visible briefly
            setTimeout(() => {
              if (!cancelled) onReady();
            }, 600);
            break;
          }
        } catch {
          // Network error or timeout — keep polling
        }

        if (cancelled) break;

        const elapsed = Date.now() - startTime;
        if (elapsed > MAX_WAIT_MS) {
          if (!cancelled) setStatus("failed");
          break;
        }

        // Show "waking" state after first failed attempt
        if (!cancelled) setStatus("waking");

        // Wait before next poll
        await new Promise<void>(resolve => {
          const t = setTimeout(resolve, POLL_INTERVAL_MS);
          // Allow cancellation to break the wait
          const check = setInterval(() => { if (cancelled) { clearTimeout(t); clearInterval(check); resolve(); } }, 100);
        });
      }
    }

    ping();

    return () => {
      cancelled = true;
      clearInterval(dotsInterval);
      clearInterval(elapsedInterval);
    };
  }, []);

  // In dev, render nothing (onReady already called)
  if (!IS_PROD) return null;

  return (
    <AnimatePresence>
      {(status === "checking" || status === "waking" || status === "failed") && (
        <motion.div
          key="wake-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              <Code className="h-8 w-8 text-white" />
            </div>
            <div>
              <span className="text-3xl font-black text-white tracking-tighter uppercase">
                Code<span className="text-blue-500">Arena</span>
              </span>
              <p className="text-[11px] text-slate-500 font-black tracking-[0.3em] uppercase">
                Command Center
              </p>
            </div>
          </motion.div>

          {status === "failed" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4 text-center px-8"
            >
              <div className="p-3 bg-red-500/10 rounded-full border border-red-500/20">
                <WifiOff className="h-6 w-6 text-red-400" />
              </div>
              <p className="text-white font-bold text-lg">Server Unavailable</p>
              <p className="text-slate-400 text-sm max-w-xs">
                The server took too long to respond. Please try refreshing the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors"
              >
                Retry
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Spinner */}
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full border-2 border-white/5" />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Wifi className="h-5 w-5 text-blue-400" />
                </div>
              </div>

              {/* Status text */}
              <div className="text-center">
                <p className="text-white font-bold text-base">
                  {status === "checking" ? "Connecting" : "Server is waking up"}{dots}
                </p>
                <p className="text-slate-500 text-sm mt-1">
                  {status === "checking"
                    ? "Reaching the server..."
                    : `This takes up to 30 seconds on first load (${elapsed}s)`}
                </p>
              </div>

              {/* Progress bar — fills over 30s */}
              {status === "waking" && (
                <div className="w-56 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${Math.min((elapsed / 30) * 100, 95)}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
