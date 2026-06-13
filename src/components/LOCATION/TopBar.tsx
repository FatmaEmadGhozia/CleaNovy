import React from 'react';
import { GridIcon, MapViewIcon } from './Icons';

interface SortOption {
  value: string;
  label: string;
}

const SORT_OPTIONS: SortOption[] = [
  { value: 'rating', label: 'الأعلى تقييماً' },
  { value: 'reviews', label: 'الاقل تقييماً' },
];

interface TopBarProps {
  view: string;
  setView: (view: string) => void;
  total: number;
  sort: string;
  setSort?: (sort: string) => void;
}

export default function TopBar({ view, setView, total, sort, setSort }: TopBarProps) {
  const btnBase: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 5,
    padding: '6px 12px', borderRadius: 10,
    border: '1px solid #e0e5eb', fontSize: 12,
    cursor: 'pointer', fontFamily: "'Tajawal', sans-serif", transition: 'all 0.2s',
  };
  const activeStyle: React.CSSProperties = { background: '#0a2342', color: '#fff', borderColor: '#0a2342' };
  const inactiveStyle: React.CSSProperties = { background: '#fff', color: '#6b7a8d' };

  return (
    <div style={{
      background: '#fff', borderBottom: '1px solid #e8edf2',
      padding: '10px 18px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', flexShrink: 0,
    }}>
      {/* View toggle */}
      <div style={{ display: 'flex', gap: 5 }}>
        {[
          { id: 'map', label: 'عرض الخريطة', Icon: MapViewIcon },
          { id: 'grid', label: 'شبكة', Icon: GridIcon },
        ].map(({ id, label, Icon }) => (
          <button key={id} onClick={() => setView(id)}
            style={{ ...btnBase, ...(view === id ? activeStyle : inactiveStyle) }}>
            <Icon style={{ color: view === id ? '#fff' : '#6b7a8d' }} />
            {label}
          </button>
        ))}
      </div>

      {/* Sort dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: '#6b7a8d' }}>
        <span>ترتيب حسب:</span>
        <select
          value={sort}
          onChange={(e) => setSort && setSort(e.target.value)}
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            border: '1px solid #e0e5eb', borderRadius: 10,
            padding: '6px 10px', background: '#fff', cursor: 'pointer',
            fontSize: 12, color: '#0a2342', fontWeight: 600,
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
        <p style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 800, fontSize: 17, color: '#0a2342', margin: 0 }}>
          {total} مغسلة متاحة
        </p>
        <p style={{ fontSize: 10.5, color: '#9aa5b4', margin: 0 }}>
          أفضل النتائج القريبة منك في القاهرة
        </p>
      </div>
    </div>
  );
}
