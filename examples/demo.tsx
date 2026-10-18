"use client";

import { useMemo, useState } from "react";
import {
  demoBotTimestamps,
  demoHumanTimestamps,
  fingerprintTemporal,
} from "./engines";
import { HeatmapFlags, HeatmapGridView, HeatmapStats } from "./HeatmapGrid";

type Mode = "human" | "bot";

export default function TemporalHeatmapDemo() {
  const [mode, setMode] = useState<Mode>("human");

  const summary = useMemo(() => {
    const ts =
      mode === "human" ? demoHumanTimestamps(90) : demoBotTimestamps(90);
    return fingerprintTemporal(ts, { timeZone: "UTC" });
  }, [mode]);

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
      <header className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wider text-emerald-400/80">
          Pixel Journey · Behavioral forensics
        </p>
        <h1 className="text-2xl font-bold text-white">Temporal Behavior Heatmap</h1>
        <p className="text-sm text-white/60 max-w-2xl">
          Pure aggregation of timestamps into a day×hour grid. Demo modes only —
          production should pass Hyperion times and an explicit timezone.
        </p>
      </header>

      <div className="flex gap-2">
        <button
          type="button"
          className={`rounded-lg px-4 py-2 text-sm ${
            mode === "human" ? "bg-emerald-600" : "bg-white/10"
          }`}
          onClick={() => setMode("human")}
        >
          Demo human-like
        </button>
        <button
          type="button"
          className={`rounded-lg px-4 py-2 text-sm ${
            mode === "bot" ? "bg-amber-600" : "bg-white/10"
          }`}
          onClick={() => setMode("bot")}
        >
          Demo always-on
        </button>
      </div>

      <HeatmapGridView summary={summary} />
      <div className="grid gap-6 md:grid-cols-2">
        <HeatmapStats summary={summary} />
        <HeatmapFlags summary={summary} />
      </div>
    </div>
  );
}
