# Day-of-week × hour activity grid with soft structural flags

> **Trust:** `educational-reference`  
> **Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

**One-sentence goal:** Teach a pure 7×24 count grid from timestamps in a chosen timezone, plus soft flags for coverage and night share — without claiming a ban signal.

**Real code:** `npm test`. **Does not** ban from the grid alone.

The course is [EDUCATION.md](EDUCATION.md) (beginner, intermediate, masterclass).

## What is true (executed)

| Rule | Result |
| --- | --- |
| bot demo (90, UTC) | totalActions 90, occupiedCellRatio > 0.3 |
| human demo (90, UTC) | totalActions 90, flags.length > 0 |
| flat-coverage flag | occupied > 0.55 and evenness > 0.75 and total ≥ 40 |
| night hours | 00–05 in the selected timezone |
| small-sample | total < 20 |

## What is in the repo

| Piece | Role |
| --- | --- |
| `examples/engines.ts` | grid, summary, flags, human/bot demos |
| `examples/engines.test.ts` | bot coverage, human flags |
| `examples/HeatmapGrid.tsx` | visual grid |
| `examples/live/` | optional Hyperion helper |
| Docs | EDUCATION · POLICY · ARCHITECTURE · VERIFICATION-LOG |

## Run

```bash
npm install
npm test
npm run dev
```

## Best practice and the opposite

**Do** pass an explicit timezone.  
**Do** treat every flag as weak evidence.  
**Do** combine with interval stats and other signals.

**Do not** ban from the grid alone.  
**Do not** treat quiet nights as proof of a human.  
**Do not** ignore the small-sample warning.

## Related

- `wax-organic-activity-fingerprinter`
- `wax-behavioral-anomaly-detector`

MIT — Pixel Journey
