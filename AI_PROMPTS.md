# AI handoff — temporal behavior grid

## Non-negotiables

1. Grid is **7 × 24** = 168 cells (Sun=0 … Sat=6).
2. Bot demo 90 actions → occupied ratio **67/168**.
3. Human demo 90 → **75/168**.
4. Neither demo exceeds the flat-coverage thresholds used in the engine; primary flag is often **`neutral`**.
5. Night hours = 00–05 in the **selected** timezone.
6. **Not** a ban signal and **not** a contribution calendar product. Soft signal only; no solo bans.

## Prompt seeds

- "Bot vs human demo occupied ratios."
- "How many cells total, and which day index is Sunday?"
- "Draft a policy note: heatmap as soft signal; timezone caveats."
- "Refuse a ban from the grid alone."

## Do not

- Call Hyperion inside unit tests.
- Treat occupied ratio as identity or contribution proof.
