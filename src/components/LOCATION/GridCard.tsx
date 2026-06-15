import { useNavigate } from 'react-router-dom';
import { SERVICE_META } from '../../data/constants';
import { StarIcon, DistanceIcon, PaymentsIcon, ServiceIcon } from './Icons';
import './locationCards.css';

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

export default function GridCard({ shop }: { shop: Shop }) {
  const navigate = useNavigate();
  const deliveryIcon = shop.fastDelivery ? 'schedule' : 'local_shipping';

  return (
    <div className="lc-grid-card">
      <div className="lc-grid-img">
        <img src={shop.image} alt={shop.name} loading="lazy" />
        {shop.tag && <span className="lc-tag-grid">{shop.tag}</span>}
      </div>

      <div className="lc-grid-body">
        <div className="lc-grid-header">
          <div className="lc-rating-badge">
            <StarIcon />
            <span className="lc-rating-val">{shop.rating}</span>
          </div>
          <span className="lc-grid-name">{shop.name}</span>
        </div>

        <div className="lc-grid-meta">
          <span className="lc-meta-item"><DistanceIcon />{shop.distance} كم</span>
          <span className="lc-meta-item"><PaymentsIcon />{shop.price}</span>
        </div>

        <div className="lc-services">
          {(shop.services || []).map((s) => (
            <div key={s} className="lc-svc-icon-sm" title={SERVICE_META[s]?.label}>
              <ServiceIcon name={SERVICE_META[s]?.icon} style={{ fontSize: 13 }} />
            </div>
          ))}
        </div>

        <div className="lc-grid-footer">
          <span className="lc-delivery-badge lc-delivery-badge-sm">
            <ServiceIcon
              name={deliveryIcon}
              style={{ fontSize: 11, fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
            />
            {shop.delivery}
          </span>
          <button
            type="button"
            className="lc-btn-order lc-btn-order-sm"
            onClick={() => navigate(`/laundry/${shop.id}`)}
          >
            اطلب الآن
          </button>
        </div>
      </div>
    </div>
  );
}
