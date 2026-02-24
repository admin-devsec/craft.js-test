'use client';

import React from 'react';

export const SWATCHES = ['#ffffff', '#0f172a', '#1e293b', '#334155', '#e2e8f0', '#2563eb', '#16a34a', '#f59e0b', '#dc2626'];

export function ColorControl({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">{label}</label>
      <input type="color" className="h-10 w-full rounded border p-1" value={value} onChange={(e) => onChange(e.target.value)} />
      <input className="w-full rounded border p-2 text-sm" value={value} onChange={(e) => onChange(e.target.value)} />
      <div className="flex flex-wrap gap-1">
        {SWATCHES.map((swatch) => (
          <button key={swatch} type="button" className="h-5 w-5 rounded border" style={{ background: swatch }} onClick={() => onChange(swatch)} />
        ))}
      </div>
    </div>
  );
}

export function NumberControl({ label, value, onChange, min = 0, max = 120 }: { label: string; value: number; onChange: (value: number) => void; min?: number; max?: number }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">{label}</label>
      <input type="number" min={min} max={max} className="w-full rounded border p-2 text-sm" value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}

export function SelectControl({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Array<{ label: string; value: string }> }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">{label}</label>
      <select className="w-full rounded border p-2 text-sm" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

export const FLEX_JUSTIFY: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between'
};

export const FLEX_ALIGN: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch'
};
