import { SERVICE_META } from '../../data/constants';
import { StarIcon, DistanceIcon, PaymentsIcon, ServiceIcon } from './Icons';

interface Shop {
  id: string | number;
  name: string;
  image: string;
  tag?: string | null;
  rating: number;
  distance: number | string;
  price: string;
  services?: string[];
  fastDelivery?: boolean;
  delivery: string;
  lat?: number;
  lng?: number;
  address?: string;
}

interface GridCardProps {
  shop: Shop;
}

export default function GridCard({ shop }: GridCardProps) {
  const deliveryIcon = shop.fastDelivery ? 'schedule' : 'local_shipping';

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 16,
        border: '1px solid #eaeff5',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.3s, transform 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 28px rgba(10,35,66,0.11)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ width: '100%', height: 140, position: 'relative', overflow: 'hidden' }}>
        <img
          src={shop.image}
          alt={shop.name}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {shop.tag && (
          <span style={{
            position: 'absolute', top: 8, right: 8,
            background: '#d97706', color: '#fff',
            fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 20,
          }}>
            {shop.tag}
          </span>
        )}
      </div>

      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 2,
            background: '#f5f7fa', borderRadius: 7, padding: '2px 6px', flexShrink: 0,
          }}>
            <StarIcon />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#0a2342' }}>{shop.rating}</span>
          </div>
          <span style={{
            fontFamily: "'Cairo', sans-serif", fontWeight: 700,
            fontSize: 13, color: '#0a2342', lineHeight: 1.3, textAlign: 'right',
          }}>
            {shop.name}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10.5, color: '#6b7a8d' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <DistanceIcon />{shop.distance} كم
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <PaymentsIcon />{shop.price}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {(shop.services || []).map((s) => (
            <div
              key={s}
              title={SERVICE_META[s]?.label}
              style={{
                width: 26, height: 26,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#f0faf8', border: '1px solid #b2dfdb',
                borderRadius: 6, color: '#00897b',
              }}
            >
              <ServiceIcon name={SERVICE_META[s]?.icon} style={{ fontSize: 13, color: '#00897b' }} />
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: 'auto', paddingTop: 8, borderTop: '1px solid #f0f4f8',
        }}>
          <span style={{
            display: 'flex', alignItems: 'center', gap: 3, fontSize: 9.5,
            padding: '3px 7px', borderRadius: 20,
            border: '1px solid #b2dfdb', color: '#00897b', background: '#f0faf8', fontWeight: 600,
          }}>
            <ServiceIcon
              name={deliveryIcon}
              style={{ fontSize: 11, color: '#00897b', fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
            />
            {shop.delivery}
          </span>
          <button style={{
            background: '#0a2342', color: '#fff', border: 'none',
            borderRadius: 14, padding: '5px 12px',
            fontFamily: "'Cairo', sans-serif", fontWeight: 700, fontSize: 10.5,
            cursor: 'pointer',
          }}>
            اطلب الآن
          </button>
        </div>
      </div>
    </div>
  );
}
