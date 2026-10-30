import type { HeatmapSummary } from "./types";

export function exportHeatmapMarkdown(
  account: string,
  summary: HeatmapSummary,
  timeZone: string
): string {
  const lines = [
    `# Temporal heatmap — ${account}`,
    "",
    `> Educational · TZ ${timeZone} · total ${summary.totalActions}`,
    "",
    `- Occupied cell ratio: ${(summary.occupiedCellRatio * 100).toFixed(1)}%`,
    `- Evenness: ${summary.evenness.toFixed(3)}`,
    `- Max cell: ${summary.maxCell}`,
    "",
    "## Flags",
    "",
  ];
  for (const f of summary.flags) {
    lines.push(`- [${f.level}] ${f.message}`);
  }
  lines.push(
    "",
    "Weak signal only — combine with organic fingerprinter and other tools.",
    ""
  );
  return lines.join("\n");
}

export function downloadText(
  filename: string,
  content: string,
  mime = "text/plain;charset=utf-8"
): void {
  if (typeof document === "undefined") return;
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
