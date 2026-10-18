/**
 * Types for day-of-week × hour-of-day activity heatmaps.
 */

/** Unix seconds */
export type ActionTimestamp = number;

/** 7 rows (Sun=0 … Sat=6) × 24 columns (hour 0–23) */
export type HeatmapGrid = number[][];

export interface HeatmapBuildOptions {
  /** IANA timezone for local hour/dow, e.g. "UTC", "Europe/Madrid" */
  timeZone?: string;
}

export interface HeatmapSummary {
  totalActions: number;
  grid: HeatmapGrid;
  maxCell: number;
  /** Share of cells with activity */
  occupiedCellRatio: number;
  /** Rough evenness 0–1 (1 = perfectly flat across active cells) */
  evenness: number;
  flags: HeatmapFlag[];
}

export type FlagLevel = "info" | "warn" | "alert";

export interface HeatmapFlag {
  id: string;
  level: FlagLevel;
  message: string;
  trigger: string;
}
