'use client';

import React, { useCallback, useMemo, useState } from 'react';
import {
  demoBotTimestamps,
  demoHumanTimestamps,
  fingerprintTemporal,
} from '../examples/engines';
import { fetchAccountActionTimestamps } from '../examples/live/hyperion';

type Mode = 'live' | 'human' | 'bot';

const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function TemporalBehaviorHeatmap() {
  const [mode, setMode] = useState<Mode>('live');
  const [account, setAccount] = useState('eosio');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [liveTs, setLiveTs] = useState<number[] | null>(null);
  const [meta, setMeta] = useState<string | null>(null);

  const demoSummary = useMemo(() => {
    if (mode === 'human')
      return fingerprintTemporal(demoHumanTimestamps(90), { timeZone: 'UTC' });
    if (mode === 'bot')
      return fingerprintTemporal(demoBotTimestamps(90), { timeZone: 'UTC' });
    return null;
  }, [mode]);

  const liveSummary = useMemo(
    () =>
      liveTs && liveTs.length > 0
        ? fingerprintTemporal(liveTs, { timeZone: 'UTC' })
        : null,
    [liveTs]
  );

  const summary = mode === 'live' ? liveSummary : demoSummary;
  const max = Math.max(1, summary?.maxCell ?? 1);

  const runLive = useCallback(async () => {
    setLoading(true);
    setError(null);
    setMeta(null);
    try {
      const { timestamps, source, rawCount } =
        await fetchAccountActionTimestamps(account, { limit: 200 });
      if (timestamps.length === 0) {
        setError('No actions returned.');
        setLiveTs(null);
        return;
      }
      setLiveTs(timestamps);
      setMeta(`${rawCount} actions from Hyperion · ${source}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Live fetch failed');
      setLiveTs(null);
    } finally {
      setLoading(false);
    }
  }, [account]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-2xl tracking-widest text-emerald-400 mb-2 font-bold">
          TEMPORAL BEHAVIOR HEATMAP
        </div>
        <div className="text-xs opacity-60 mb-6">
          Pixel Journey · Live Hyperion or demo · Not identity proof
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            type="button"
            onClick={() => setMode('live')}
            className={`px-4 py-2 rounded-xl text-sm ${
              mode === 'live' ? 'bg-sky-600' : 'bg-white/10'
            }`}
          >
            Live Hyperion
          </button>
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

        {mode === 'live' && (
          <div className="border border-white/10 bg-black/40 p-4 rounded-2xl mb-6 flex flex-col sm:flex-row gap-3">
            <input
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="flex-1 bg-black/60 border border-white/10 px-4 py-3 rounded-xl font-mono text-sm"
              placeholder="WAX account"
            />
            <button
              type="button"
              onClick={runLive}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-sky-600 text-sm font-medium disabled:opacity-50"
            >
              {loading ? 'Fetching…' : 'Build live heatmap'}
            </button>
          </div>
        )}

        {error && (
          <div className="mb-4 text-sm text-red-400 border border-red-500/30 rounded-xl p-3">
            {error}
          </div>
        )}
        {meta && (
          <div className="mb-4 text-xs opacity-50 break-all">{meta}</div>
        )}

        {summary && (
          <div className="border border-white/10 bg-black/40 p-6 rounded-2xl mb-6 overflow-x-auto">
            <div className="text-sm mb-3 opacity-70">
              Activity by hour × weekday (UTC) · total {summary.totalActions}
            </div>
            <div
              className="grid gap-px min-w-[640px]"
              style={{
                gridTemplateColumns: '24px repeat(24, minmax(0, 1fr))',
              }}
            >
              <div />
              {Array.from({ length: 24 }, (_, h) => (
                <div key={h} className="text-[8px] text-center opacity-40">
                  {h}
                </div>
              ))}
              {summary.grid.map((row, d) => (
                <div key={d} className="contents">
                  <div className="text-[10px] opacity-50 flex items-center">
                    {DOW[d]}
                  </div>
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
        )}

        {!summary && mode === 'live' && !loading && !error && (
          <p className="text-sm opacity-50 mb-6">
            Enter a WAX account and fetch Hyperion actions for the day×hour grid.
          </p>
        )}

        <p className="text-xs opacity-60 leading-relaxed">
          Live: Hyperion → timestamps →{' '}
          <code className="text-emerald-400/80">fingerprintTemporal</code>. Do not use
          heatmap density alone for bans or airdrop exclusion.
        </p>
      </div>
    </div>
  );
}
