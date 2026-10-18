# wax-temporal-behavior-heatmap

> **Status:** 🔄 Deep Refinement (PX Perfection Standard v1.1)  
> **Category:** Behavioral analytics / light forensics  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

**Goal:** Build a transparent **day-of-week × hour-of-day** activity grid from action timestamps — contribution-calendar style — plus simple structural flags. Educational companion to the organic activity fingerprinter.

> Timing heatmaps are **weak signals**. Always-on activity can be bots *or* global teams. Quiet nights depend on **timezone**. Never ban from a grid alone.

---

## Honesty note

An earlier page used **`Math.random()`** cells while the README claimed full PX perfection. Core logic is now pure aggregation in `examples/engines.ts`.

---

## Quick Start

```ts
import { fingerprintTemporal } from "./examples/engines";

const summary = fingerprintTemporal(unixSecondsArray, { timeZone: "UTC" });
// summary.grid[dow][hour], summary.flags, summary.evenness
```

Render with `HeatmapGridView`, `HeatmapStats`, `HeatmapFlags`.

---

## 1. Educational Core

| Concept | Meaning |
|---------|--------|
| **Grid cell** | Count of actions in that local weekday + hour |
| **Occupied ratio** | Share of 168 cells with any activity |
| **Evenness** | How flat density is among active cells |
| **Timezone** | Changes which hours look like “night” |

### Learning outcomes

- Aggregate timestamps into a 7×24 grid
- Interpret coverage vs sleep-gap patterns cautiously
- Pair with interval entropy (`wax-organic-activity-fingerprinter`)

---

## 2. Architecture

```
timestamps + timeZone → buildHeatmapGrid → summarizeGrid → UI
```

Hyperion fetch stays at the app edge.

---

## 3. Integration levels

| Level | Scope |
|-------|--------|
| **Minimal** | Grid + counts |
| **Recommended** | Stats + flags + TZ selector |
| **Advanced** | Multi-account compare, year contribution calendar |

---

## 4. Ecosystem position

- `wax-organic-activity-fingerprinter` — interval variance
- `wax-funding-trail-lineage-graph` — capital origins
- Airdrop / Sybil tools — soft signal only

---

## 5. License

MIT — **Pixel Journey**

*Last major refinement pass: October 2026*
