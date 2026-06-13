// src/hooks/useShops.js
import { useState, useEffect } from 'react';
import { fetchShops } from '../services/shopsApi';

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?w=400&q=80',
  'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&q=80',
  'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400&q=80',
  'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=400&q=80',
];

const SERVICE_NAME_MAP = {
  'غسيل':         'laundry',
  'laundry':      'laundry',
  'كوي':          'iron',
  'iron':         'iron',
  'تنظيف جاف':    'dry_cleaning',
  'dry cleaning': 'dry_cleaning',
  'dry_cleaning': 'dry_cleaning',
  'حقائب':        'category',
  'أحذية':        'category',
  'category':     'category',
};

function mapShop(shop, index) {
  const services = (shop.services_offered || [])
    .map((s) => {
      const name = s.name?.toLowerCase() || s.name || '';
      return SERVICE_NAME_MAP[name] || SERVICE_NAME_MAP[s.name] || null;
    })
    .filter(Boolean)
    .filter((v, i, arr) => arr.indexOf(v) === i);

  // تحديث الفحص ليطابق النصوص القادمة من الباك إيند (economy, medium, luxury)
  const priceDisplay =
    shop.price_tier === 'economy' || shop.price_tier === '$'   ? 'اقتصادي' :
    shop.price_tier === 'medium'  || shop.price_tier === '$$'  ? 'متوسط'   :
    shop.price_tier === 'luxury'  || shop.price_tier === '$$$' ? 'فاخر'    : 'متوسط';

  const delivery = shop.fast_delivery_available
    ? 'توصيل سريع ٣٠ دقيقة'
    : 'توصيل ٢-٤ ساعات';

  const tag = shop.avg_rating >= 4.8 ? 'الأعلى تقييماً' : null;

  return {
    id:           shop._id,
    name:         shop.name,
    image:        shop.image_url || PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length],
    rating:       shop.avg_rating ?? 0,
    reviewCount:  shop.review_count ?? 0,
    distance:     shop.distance_km ?? '—',
    price:        priceDisplay,
    fastDelivery: shop.fast_delivery_available,
    delivery,
    services:     services.length ? services : ['laundry'],
    tag,
    lat:          shop.lat,
    lng:          shop.lng,
    address:      shop.address,
  };
}

export function useShops(filters, sort) {
  const [shops, setShops]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchShops(filters, sort)
      .then((data) => {
        if (cancelled) return;
        
        // هنا نقوم بفحص كافة الاحتمالات لشكل البيانات القادمة من الباك إيند لضمان استخراج المصفوفة
        let raw = [];
        if (Array.isArray(data)) {
          raw = data;
        } else if (data && Array.isArray(data.shops)) {
          raw = data.shops;
        } else if (data && Array.isArray(data.data)) {
          raw = data.data;
        }
        
        setShops(raw.map(mapShop));
        setUsingMock(false);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        console.warn('API Error:', err.message);
        setError(err.message);
        setUsingMock(true);
        setShops([]);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [filters, sort]);

  return { shops, loading, error, usingMock };
}