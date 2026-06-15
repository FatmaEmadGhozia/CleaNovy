import React from 'react';
import { GridIcon, MapViewIcon } from './Icons';

interface SortOption {
  value: string;
  label: string;
}

const SORT_OPTIONS: SortOption[] = [
  { value: 'rating',   label: 'الأعلى تقييماً' },
  { value: 'reviews',  label: 'الأقل تقييماً' },
];

interface TopBarProps {
  view: string;
  setView: (view: string) => void;
  total: number;
  sort: string;
  setSort?: (sort: string) => void;
}

/* ── admin palette tokens ── */
const NAVY   = '#0D1F3C';
const TEAL   = '#00C9B1';
const BG     = '#F4F6F9';
const BORDER = '#e8eaed';
const MUTED  = '#777779';
const WHITE  = '#fff';

export default function TopBar({ view, setView, total, sort, setSort }: TopBarProps) {
  const btnBase: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 5,
    padding: '6px 12px', borderRadius: 8,
    border: `1px solid ${BORDER}`, fontSize: 12,
    cursor: 'pointer', fontFamily: "'Tajawal', sans-serif", transition: 'all 0.2s',
  };
  const activeStyle:   React.CSSProperties = { background: NAVY,  color: WHITE, borderColor: NAVY };
  const inactiveStyle: React.CSSProperties = { background: WHITE, color: MUTED };

  return (
    <div style={{
      background: WHITE,
      borderBottom: `1px solid ${BORDER}`,
      padding: '10px 18px',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', flexShrink: 0,
    }}>

      {/* View toggle */}
      <div style={{ display: 'flex', gap: 5 }}>
        {[
          { id: 'map',  label: 'عرض الخريطة', Icon: MapViewIcon },
          { id: 'grid', label: 'شبكة',         Icon: GridIcon   },
        ].map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setView(id)}
            style={{ ...btnBase, ...(view === id ? activeStyle : inactiveStyle) }}
          >
            <Icon style={{ color: view === id ? WHITE : MUTED }} />
            {label}
          </button>
        ))}
      </div>

      {/* Sort dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: MUTED }}>
        <span style={{ fontFamily: "'Tajawal', sans-serif" }}>ترتيب حسب:</span>
        <select
          value={sort}
          onChange={(e) => setSort && setSort(e.target.value)}
          style={{
            border: `1px solid ${BORDER}`, borderRadius: 8,
            padding: '6px 10px', background: WHITE, cursor: 'pointer',
            fontSize: 12, color: NAVY, fontWeight: 600,
            fontFamily: "'Tajawal', sans-serif", outline: 'none',
          }}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Count */}
      <div style={{ textAlign: 'right' }}>
        <p style={{
          fontFamily: "'Tajawal', sans-serif", fontWeight: 800,
          fontSize: 16, color: NAVY, margin: 0,
        }}>
          {total} مغسلة متاحة
        </p>
        <p style={{ fontSize: 11, color: MUTED, margin: 0, fontFamily: "'Tajawal', sans-serif" }}>
          أفضل النتائج القريبة منك في القاهرة
        </p>
      </div>
    </div>
  );
}
