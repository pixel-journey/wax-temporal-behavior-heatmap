# ARCHITECTURE.md — Temporal Behavior Heatmap

## Invariants

1. Grid counts are pure functions of timestamps + timezone
2. Flags cite triggers
3. UI must not claim identity or ban-grade certainty
4. Timezone is explicit (default UTC for demos)

## Flow

```
Hyperion times → fingerprintTemporal → HeatmapGridView / Stats / Flags
```

---

*Pixel Journey*
