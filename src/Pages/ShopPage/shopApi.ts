export interface ShopService {
  _id: string;
  name: string;
  image: string | null;
  price: number;
  fast_price: number | null;
  unit: string;
  category: string;
  fast_service: boolean;
  fast_multiplier: number;
}

export interface ShopReview {
  _id: string;
  rating: number;
  comment: string;
  provider_reply: string | null;
  createdAt: string;
  client: string;
  avatar: string | null;
}

export interface ShopInfo {
  _id: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  logo?: string | null;
  images?: string[];
  avg_rating?: number | null;
  total_reviews?: number;
  is_verified?: boolean;
}

export interface CartTotals {
  lineItems: unknown[];
  totalQty: number;
  subtotal: number;
  discountRate: number;
  discount: number;
  vat: number;
  vatRate: number;
  deliveryFee: number;
  total: number;
  currency: string;
}

export interface CartItem {
  serviceId: string;
  quantity: number;
  fast?: boolean;
}

const BASE = `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api`;

async function req<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  const json = await res.json();
  return json;
}

export const ShopApi = {
  async getShop(id: string): Promise<ShopInfo | null> {
    const json = await req<{ success: boolean; data: ShopInfo }>(`/shops/${id}`);
    return json.data || null;
  },

  async getShopServices(id: string, category?: string): Promise<ShopService[]> {
    const qs = category && category !== "الكل" ? `?category=${encodeURIComponent(category)}` : "";
    const json = await req<{ success: boolean; data: ShopService[] }>(`/shops/${id}/services${qs}`);
    return json.data || [];
  },

  async getShopReviews(id: string): Promise<ShopReview[]> {
    const json = await req<{ success: boolean; data: ShopReview[] }>(`/shops/${id}/reviews`);
    return json.data || [];
  },

  async addReview(id: string, payload: { rating: number; comment: string }): Promise<{ success: boolean; data?: ShopReview }> {
    return req(`/shops/${id}/reviews`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async calculateCart(items: CartItem[], deliveryFee = 0): Promise<CartTotals | null> {
    const json = await req<{ success: boolean; data: CartTotals }>("/cart/calculate", {
      method: "POST",
      body: JSON.stringify({ items, deliveryFee }),
    });
    return json.data || null;
  },

  async placeOrder(payload: {
    shopId: string;
    customerName?: string;
    phone?: string;
    address?: string;
    notes?: string;
    paymentMethod?: string;
    deliveryFee?: number;
    items: CartItem[];
  }): Promise<{ success: boolean; data?: unknown; message?: string }> {
    return req("/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
