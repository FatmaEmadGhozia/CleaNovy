export const BASE_URL = 'http://localhost:5000/api';

async function apiFetch(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      url.searchParams.append(k, v);
    }
  });

  console.log('🔍 API Request:', url.toString());

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  console.log('✅ API Response:', data);

  return data;
}

export function fetchShops(filters = {}, sort = 'rating') {
  const SORT_MAP = {
    rating: 'rating',
    reviews: 'reviews',
    distance: 'distance',
    price_asc: 'price_asc',
    price_desc: 'price_desc',
  };

  const PRICE_MAP = {
    'اقتصادي': 'economy',
    'متوسط': 'medium',
    'فاخر': 'luxury',
  };

  const params = {
    sort_by: SORT_MAP[sort] || 'rating',
  };

  if (filters.search) {
    params.search = filters.search;
  } else {
    if (filters.lat) params.lat = filters.lat;
    if (filters.lng) params.lng = filters.lng;
  }

  // ✅ السعر
  if (filters.price) {
    const mapped = PRICE_MAP[filters.price];
    if (mapped) params.price_range = mapped;
  }

  return apiFetch('/shops', params);
}