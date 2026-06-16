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
  const { headers: extraHeaders, ...rest } = options;
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(extraHeaders as Record<string, string> | undefined) },
    ...rest,
  });
  const json = await res.json();
  return json;
}

export const ShopApi = {
  async getShop(id: string): Promise<ShopInfo | null> {
    const json = await req<any>(`/shops/${id}`);
    // backend returns { shop: {...}, services: [...], reviews: [...] }
    return json.shop || json.data || null;
  },

  async getShopServices(id: string, category?: string): Promise<ShopService[]> {
    const qs = category && category !== "الكل" ? `?category=${encodeURIComponent(category)}` : "";
    const json = await req<any>(`/shops/${id}/services${qs}`);
    // backend returns plain array of ProviderService docs with populated service field
    const raw: any[] = Array.isArray(json) ? json : (json.data || []);
    return raw.map((ps: any) => ({
      _id: String(ps._id),
      name: ps.service?.name || ps.name || "خدمة",
      image: ps.service?.image || null,
      price: Number(ps.price),
      fast_price: ps.fast_service
        ? Math.round(Number(ps.price) * (Number(ps.fast_multiplier) || 1.5))
        : null,
      unit: ps.unit || "per_piece",
      category: ps.service?.parent?.name || ps.service?.name || "عام",
      fast_service: Boolean(ps.fast_service),
      fast_multiplier: Number(ps.fast_multiplier) || 1.5,
    }));
  },

  async getShopReviews(id: string): Promise<ShopReview[]> {
    const json = await req<any>(`/shops/${id}/reviews`);
    // backend returns { total, reviews: [...] }
    const raw: any[] = json.reviews || json.data || (Array.isArray(json) ? json : []);
    return raw.map((r: any) => ({
      _id: String(r._id),
      rating: Number(r.rating),
      comment: r.comment || "",
      provider_reply: r.reply || null,
      createdAt: r.createdAt || "",
      client: r.customer?.fullName || r.customer?.name || r.client?.name || r.customerName || "عميل",
      avatar: r.avatar || null,
    }));
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
    provider: string;
    items: { provider_service_id: string; quantity: number }[];
    pickup_time: string;
    delivery_time?: string;
    payment_method: "cash" | "card" | "vodafone_cash";
    delivery_type: "pickup" | "delivery";
    address?: string;
    shipping_price?: number;
    notes?: string;
  }): Promise<{ success: boolean; data?: unknown; message?: string }> {
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken") || "";
    return req("/orders", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
  },
};
