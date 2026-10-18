/**
 * Pure temporal heatmap engines.
 * Educational — timezone formatting uses Intl; math is deterministic for fixed TZ.
 */

import type {
  ActionTimestamp,
  HeatmapBuildOptions,
  HeatmapFlag,
  HeatmapGrid,
  HeatmapSummary,
} from "./types";

export function emptyGrid(): HeatmapGrid {
  return Array.from({ length: 7 }, () => Array.from({ length: 24 }, () => 0));
}

/** Local day-of-week (0=Sun) and hour for a timestamp in a given IANA zone. */
export function localDowAndHour(
  unixSeconds: number,
  timeZone: string
): { dow: number; hour: number } {
  const d = new Date(unixSeconds * 1000);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "numeric",
    hour12: false,
    hourCycle: "h23",
  }).formatToParts(d);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Sun";
  const hourStr = parts.find((p) => p.type === "hour")?.value ?? "0";
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  let hour = parseInt(hourStr, 10);
  if (hour === 24) hour = 0;
  return { dow: map[weekday] ?? 0, hour: Number.isFinite(hour) ? hour : 0 };
}

export function buildHeatmapGrid(
  timestamps: ActionTimestamp[],
  options: HeatmapBuildOptions = {}
): HeatmapGrid {
  const timeZone = options.timeZone ?? "UTC";
  const grid = emptyGrid();
  for (const ts of timestamps) {
    const { dow, hour } = localDowAndHour(ts, timeZone);
    if (dow >= 0 && dow < 7 && hour >= 0 && hour < 24) {
      grid[dow][hour] += 1;
    }
  }
  return grid;
}

export function summarizeGrid(grid: HeatmapGrid): HeatmapSummary {
  let total = 0;
  let maxCell = 0;
  let occupied = 0;
  const values: number[] = [];

  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h++) {
      const v = grid[d][h];
      total += v;
      if (v > 0) {
        occupied += 1;
        values.push(v);
      }
      if (v > maxCell) maxCell = v;
    }
  }

  const occupiedCellRatio = occupied / (7 * 24);
  let evenness = 0;
  if (values.length > 1) {
    const mean = values.reduce((s, x) => s + x, 0) / values.length;
    const variance =
      values.reduce((s, x) => s + (x - mean) ** 2, 0) / values.length;
    const cv = mean === 0 ? 0 : Math.sqrt(variance) / mean;
    // Lower CV among active cells → higher evenness
    evenness = Math.max(0, Math.min(1, 1 - Math.min(1, cv)));
  }

  return {
    totalActions: total,
    grid,
    maxCell,
    occupiedCellRatio,
    evenness,
    flags: buildHeatmapFlags({
      totalActions: total,
      grid,
      maxCell,
      occupiedCellRatio,
      evenness,
      flags: [],
    }),
  };
}

export function buildHeatmapFlags(summary: HeatmapSummary): HeatmapFlag[] {
  const flags: HeatmapFlag[] = [];

  if (summary.totalActions < 20) {
    flags.push({
      id: "small-sample",
      level: "warn",
      message: "Few actions — heatmap patterns are weak evidence.",
      trigger: "totalActions",
    });
  }

  // High coverage + high evenness can look machine-like
  if (
    summary.occupiedCellRatio > 0.55 &&
    summary.evenness > 0.75 &&
    summary.totalActions >= 40
  ) {
    flags.push({
      id: "flat-coverage",
      level: "alert",
      message:
        "Activity spreads across many hours with relatively even density — possible always-on automation (or a global team).",
      trigger: "occupiedCellRatio+evenness",
    });
  }

  // Strong night gap in UTC may still be daytime elsewhere — flag as info only
  const nightHours = [0, 1, 2, 3, 4, 5];
  let night = 0;
  let day = 0;
  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h++) {
      const v = summary.grid[d][h];
      if (nightHours.includes(h)) night += v;
      else day += v;
    }
  }
  if (summary.totalActions >= 30 && night + day > 0) {
    const nightShare = night / (night + day);
    if (nightShare < 0.08) {
      flags.push({
        id: "quiet-nights",
        level: "info",
        message:
          "Very little activity in hours 00–05 (selected timezone). Often human sleep — confirm timezone.",
        trigger: "nightShare",
      });
    }
    if (nightShare > 0.45) {
      flags.push({
        id: "night-heavy",
        level: "info",
        message:
          "High share of activity in 00–05. Could be shift work, other timezone, or automated off-peak jobs.",
        trigger: "nightShare",
      });
    }
  }

  if (flags.length === 0) {
    flags.push({
      id: "neutral",
      level: "info",
      message:
        "No strong structural heatmap flags. Combine with interval entropy and funding analysis.",
      trigger: "overall",
    });
  }

  return flags;
}

export function fingerprintTemporal(
  timestamps: ActionTimestamp[],
  options: HeatmapBuildOptions = {}
): HeatmapSummary {
  const grid = buildHeatmapGrid(timestamps, options);
  return summarizeGrid(grid);
}

/** Irregular human-like demo: mostly daytime UTC weekdays. */
export function demoHumanTimestamps(count = 80): ActionTimestamp[] {
  const out: ActionTimestamp[] = [];
  // Start Monday 2024-01-01 ~ noon UTC-ish
  let t = 1_704_110_400;
  for (let i = 0; i < count; i++) {
    out.push(t);
    // Skip ahead with daytime bias
    const hourJump = 1 + (i % 5);
    t += hourJump * 3600 + (i % 17) * 60;
    // Occasional longer pause (sleep/weekend-ish)
    if (i % 11 === 0) t += 8 * 3600;
  }
  return out;
}

/** Flat 24/7 every ~45 minutes. */
export function demoBotTimestamps(count = 80): ActionTimestamp[] {
  const out: ActionTimestamp[] = [];
  let t = 1_704_110_400;
  for (let i = 0; i < count; i++) {
    out.push(t);
    t += 45 * 60;
  }
  return out;
}
