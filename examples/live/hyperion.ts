/**
 * Live Hyperion adapter — network only.
 * Pure heatmap stays in examples/engines.ts.
 */

export const DEFAULT_HYPERION = "https://wax.eosrio.io";

export interface HyperionActionRow {
  timestamp?: string;
  "@timestamp"?: string;
  act?: { account?: string; name?: string };
}

export interface HyperionActionsResponse {
  actions?: HyperionActionRow[];
}

export function parseActionTimestamp(row: HyperionActionRow): number | null {
  const raw = row.timestamp || row["@timestamp"];
  if (!raw) return null;
  const ms = Date.parse(raw);
  if (Number.isNaN(ms)) return null;
  return Math.floor(ms / 1000);
}

export async function fetchAccountActionTimestamps(
  account: string,
  options: {
    hyperionBase?: string;
    limit?: number;
    signal?: AbortSignal;
  } = {}
): Promise<{ timestamps: number[]; source: string; rawCount: number }> {
  const base = (options.hyperionBase || DEFAULT_HYPERION).replace(/\/$/, "");
  const limit = options.limit ?? 200;
  const name = account.trim().toLowerCase();
  if (!name) throw new Error("Account required");

  const url = `${base}/v2/history/get_actions?account=${encodeURIComponent(
    name
  )}&limit=${limit}&sort=desc`;

  const res = await fetch(url, {
    signal: options.signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Hyperion ${res.status}: ${res.statusText}`);
  }
  const data = (await res.json()) as HyperionActionsResponse;
  const rows = data.actions ?? [];
  const timestamps: number[] = [];
  for (const row of rows) {
    const t = parseActionTimestamp(row);
    if (t != null) timestamps.push(t);
  }
  timestamps.sort((a, b) => a - b);
  return { timestamps, source: url, rawCount: rows.length };
}
