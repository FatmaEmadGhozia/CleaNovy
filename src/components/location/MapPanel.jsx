import { LocateIcon } from './Icons';

export default function MapPanel() {
  return (
    <div style={{ position: 'relative', height: '100%', width: '100%', background: '#0a1628', overflow: 'hidden' }}>
      {/* Grid overlay */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.13 }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="mapgrid" width="34" height="34" patternUnits="userSpaceOnUse">
            <path d="M 34 0 L 0 0 0 34" fill="none" stroke="#00e5cc" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mapgrid)" />
      </svg>

      {/* Road network */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 380 580"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Secondary roads */}
        <g stroke="#00bcd4" strokeOpacity="0.12" fill="none">
          <path d="M50 0 Q100 120 70 260 Q50 380 85 580" strokeWidth="9" />
          <path d="M135 0 Q158 170 145 340 Q130 470 152 580" strokeWidth="5" />
          <path d="M220 0 Q232 155 226 305 Q222 450 234 580" strokeWidth="7" />
          <path d="M305 0 Q290 175 312 335 Q330 470 315 580" strokeWidth="5" />
          <path d="M0 90 Q80 106 190 98 Q285 90 380 103" strokeWidth="6" />
          <path d="M0 215 Q70 230 185 222 Q300 214 380 228" strokeWidth="5" />
          <path d="M0 345 Q78 360 195 352 Q312 344 380 358" strokeWidth="7" />
          <path d="M0 460 Q88 474 193 466 Q305 458 380 472" strokeWidth="5" />
        </g>
        {/* Main arteries */}
        <g stroke="#00e5cc" strokeOpacity="0.3" fill="none">
          <path d="M195 0 Q202 185 197 370 Q192 510 197 580" strokeWidth="2.5" />
          <path d="M0 290 Q88 297 195 290 Q305 283 380 296" strokeWidth="2.5" />
          <path d="M98 0 Q109 280 100 580" strokeWidth="1.5" />
          <path d="M0 148 Q195 143 380 150" strokeWidth="1.5" />
        </g>
      </svg>

      {/* Locate button */}
      <button style={{
        position: 'absolute', top: 12, left: 12,
        display: 'flex', alignItems: 'center', gap: 5,
        background: 'rgba(255,255,255,0.1)', color: '#7ee8d4',
        fontSize: 11, border: '1px solid rgba(0,229,204,0.3)',
        padding: '6px 10px', borderRadius: 20, cursor: 'pointer',
        fontFamily: "'Tajawal', sans-serif", zIndex: 10,
      }}>
        <LocateIcon style={{ fontSize: 13, color: '#7ee8d4' }} />
        تحديد موقعي الحالي
      </button>

      {/* Zoom controls */}
      <div style={{ position: 'absolute', bottom: 18, left: 12, display: 'flex', flexDirection: 'column', gap: 4, zIndex: 10 }}>
        {['+', '−'].map((s) => (
          <button key={s} style={{
            width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(0,229,204,0.3)',
            color: '#7ee8d4', borderRadius: 5, cursor: 'pointer', fontSize: 16, fontWeight: 300,
          }}>
            {s}
          </button>
        ))}
      </div>

      {/* City label */}
      <div style={{ position: 'absolute', bottom: 14, right: 12, textAlign: 'right', userSelect: 'none' }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(0,229,204,0.5)', margin: 0 }}>CAIRO</p>
        <small style={{ fontSize: 8, letterSpacing: '0.2em', color: 'rgba(0,229,204,0.25)', display: 'block' }}>EGYPT</small>
      </div>
    </div>
  );
}
