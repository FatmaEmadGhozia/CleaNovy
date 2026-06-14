// types.ts
// ── الـ Types المشتركة بين كل الـ components ──────────

export interface Service {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  icon: string;
}

export interface CartItem {
  service: Service;
  quantity: number;
}

export const ALL_SERVICES: Service[] = [
  { id: "6a0f051543e454f5f9ac2e7f", name: "بدلة رجالي كلاسيك", subtitle: "تنظيف جاف + مكواة بخار",  price: 120, icon: "🥻" },
  { id: "s2", name: "قميص قطني",          subtitle: "غسيل يدوي + تعطير",       price: 45,  icon: "👔" },
  { id: "ff0000000000000000000002", name: "بنطلون جينز",        subtitle: "غسيل عادي + كوي",         price: 60,  icon: "👖" },
  { id: "s4", name: "عباية نسائية",       subtitle: "تنظيف جاف + عطر فاخر",   price: 80,  icon: "👘" },
  { id: "s5", name: "تيشيرت",             subtitle: "غسيل عادي",                price: 35,  icon: "👕" },
  { id: "s6", name: "ستائر صوف",          subtitle: "تنظيف عميق بالبخار",      price: 125, icon: "🛋️" },
];

export const SHIPPING = 20;

export const TIERS = [
  { min: 0,  pct: 0  },
  { min: 5,  pct: 10 },
  { min: 10, pct: 15 },
];

export function getTier(qty: number) {
  return [...TIERS].reverse().find(t => qty >= t.min) ?? TIERS[0];
}
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


// schedule_types.ts
// types.ts
// ── Types + Constants + Helpers ───────────────────────


export const SLOTS = {
  morning:   ["08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00"],
  afternoon: ["01:00 - 02:00", "02:00 - 03:00", "03:00 - 04:00", "04:00 - 05:00", "05:00 - 06:00"],
  evening:   ["07:00 - 08:00", "08:00 - 09:00", "09:00 - 10:00"],
};

export function getWeekDays(offset = 0): Date[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + offset * 7 + i);
    return d;
  });
}

export function getDeliveryDay(day: Date): Date {
  return new Date(new Date(day).setDate(day.getDate() + 2));
}

export function buildPickupISO(day: Date, slot: string): string {
  const d = new Date(day);
  const [h] = slot.split(" - ")[0].split(":");
  d.setHours(+h, 0, 0, 0);
  return d.toISOString();
}
