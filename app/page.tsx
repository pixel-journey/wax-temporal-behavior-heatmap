'use client';

import React, { useState } from 'react';

export default function TemporalBehaviorHeatmap() {
  const [account, setAccount] = useState('pxjourney');
  const [heatmapData, setHeatmapData] = useState<any>(null);

  const generateHeatmap = () => {
    // Mock 7x24 activity grid for demo
    const grid = Array.from({ length: 7 }, () =>
      Array.from({ length: 24 }, () => Math.floor(Math.random() * 100))
    );
    setHeatmapData({ grid, account });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="font-press-start text-2xl tracking-widest text-emerald-400 mb-2">TEMPORAL BEHAVIOR HEATMAP</div>
        <div className="text-xs opacity-60 mb-8">Pixel Journey • Behavioral Forensics • Human vs Bot Patterns</div>

        <div className="glassmorphic-crt pixel-border p-6 rounded-2xl mb-6">
          <div className="flex gap-3 mb-6">
            <input
              value={account}
              onChange={e => setAccount(e.target.value)}
              className="flex-1 bg-black/60 border border-white/10 px-4 py-3 rounded-xl font-mono text-sm"
            />
            <button onClick={generateHeatmap} className="px-8 py-3 bg-emerald-600 rounded-2xl">Generate Heatmap</button>
          </div>

          {heatmapData && (
            <div>
              <div className="text-sm mb-3 opacity-70">Activity by Hour of Day × Day of Week (Demo)</div>
              <div className="grid grid-cols-25 gap-px bg-black/40 p-2 rounded">
                {heatmapData.grid.flat().map((value: number, i: number) => (
                  <div
                    key={i}
                    className="aspect-square"
                    style={{
                      backgroundColor: `rgba(34, 197, 94, ${value / 120})`,
                    }}
                    title={`${value} actions`}
                  />
                ))}
              </div>
              <div className="text-xs opacity-60 mt-3">Solid blocks often indicate automation. Clear daily gaps suggest human behavior.</div>
            </div>
          )}
        </div>

        <div className="text-xs opacity-70">
          In production, this fetches real action history from Hyperion and renders a full interactive contribution-style calendar with timezone normalization.
        </div>
      </div>
    </div>
  );
}
