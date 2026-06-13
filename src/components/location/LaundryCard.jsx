import { SERVICE_META } from '../data/constants';
import { StarIcon, DistanceIcon, PaymentsIcon, ServiceIcon } from './Icons';

export default function LaundryCard({ shop }) {
  const deliveryIcon = shop.fastDelivery ? 'schedule' : 'local_shipping';

  return (
    <div style={{
      display: 'flex',
      background: '#fff',
      borderRadius: 14,
      border: '1px solid #eaeff5',
      overflow: 'hidden',
      transition: 'box-shadow 0.3s, transform 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(10,35,66,0.09)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{ width: 120, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <img
          src={shop.image}
          alt={shop.name}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {shop.tag && (
          <span style={{
            position: 'absolute', top: 7, right: 7,
            background: '#d97706', color: '#fff',
            fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 20,
          }}>
            {shop.tag}
          </span>
        )}
      </div>

      <div style={{ flex: 1, padding: '10px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 3,
            background: '#f5f7fa', borderRadius: 7, padding: '2px 6px',
          }}>
            <StarIcon />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#0a2342' }}>{shop.rating}</span>
          </div>
          <span style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700, fontSize: 13.5, color: '#0a2342' }}>
            {shop.name}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4, fontSize: 11, color: '#6b7a8d' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <DistanceIcon />{shop.distance} كم
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <PaymentsIcon />{shop.price}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 4, marginTop: 7 }}>
          {(shop.services || []).map((s) => (
            <div
              key={s}
              title={SERVICE_META[s]?.label}
              style={{
                width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#f0faf8', border: '1px solid #b2dfdb', borderRadius: 7, color: '#00897b',
              }}
            >
              <ServiceIcon name={SERVICE_META[s]?.icon} style={{ fontSize: 14, color: '#00897b' }} />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 7 }}>
          <span style={{
            display: 'flex', alignItems: 'center', gap: 4, fontSize: 10,
            padding: '3px 8px', borderRadius: 20,
            border: '1px solid #b2dfdb', color: '#00897b', background: '#f0faf8', fontWeight: 600,
          }}>
            <ServiceIcon name={deliveryIcon} style={{ fontSize: 12, color: '#00897b', fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }} />
            {shop.delivery}
          </span>
          <button style={{
            background: '#0a2342', color: '#fff', border: 'none',
            borderRadius: 16, padding: '5px 14px',
            fontFamily: "'Cairo', sans-serif", fontWeight: 700, fontSize: 11,
            cursor: 'pointer', whiteSpace: 'nowrap',
          }}>
            اطلب الآن
          </button>
        </div>
      </div>
    </div>
  );
}
