# wax-temporal-behavior-heatmap

**Temporal Behavior Heatmap**

A GitHub-style contribution calendar visualization that shows exactly when an account or entire collection's holders are most active on WAX. Helps identify human-like patterns vs automated bot behavior through 24/7 activity density grids.

**Status:** 🔒 Private (In Development) | Target: Public when v1 complete  
**Category:** Community Forensics, Identity Alignment & Sybil Detection  
**Parent Catalog:** [pixel-journey/wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

> Built to the same high standard of educational excellence, production readiness, and WAX best practices as the [gkniftyheads-tracker](https://github.com/henrikpiga/gkniftyheads-tracker).

---

## Quick Start

```bash
git clone https://github.com/pixel-journey/wax-temporal-behavior-heatmap.git
cd wax-temporal-behavior-heatmap
npm install
npm run dev
```

Enter a wallet address or collection name in the demo to instantly see the activity heatmap powered by realistic sample data.

---

## Why This Blueprint?

Pure transaction lists don't reveal behavioral rhythms. Bots often run 24/7 with mechanical consistency, while humans show natural sleep/wake and weekly patterns. This visual tool makes those differences immediately obvious and quantifiable.

Excellent for Sybil detection, airdrop fairness analysis, and community health monitoring.

---

## Architecture & Data Flow

```
User Inputs Address or Collection
       ↓
Fetch Action History (Hyperion)
       ↓
Aggregate by Hour + Day of Week
       ↓
Time-Zone Normalization
       ↓
SVG Contribution-Style Grid Rendering
  - Opacity = action density
  - Clear visual gaps for human sleep patterns
  - Solid blocks often indicate automation
```

All processing is client-side after fetching the history.

---

## Complete Repository Structure

Follows Pixel Journey high standards.

Key parts:
- `app/` — Main heatmap interface
- `components/` — ActivityGrid (custom SVG), TimezoneSelector, AnomalyHighlighter
- `hooks/` — useActivityHeatmap, useHyperionHistory
- `lib/wax/` — hyperion-action-aggregator.ts, timezone-utils.ts, pattern-detector.ts
- `public/mock-data/` — Sample account and collection activity datasets
- `.github/workflows/` — CI automation

Detailed comments explaining the aggregation logic and anomaly detection.

---

## Key WAX Concepts Explained

- **Hyperion Action History**: Efficiently querying timestamped actions for accounts or collections.
- **Block Time to Local Time**: Safe conversion and normalization of on-chain timestamps.
- **Behavioral Pattern Detection**: Statistical and visual methods to flag mechanical vs human activity.
- **Public Indexing**: Using community Hyperion instances for fast historical data.

This is **WAX-primary** but the calendar visualization and pattern detection approach is portable to any Antelope chain with good history indexing.

---

## Design Specifications

- Familiar GitHub contribution calendar aesthetic (easy to understand at a glance)
- Interactive tooltips showing exact action counts per cell
- Clear visual distinction between human-like gaps and solid bot blocks
- Responsive grid that works well on mobile
- Accessible (color-blind safe palettes, keyboard navigation, screen reader support)

Aligned with Pixel Journey Design System.

---

## Technical Architecture & Best Practices

- **Stack**: Next.js 15, TypeScript, Tailwind + shadcn/ui, custom SVG for the grid
- **Data**: Hyperion history API with efficient aggregation
- **Performance**: Client-side processing with caching; pagination handling for large histories
- **Demo Mode**: Full interactive heatmap with pre-loaded realistic datasets
- **Live Mode**: Analyze any public WAX address or collection

See catalog standards for WAX rate limiting, endpoint recommendations, and best practices.

---

## Demo & Usage

- Explore sample human vs bot activity patterns
- Input any WAX address or collection
- Hover cells for detailed counts and timestamps
- Toggle between different time ranges or normalization modes
- Export heatmap images or data

Designed for immediate insight.

---

## Customization

- Adjust anomaly detection thresholds
- Add support for specific action types (claims, transfers, etc.)
- Integrate with other forensics tools (Sybil scorer, funding trail, etc.)
- Customize colors and branding

---

## Roadmap

- v1: Core activity grid + pattern highlighting + demo
- v1.1: Advanced anomaly detection and export features
- Future: Collection-wide heatmaps and comparative views

---

## Contributing & Credits

Built with care for healthier community analysis on WAX.

MIT License.

Following the production-quality educational standards from the gkniftyheads-tracker.

---

*Pixel Journey — Making Web3 interfaces pixel-perfect and delightful.*