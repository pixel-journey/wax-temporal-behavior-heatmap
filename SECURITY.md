# Security — temporal behavior heatmap

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Bot-shaped 90 actions / 45 min | occupied **67/168**, flag often `neutral` only |
| Human-shaped 90 | occupied **75/168** |
| flat-coverage | needs occupied > 0.55, evenness > 0.75, total ≥40 |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Timezone | Caller supplies IANA zone; night hours depend on it |
| Ban from grid | **Never** — POLICY and course forbid it |
| Live Hyperion | Unit demos are local timestamps |

## Attack angles

1. Banning from flat coverage alone.  
2. Ignoring timezone when reading "quiet nights."  
3. Treating `flags.length > 0` as a strong alert (`neutral` still counts).

## Honesty limits

Structure is one weak view. [docs.wax.io](https://docs.wax.io/) · [POLICY.md](POLICY.md) · [fingerprinter](https://github.com/pixel-journey/wax-organic-activity-fingerprinter).
