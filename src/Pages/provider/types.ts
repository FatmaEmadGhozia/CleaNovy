

export type Page = "dashboard" | "orders" | "services" | "discounts" | "profile" | "reviews";

export type OrderStatus = "new" | "processing" | "ready" | "delivering" | "done" | "cancelled";

export interface ServiceCategory {
  id: string;
  label: string;
  icon: string;
  count: number;
}

export interface OrderCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
}
interface SearchResult {
  type: "order" | "service" | "category" | "review"
  label: string
  sub: string
  page: Page
}
export interface Service {
  id: string;
  categoryId: string;
  icon: string;
  name: string;
  description: string;
  durationHours: number;
  duration: string;
  price: string;
  fastService: boolean;
  multiplier: string;
  active: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  tag: string | null;
  items: string;
  itemCount: number;
  time: string;
  price: number;
  status: OrderStatus;
  location: string;
  address: string;
  phone: string;
  notes: string;
  categoryId: string;
  urgent: boolean;
  itemsList: { name: string; qty: string }[];
}

export interface DiscountTier {
  id: string;
  name: string;
  minQty: number;
  maxQty: number | null;
  discount: number;
  color: string;
  active: boolean;
}

export interface SpecialEntity {
  id: string;
  entityKey: string;
  icon: string;
  label: string;
  sub: string;
  value: number;
  bg: string;
  color: string;
  enabled: boolean;
}

export interface Notification {
  id: number;
  type: "order" | "payment" | "system" | "promo";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface ProviderProfile {
  name: string;
  role: string;
  email: string;
  phone: string;
  businessName: string;
  businessAddress: string;
  avatar?: string;
}

export interface NewServiceForm {
  categoryId: string;
  icon: string;
  name: string;
  description: string;
  durationHours: number;
  active: boolean;
  price: string;
  fastService: boolean;
  multiplier: string;
}
export interface Review {
  id: string;
  customerName: string;
  orderId: string;
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  reply?: string;
}
export interface ToastMessage {
  message: string;
  type: "success" | "info" | "error";
}

export const SERVICE_ICONS = [
  "dry_cleaning",
  "iron",
  "checkroom",
  "local_laundry_service",
  "wash",
  "water_drop",
  "texture",
  "bed",
  "grid_view",
  "settings_backup_restore",
  "dry",
  "styler",
  "apparel",
  "blanket",
] as const;

export const ORDER_CATEGORY_ICONS = [
  "checkroom",
  "grid_view",
  "texture",
  "bed",
  "local_laundry_service",
  "dry_cleaning",
  "iron",
  "inventory_2",
] as const;

export const MULTIPLIER_OPTIONS = ["x1.2", "x1.5", "x1.8", "x2.0"] as const;

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  new: "طلب جديد",
  processing: "قيد المعالجة",
  ready: "جاهز للتسليم",
  delivering: "خارج للتوصيل",
  done: "مكتمل",
  cancelled: "ملغي",
};