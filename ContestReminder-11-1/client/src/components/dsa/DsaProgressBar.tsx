import React from "react";
import { cn } from "@/lib/utils";

interface DsaProgressBarProps {
  value: number; // 0 - 100
  className?: string;
  barClassName?: string;
  showLabel?: boolean;
}

export function DsaProgressBar({ value, className, barClassName, showLabel = false }: DsaProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("flex items-center gap-3 w-full", className)}>
      <div className="relative w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden border border-white/5">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400 shadow-[0_0_12px_rgba(59,130,246,0.4)]",
            percentage === 100 && "from-emerald-500 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]",
            barClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-mono font-semibold text-slate-300 min-w-[42px] text-right">
          {percentage.toFixed(0)}%
        </span>
      )}
    </div>
  );
}
