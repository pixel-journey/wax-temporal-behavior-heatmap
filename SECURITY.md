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
| Identity | Grid is not proof of a human or a bot |

## Attack angles

1. Banning from flat coverage alone.  
2. Ignoring timezone when reading "quiet nights."  
3. Treating `flags.length > 0` as a strong alert (`neutral` still counts).  
4. Mixing this grid with HCI / anomaly scores as if one number were authoritative.  
5. Claiming a live account history was scanned when only local demos ran.

## Honesty limits

Structure is one weak view. Soft signal only.

| Sibling | Distinction |
| --- | --- |
| [organic fingerprinter](https://github.com/pixel-journey/wax-organic-activity-fingerprinter) | HCI 53 / 5 / 45 |
| [anomaly detector](https://github.com/pixel-journey/wax-behavioral-anomaly-detector) | Score 98 / 56 / 25 |

[docs.wax.io](https://docs.wax.io/) · [POLICY.md](POLICY.md).
