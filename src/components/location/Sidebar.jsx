import { SERVICE_META, PRICE_OPTIONS } from '../data/constants';
import { PinIcon, CheckIcon } from './Icons';

export default function Sidebar({ filters, setFilters }) {
  const serviceKeys = Object.keys(SERVICE_META);

  function toggleService(key) {
    setFilters((f) => ({
      ...f,
      services: f.services.includes(key)
        ? f.services.filter((s) => s !== key)
        : [...f.services, key],
    }));
  }

  const sectionStyle = { display: 'flex', flexDirection: 'column' };
  const h3Style = {
    fontFamily: "'Cairo', sans-serif",
    fontWeight: 700,
    fontSize: 13,
    color: '#0a2342',
    marginBottom: 7,
  };

  return (
    <aside style={{
      width: 220,
      flexShrink: 0,
      background: '#fff',
      borderLeft: '1px solid #e8edf2',
      padding: '18px 14px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
    }}>
      {/* Location */}
      <div style={sectionStyle}>
        <h3 style={h3Style}>الموقع</h3>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: '#f5f7fa', border: '1px solid #e8edf2',
          borderRadius: 10, padding: '8px 10px', fontSize: 12, color: '#4a5568',
        }}>
          <PinIcon />
          <span>القاهرة، مصر الجديدة</span>
        </div>
      </div>

      {/* Distance */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{
            background: '#e6faf6', color: '#00897b',
            border: '1px solid #b2dfdb', borderRadius: 20,
            padding: '1px 8px', fontSize: 11, fontWeight: 700,
          }}>
            {filters.distance} كم
          </span>
          <h3 style={{ ...h3Style, marginBottom: 0 }}>المسافة</h3>
        </div>
        <input
          type="range"
          min={1}
          max={30}
          value={filters.distance}
          onChange={(e) => setFilters((f) => ({ ...f, distance: +e.target.value }))}
          style={{ width: '100%', accentColor: '#00b89c' }}
        />
      </div>

      {/* Services */}
      <div style={sectionStyle}>
        <h3 style={h3Style}>الخدمات</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {serviceKeys.map((key) => {
            const checked = filters.services.includes(key);
            return (
              <label key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <div
                  onClick={() => toggleService(key)}
                  style={{
                    width: 18, height: 18, borderRadius: 5,
                    border: `2px solid ${checked ? '#00b89c' : '#cbd5e0'}`,
                    background: checked ? '#00b89c' : '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s',
                  }}
                >
                  {checked && <CheckIcon />}
                </div>
                <span style={{ fontSize: 12.5, color: '#4a5568' }}>{SERVICE_META[key].label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price */}
      <div style={sectionStyle}>
        <h3 style={h3Style}>نطاق السعر</h3>
        <div style={{ display: 'flex', gap: 5 }}>
          {PRICE_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilters((f) => ({ ...f, price: opt }))}
              style={{
                flex: 1, fontSize: 11, padding: '6px 2px',
                borderRadius: 8,
                border: `1px solid ${filters.price === opt ? '#0a2342' : '#e0e5eb'}`,
                background: filters.price === opt ? '#0a2342' : '#fff',
                color: filters.price === opt ? '#fff' : '#4a5568',
                cursor: 'pointer', fontWeight: 600,
                fontFamily: "'Tajawal', sans-serif",
                transition: 'all 0.2s',
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Fast delivery toggle */}
      <div style={sectionStyle}>
        <h3 style={h3Style}>خيارات إضافية</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => setFilters((f) => ({ ...f, fastDelivery: !f.fastDelivery }))}
            aria-label="تبديل خدمة التوصيل السريع"
            style={{
              position: 'relative', width: 42, height: 22, borderRadius: 20,
              background: filters.fastDelivery ? '#00b89c' : '#cbd5e0',
              border: 'none', cursor: 'pointer', transition: 'background 0.3s',
            }}
          >
            <span style={{
              position: 'absolute', top: 3,
              left: filters.fastDelivery ? 22 : 3,
              width: 16, height: 16, borderRadius: '50%',
              background: '#fff', transition: 'left 0.3s',
            }} />
          </button>
          <span style={{ fontSize: 12, color: '#4a5568' }}>خدمة التوصيل السريع</span>
        </div>
      </div>
    </aside>
  );
}
