"use client";

import { useId } from "react";
import type { FlagLevel, HeatmapSummary } from "./types";

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export interface HeatmapGridViewProps {
  summary: HeatmapSummary;
  className?: string;
}

export function HeatmapGridView({
  summary,
  className = "",
}: HeatmapGridViewProps) {
  const headingId = useId();
  const max = Math.max(1, summary.maxCell);

  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/30 p-4 overflow-x-auto ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="text-sm font-medium text-white/70 mb-3">
        Day × hour density
      </h3>
      <div className="min-w-[640px]">
        <div className="grid gap-px" style={{ gridTemplateColumns: "40px repeat(24, minmax(0, 1fr))" }}>
          <div />
          {Array.from({ length: 24 }, (_, h) => (
            <div key={h} className="text-[9px] text-center text-white/40">
              {h}
            </div>
          ))}
          {summary.grid.map((row, d) => (
            <div key={d} className="contents">
              <div className="text-[10px] text-white/50 flex items-center">{DOW[d]}</div>
              {row.map((v, h) => {
                const intensity = v / max;
                return (
                  <div
                    key={`${d}-${h}`}
                    className="aspect-square rounded-[2px]"
                    title={`${DOW[d]} ${h}:00 — ${v} actions`}
                    style={{
                      backgroundColor: `rgba(16, 185, 129, ${0.08 + intensity * 0.9})`,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HeatmapStats({ summary, className = "" }: HeatmapGridViewProps) {
  const headingId = useId();
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/20 p-6 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg mb-4">
        Summary
      </h3>
      <dl className="space-y-2 text-sm">
        {[
          ["Total actions", String(summary.totalActions)],
          ["Max cell", String(summary.maxCell)],
          ["Occupied cells", `${(summary.occupiedCellRatio * 100).toFixed(1)}%`],
          ["Evenness (active cells)", summary.evenness.toFixed(3)],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between border-b border-white/5 pb-2">
            <dt className="text-white/50">{k}</dt>
            <dd className="font-mono">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const levelClass: Record<FlagLevel, string> = {
  info: "border-white/10 bg-white/5 text-white/80",
  warn: "border-amber-500/30 bg-amber-500/10 text-amber-100",
  alert: "border-red-500/30 bg-red-500/10 text-red-100",
};

export function HeatmapFlags({ summary, className = "" }: HeatmapGridViewProps) {
  const headingId = useId();
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/20 p-6 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg mb-4">
        Flags
      </h3>
      <ul className="space-y-3">
        {summary.flags.map((f) => (
          <li key={f.id} className={`rounded-xl border p-3 text-sm ${levelClass[f.level]}`}>
            <p className="font-medium">{f.message}</p>
            <p className="text-xs opacity-60 mt-1">
              {f.level} · {f.trigger}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
