'use client';

import React, { useMemo, useState } from 'react';
import {
  demoBotTimestamps,
  demoHumanTimestamps,
  fingerprintTemporal,
} from '../examples/engines';

type Mode = 'human' | 'bot';

const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function TemporalBehaviorHeatmap() {
  const [mode, setMode] = useState<Mode>('human');

  const summary = useMemo(() => {
    const ts =
      mode === 'human' ? demoHumanTimestamps(90) : demoBotTimestamps(90);
    return fingerprintTemporal(ts, { timeZone: 'UTC' });
  }, [mode]);

  const max = Math.max(1, summary.maxCell);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-2xl tracking-widest text-emerald-400 mb-2 font-bold">
          TEMPORAL BEHAVIOR HEATMAP
        </div>
        <div className="text-xs opacity-60 mb-6">
          Pixel Journey · Day×hour density · Not identity proof
        </div>

        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setMode('human')}
            className={`px-4 py-2 rounded-xl text-sm ${
              mode === 'human' ? 'bg-emerald-600' : 'bg-white/10'
            }`}
          >
            Demo human-like
          </button>
          <button
            type="button"
            onClick={() => setMode('bot')}
            className={`px-4 py-2 rounded-xl text-sm ${
              mode === 'bot' ? 'bg-amber-600' : 'bg-white/10'
            }`}
          >
            Demo always-on
          </button>
        </div>

        <div className="border border-white/10 bg-black/40 p-6 rounded-2xl mb-6 overflow-x-auto">
          <div className="text-sm mb-3 opacity-70">
            Activity by hour × weekday (UTC demo) · total {summary.totalActions}
          </div>
          <div
            className="grid gap-px min-w-[640px]"
            style={{ gridTemplateColumns: '24px repeat(24, minmax(0, 1fr))' }}
          >
            <div />
            {Array.from({ length: 24 }, (_, h) => (
              <div key={h} className="text-[8px] text-center opacity-40">
                {h}
              </div>
            ))}
            {summary.grid.map((row, d) => (
              <div key={d} className="contents">
                <div className="text-[10px] opacity-50 flex items-center">{DOW[d]}</div>
                {row.map((v, h) => (
                  <div
                    key={`${d}-${h}`}
                    className="aspect-square rounded-[1px]"
                    title={`${v}`}
                    style={{
                      backgroundColor: `rgba(34, 197, 94, ${0.08 + (v / max) * 0.9})`,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          <ul className="mt-4 space-y-1 text-xs opacity-80">
            {summary.flags.map((f) => (
              <li key={f.id}>
                [{f.level}] {f.message}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs opacity-60 leading-relaxed">
          Production: pass real Hyperion timestamps into{" "}
          <code className="text-emerald-400/80">fingerprintTemporal</code> with an
          explicit timezone. See <code className="text-emerald-400/80">/examples</code>.
          Do not use heatmap density alone for bans or airdrop exclusion.
        </p>
      </div>
    </div>
  );
}
