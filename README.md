# wax-temporal-behavior-heatmap — Temporal Behavior Heatmap

> **Status:** ✅ **FULL PX PERFECTION (Alpha-Ready)** | July 2026  
> **Category:** Community Forensics & Behavioral Analytics  
> **Parent Catalog:** [pixel-journey/wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)
> **Benchmark:** gkniftyheads-tracker + Pixel Journey PX Perfection Standard v1.0

**Goal:** A GitHub-style contribution calendar visualization that reveals when accounts or collections are most active on WAX. Helps distinguish human-like behavioral patterns from automated/bot behavior through clear 24/7 activity density grids.

---

## Educational Core (Why This Exists)

Raw transaction lists don’t reveal behavioral rhythms. Bots often operate with mechanical consistency 24/7, while humans show natural sleep/wake cycles and weekly patterns. This visual tool makes those differences immediately obvious and quantifiable.

**Common Pitfalls This Tool Addresses**:
- Judging activity volume without understanding timing patterns
- Missing obvious bot signals hidden in consistent 24/7 behavior
- Overwhelming analysts with raw timestamps instead of visual summaries
- Making Sybil or airdrop decisions without behavioral context

**Learning Outcomes**:
After studying this blueprint, you should be able to:
- Understand how temporal patterns reveal human vs automated behavior
- Build contribution-style calendar visualizations
- Aggregate and normalize on-chain timestamps effectively
- Design forensic tools that surface subtle behavioral signals

---

## Tech Recommendations Matrix

| Component             | Recommended                     | Alternative               | Why Chosen                                           | When to Choose Alternative          |
|-----------------------|---------------------------------|---------------------------|------------------------------------------------------|-------------------------------------|
| Visualization         | Custom SVG calendar grid        | Chart libraries           | Full control + retro pixel aesthetic                 | When you need faster development    |
| Data Aggregation      | Client-side + Web Worker        | Server-side aggregation   | Transparent, private, educational                    | When you need very heavy computation|
| Timezone Handling     | Client-side normalization       | UTC only                  | Accurate human pattern detection                     | Simpler global use cases            |

---

## Machine-Optimized Spec (spec.yaml)

```yaml
blueprint:
  id: wax-temporal-behavior-heatmap
  tier: forensics-behavioral
  status: alpha-ready
  benchmark_target: PX-Perfection-Standard-v1.0

features:
  - contribution_style_activity_grid
  - human_vs_bot_pattern_detection
  - timezone_normalized_heatmap
  - anomaly_highlighting

recommended_stack:
  viz: custom SVG calendar
  computation: client_side_aggregation + Web Worker
  data: Hyperion history

machine_instructions:
  - "Build GitHub-style contribution calendar heatmap for WAX activity"
  - "Implement human vs bot pattern detection with clear visual signals"
  - "Add timezone normalization and anomaly highlighting"
  - "Create educational explanations of behavioral forensics"
```

---

## Ecosystem Synergy

This tool pairs extremely well with:
- `wax-account-sybil-distance-scorer` — Add temporal signals to Sybil analysis
- `wax-organic-activity-fingerprinter` — Combine with entropy/humanity scoring
- `wax-collection-holder-overlap-cluster` — Add time-based community insights
- Future governance and airdrop fairness tools

It establishes a reusable behavioral analytics pattern.

---

## Implementation Highlights

Full production code committed with:
- SVG contribution-style heatmap
- Action aggregation by hour/day
- Clear human vs bot visual differentiation
- Anomaly highlighting
- Demo mode with realistic datasets

---

## How to Run
```bash
git clone https://github.com/pixel-journey/wax-temporal-behavior-heatmap.git
npm install
npm run dev
```

Explore activity patterns and identify human-like vs automated behavior.

---

## PX Perfection Alignment

This implementation targets:
- Educational Depth: Strong explanations + learning outcomes
- Documentation Layers: Excellent README + spec.yaml + ecosystem links
- Machine Readiness: Detailed spec.yaml with AI instructions
- Visual Design: Familiar contribution calendar with retro pixel polish
- Ecosystem Synergy: Explicit companion relationships documented

Future iterations will add advanced anomaly detection, multi-account comparison, and deeper integration examples.

*Pixel Journey — Raising the bar for behavioral forensics tooling.*
