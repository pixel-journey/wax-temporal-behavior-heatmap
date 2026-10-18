# Verification Log

Honest record of what has and has not been tested.
Never mark something verified without running it and recording evidence.

## Status legend
- `VERIFIED` — ran against live endpoint or unit test
- `UNTESTED` — code exists, never executed
- `BROKEN` — ran, failed
- `N/A` — not applicable

## Claims in this repo
| Claim | Status | Evidence |
| --- | --- | --- |
| buildHeatmapGrid correctly aggregates timestamps into 7×24 grid | UNTESTED | examples/engines.ts |
| summarizeGrid computes occupied ratio and evenness | UNTESTED | fingerprintTemporal |
| Timezone option changes hour mapping | UNTESTED | engines.ts |
| Weak signal only — never sole input to bans | VERIFIED | README honesty note |
| Demo runs with mock timestamps (zero network) | UNTESTED | examples |

## How to verify
```bash
# Typecheck
npm run typecheck

# (Future) Unit tests
# npx vitest run examples/engines.test.ts
```

**Trust label:** educational-reference
