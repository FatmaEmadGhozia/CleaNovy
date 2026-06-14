// types.ts
// ── Types المشتركة في الـ Checkout ────────────────────

export type PayMethod = "card" | "vodafone_cash" | "cash";

export interface CartItem {
  service: {
    id: string;
    name: string;
    subtitle: string;
    price: number;
    icon: string;
  };
  quantity: number;
}

export interface CheckoutState {
  cart: CartItem[];
  subtotal: number;
  totalDisc: number;
  total: number;
  shippingPrice: number;
  pickupTime: string;
  deliveryTime: string;
  selectedSlot: string;
  couponCode: string | null;
}

// ── Helpers ───────────────────────────────────────────
export const DAYS_AR   = ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
export const MONTHS_AR = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];

export function fmtDate(iso: string) {
  const d = new Date(iso);
  return `${DAYS_AR[d.getDay()]}، ${d.getDate()} ${MONTHS_AR[d.getMonth()]}`;
}

export function formatCard(v: string) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

export function formatExpiry(v: string) {
  return v.replace(/\D/g, "").slice(0, 4).replace(/^(\d{2})(\d)/, "$1/$2");
}
