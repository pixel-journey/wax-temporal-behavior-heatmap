# Education — a day-of-week × hour grid from timestamps

> **Rung:** `npm test` passes. The lab builds a 7×24 count grid in a chosen timezone and attaches soft structural flags. It is not a ban signal.  
> **The test is the rule.**

## What you should be able to do

| Level | After this file |
| --- | --- |
| Beginner | Run the bot demo and see totalActions equal the input length and occupiedCellRatio > 0.3 |
| Intermediate | Explain evenness, the flat-coverage flag, and why night hours are timezone-dependent |
| Masterclass | Say why a heatmap pattern is weak evidence and must not be used alone |

---

## Beginner — one scene

```ts
const bot = fingerprintTemporal(demoBotTimestamps(90), { timeZone: "UTC" });
bot.totalActions === 90
bot.occupiedCellRatio > 0.3

const human = fingerprintTemporal(demoHumanTimestamps(90), { timeZone: "UTC" });
human.totalActions === 90
human.flags.length > 0
```

The bot demo steps every 45 minutes. The human demo prefers daytime jumps with occasional longer pauses.

### Words

| Word | Meaning here |
| --- | --- |
| Grid | 7 rows (Sun=0 … Sat=6) × 24 hours, counts of timestamps |
| occupiedCellRatio | Fraction of the 168 cells that are non-zero |
| evenness | 1 − clamped CV of the non-zero cells. Higher means more uniform density |
| Night hours | 00–05 in the selected timezone |
| Flag | soft structural note (small-sample, flat-coverage, quiet-nights, night-heavy, or neutral) |

### Predict, then run

```bash
npm test
```

1. Bot demo (90) has totalActions 90 and occupiedCellRatio > 0.3.
2. Human demo (90) has totalActions 90 and at least one flag.

---

## Intermediate — how the grid and flags are built

`localDowAndHour` uses `Intl.DateTimeFormat` with the supplied IANA zone. `buildHeatmapGrid` increments the matching cell. `summarizeGrid` computes total, maxCell, occupied ratio, and evenness among active cells.

Flags:

- small-sample when total < 20
- flat-coverage (alert) when occupied > 0.55, evenness > 0.75, and total ≥ 40
- quiet-nights (info) when night share < 0.08 and total ≥ 30
- night-heavy (info) when night share > 0.45
- neutral info when nothing else fires

### Attack → test

| Attack | Naive code | This lab | Test |
| --- | --- | --- | --- |
| Ban from a flat grid | Sole decision | flags are soft; POLICY says never ban from the grid alone | engines.test.ts + POLICY |
| Ignore timezone | Wrong night hours | caller supplies timeZone; default UTC | localDowAndHour |
| Call Hyperion from the unit test | Network | pure local demos | engines.test.ts |
| Treat quiet nights as proof of a human | Overclaim | info flag only; confirm timezone | quiet-nights message |

---

## Masterclass — structure is still only one view

A global team or a shift worker can look flat. A bot can sleep. The grid only counts when the timestamps you gave it fell.

What is still not here:

- Live Hyperion data in the unit-test path.
- A claim that flat coverage proves automation.
- Persistence or a contribution-calendar product.
- Any ban or airdrop rule.

Companions: interval engines in the fingerprinter and anomaly detector.

### Exercise

1. Why does the bot demo have high coverage? (Regular 45 min steps over many hours. Tested ratio > 0.3.)
2. What does evenness measure? (Uniformity of the non-zero cells.)
3. Should you ban from the grid alone? (No. POLICY and the course say never.)

---

## What this course will not teach

- How to ban from a heatmap
- A production activity calendar
- Timezone-proof human detection
