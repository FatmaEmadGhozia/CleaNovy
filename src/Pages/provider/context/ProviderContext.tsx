
import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from "react";

const BASE_URL = "http://localhost:3000/api/v1";
import type {
  Service,
  ServiceCategory,
  Order,
  OrderCategory,
  OrderStatus,
  DiscountTier,
  SpecialEntity,
  Notification,
  ProviderProfile,
  NewServiceForm,
  ToastMessage,
} from "../types";

const initialOrderCategories: OrderCategory[] = [
  { id: "clothes", label: "ملابس", icon: "checkroom", color: "bg-[#006B5D]" },
  { id: "dry-clean", label: "تنظيف جاف", icon: "dry_cleaning", color: "bg-[#765B00]" },
  { id: "carpet", label: "سجاد", icon: "grid_view", color: "bg-blue-500" },
  { id: "urgent", label: "مستعجل", icon: "bolt", color: "bg-red-500" },
];

const initialNotifications: Notification[] = [
  { id: 1, type: "order", title: "طلب جديد #٤٨٢١", message: "أحمد العتيبي طلب غسيل وكوي مستعجل — ١٢ قطعة", time: "منذ ٥ دقائق", read: false },
  { id: 2, type: "payment", title: "دفعة مستلمة", message: "تم استلام ٢٤٥ ر.س من طلب #٤٨١٥", time: "منذ ٢٠ دقيقة", read: false },
  { id: 3, type: "system", title: "تحديث النظام", message: "تم تحديث سياسة الخصومات — راجع صفحة الخصومات", time: "منذ ساعة", read: true },
  { id: 4, type: "promo", title: "عرض موسمي", message: "فعّل خصم ١٥٪ على خدمات السجاد هذا الأسبوع", time: "منذ ٣ ساعات", read: true },
];

const initialProfile: ProviderProfile = {
  name: "أحمد العامودي", role: "مدير العمليات", email: "ahmed@laundry.sa",
  phone: "٠٥٠ ١٢٣ ٤٥٦٧", businessName: "مغسلة اللؤلؤة", businessAddress: "حي النخيل، الرياض",
};

interface ProviderContextValue {
  categories: ServiceCategory[];
  orderCategories: OrderCategory[];
  services: Service[];
  orders: Order[];
  discountTiers: DiscountTier[];
  specialEntities: SpecialEntity[];
  notifications: Notification[];
  profile: ProviderProfile;
  pickupEnabled: boolean;
  laundryCapacity: number;
  addServiceOpen: boolean;
  notificationsOpen: boolean;
  toast: ToastMessage | null;
  setAddServiceOpen: (open: boolean) => void;
  setNotificationsOpen: (open: boolean) => void;
  setPickupEnabled: (v: boolean) => void;
  setLaundryCapacity: (v: number) => void;
  showToast: (message: string, type?: ToastMessage["type"]) => void;
  servicesLoading: boolean;
  fetchServices: (categoryId?: string) => Promise<void>;
  addService: (form: NewServiceForm) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  updateService: (id: string, updates: Partial<Service>) => Promise<void>;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  addServiceCategory: (label: string, icon: string) => Promise<string>;
  deleteServiceCategory: (id: string) => Promise<boolean>;
  addOrderCategory: (label: string, icon: string, color: string) => void;
  deleteOrderCategory: (id: string) => boolean;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  acceptOrder: (id: string) => Promise<void>;
  rejectOrder: (id: string) => Promise<void>;
  fetchOrderDetails: (id: string) => Promise<void>;
  dashboardStats: {
    stats: { new: number; processing: number; ready: number; delivering: number; done: number; cancelled: number; revenue: number };
    capacityPct: number;
    outForDeliveryCount: number;
    urgentOrders: any[];
    revenueChart: { date: string; revenue: number }[];
  } | null;
  fetchDashboard: () => Promise<void>;
  addDiscountTier: (tier: Omit<DiscountTier, "id">) => Promise<void>;
  updateDiscountTier: (id: string, updates: Partial<DiscountTier>) => Promise<void>;
  toggleDiscountTier: (id: string) => Promise<void>;
  deleteDiscountTier: (id: string) => Promise<void>;
  updateSpecialEntity: (id: string, updates: Partial<SpecialEntity>) => void;
  saveSpecialEntities: () => Promise<void>;
  markNotificationRead: (id: number) => void;
  markAllNotificationsRead: () => void;
  updateProfile: (updates: Partial<ProviderProfile>) => Promise<void>;
  settings: { openTime: string; closeTime: string; acceptOrders: boolean; fastServiceDefault: boolean; orderAlerts: boolean; emailNotifications: boolean; smsNotifications: boolean; language: "ar" | "en" };
  saveSettings: (s: { openTime: string; closeTime: string; acceptOrders: boolean; fastServiceDefault: boolean; orderAlerts: boolean; emailNotifications: boolean; smsNotifications: boolean; language: "ar" | "en" }) => Promise<void>;
  unreadCount: number;
  orderStats: { new: number; processing: number; ready: number; delivering: number; done: number; cancelled: number; revenue: number };
  defaultOrderTab: string;
  setDefaultOrderTab: (tab: string) => void;
}

const ProviderContext = createContext<ProviderContextValue | null>(null);

export function ProviderProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [orderCategories, setOrderCategories] = useState(initialOrderCategories);
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const activeCategoryRef = useRef<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [dashboardStats, setDashboardStats] = useState<any | null>(null);
  const [discountTiers, setDiscountTiers] = useState<DiscountTier[]>([]);
  const [specialEntities, setSpecialEntities] = useState<SpecialEntity[]>([]);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [profile, setProfile] = useState(initialProfile);
  const [pickupEnabled, setPickupEnabled] = useState(true);
  const [laundryCapacity, setLaundryCapacity] = useState(75);
  const [addServiceOpen, setAddServiceOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [defaultOrderTab, setDefaultOrderTab] = useState("all");

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  // ── Status mapping helpers ───────────────────────────────────
  const backendToFrontendStatus = (s: string): OrderStatus => {
    const map: Record<string, OrderStatus> = {
      pending: "new",
      accepted: "processing",
      in_progress: "processing",
      ready: "ready",
      out_for_delivery: "delivering",
      delivered: "done",
      cancelled: "cancelled",
    };
    return map[s] ?? "new";
  };

  const frontendToBackendStatus = (s: OrderStatus): string => {
    const map: Record<OrderStatus, string> = {
      new: "pending",
      processing: "accepted",
      ready: "ready",
      delivering: "out_for_delivery",
      done: "delivered",
      cancelled: "cancelled",
    };
    return map[s];
  };

  // ── Fetch orders ─────────────────────────────────────────────
  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/provider/orders`);
      const json = await res.json();
      if (json.success) {
        const mapped: Order[] = json.data.map((o: any) => ({
          id: o._id,
          customerName: o.client?.name ?? "عميل",
          tag: null,
          items: "اضغط لعرض التفاصيل",
          itemCount: 0,
          time: `الاستلام: ${new Date(o.pickup_time).toLocaleDateString("ar-SA")}`,
          price: o.total_price ?? 0,
          status: backendToFrontendStatus(o.status),
          location: o.address?.address ?? "",
          address: o.address?.address ?? "",
          phone: o.client?.phone ?? "",
          notes: o.notes ?? "",
          categoryId: "clothes",
          urgent: o.status === "pending",
          itemsList: [],
        }));
        setOrders(mapped);
      }
    } catch (e) {
      console.error("Failed to fetch orders", e);
    }
  }, []);

  // ── Fetch order details (items) ──────────────────────────────
  const fetchOrderDetails = useCallback(async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/provider/orders/${id}`);
      const json = await res.json();
      if (json.success) {
        const o = json.data;
        const itemsList = (o.items ?? []).map((item: any) => ({
          name: item.service?.name ?? "خدمة",
          qty: `× ${item.quantity}`,
        }));
        const itemCount = (o.items ?? []).reduce((s: number, i: any) => s + (i.quantity ?? 1), 0);
        const serviceNames = [
          ...new Set((o.items ?? []).map((i: any) => i.service?.name).filter(Boolean)),
        ] as string[];

        setOrders((prev) => prev.map((order) =>
          order.id === id
            ? {
                ...order,
                itemsList,
                itemCount,
                items: itemCount > 0
                  ? `${itemCount} قطعة (${serviceNames.join("، ")})`
                  : "لا توجد عناصر",
                notes: o.notes ?? order.notes,
                address: o.address?.address ?? order.address,
                phone: o.client?.phone ?? order.phone,
              }
            : order
        ));
      }
    } catch (e) {
      console.error("Failed to fetch order details", e);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // ── Dashboard SSE — real-time updates ───────────────────────
  const fetchDashboard = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/provider/dashboard`);
      const json = await res.json();
      if (json.success) setDashboardStats(json.data);
    } catch (e) {
      console.error("Failed to fetch dashboard", e);
    }
  }, []);

  useEffect(() => {
    // initial fetch
    fetchDashboard();

    // SSE for real-time updates
    const es = new EventSource(`${BASE_URL}/provider/dashboard/live`);
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        setDashboardStats(data);
      } catch (err) {
        console.error("SSE parse error", err);
      }
    };
    es.onerror = () => {
      console.warn("SSE connection error — falling back to polling");
      es.close();
    };

    return () => es.close(); // cleanup on unmount
  }, []);

  // ── Fetch discount tiers ─────────────────────────────────────
  const fetchDiscountTiers = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/provider/discounts/tiers`);
      const json = await res.json();
      if (json.success) {
        const mapped: DiscountTier[] = json.data.map((t: any) => ({
          id: t._id,
          name: t.name,
          minQty: t.minQty,
          maxQty: t.maxQty,
          discount: t.discount,
          color: t.color ?? "bg-slate-300",
          active: t.is_active,
        }));
        setDiscountTiers(mapped);
      }
    } catch (e) {
      console.error("Failed to fetch discount tiers", e);
    }
  }, []);

  // ── Fetch special entities ───────────────────────────────────
  const fetchSpecialEntities = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/provider/discounts/special-entities`);
      const json = await res.json();
      if (json.success && json.data.length > 0) {
        const bgMap: Record<string, string> = {
          mosque: "bg-emerald-50",
          school: "bg-blue-50",
          hospital: "bg-red-50",
        };
        const colorMap: Record<string, string> = {
          mosque: "text-emerald-600",
          school: "text-blue-600",
          hospital: "text-red-600",
        };
        const mapped: SpecialEntity[] = json.data.map((e: any) => ({
          id: e._id,
          entityKey: e.entityKey,
          icon: e.icon,
          label: e.label,
          sub: e.sub ?? "",
          value: e.discount,
          bg: bgMap[e.entityKey] ?? "bg-slate-50",
          color: colorMap[e.entityKey] ?? "text-slate-600",
          enabled: e.is_enabled,
        }));
        setSpecialEntities(mapped);
      }
    } catch (e) {
      console.error("Failed to fetch special entities", e);
    }
  }, []);

  useEffect(() => {
    fetchDiscountTiers();
    fetchSpecialEntities();
  }, [fetchDiscountTiers, fetchSpecialEntities]);

  // ── Fetch categories on mount ────────────────────────────────
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/provider/services/categories`);
        const json = await res.json();
        if (json.success) {
          const mapped: ServiceCategory[] = json.data.map((c: any) => ({
            id: c._id,
            label: c.name,
            icon: c.icon || "category",
            count: c.count,
            isBasic: c.isBasic,
          }));
          setCategories(mapped);
          // set first category as active default
          if (mapped.length > 0 && !activeCategoryRef.current) {
            activeCategoryRef.current = mapped[0].id;
          }
        }
      } catch (e) {
        console.error("Failed to fetch categories", e);
      }
    };
    fetchCategories();
  }, []);

  // ── Fetch services on mount ──────────────────────────────────
  const fetchServices = useCallback(async (categoryId?: string) => {
    setServicesLoading(true);
    try {
      const url = categoryId
        ? `${BASE_URL}/provider/services?category=${categoryId}`
        : `${BASE_URL}/provider/services`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) {
        const mapped: Service[] = json.data.map((ps: any) => ({
          id: ps._id,
          categoryId: ps.service?.parent?._id ?? "",
          icon: ps.service?.icon || "dry_cleaning",
          name: ps.service?.name ?? "",
          description: ps.service?.description ?? "",
          durationHours: ps.service?.duration_hours ?? 24,
          duration: ps.service?.duration_hours
            ? ps.service.duration_hours < 24
              ? `الوقت المتوقع: ${ps.service.duration_hours} ساعة`
              : `الوقت المتوقع: ${Math.floor(ps.service.duration_hours / 24)} ${Math.floor(ps.service.duration_hours / 24) === 1 ? "يوم" : "أيام"}`
            : "الوقت المتوقع: 1 يوم",
          price: String(ps.price),
          fastService: ps.fast_service ?? false,
          multiplier: ps.fast_multiplier ? `x${ps.fast_multiplier}` : "x1.5",
          active: ps.is_active ?? true,
        }));
        setServices(mapped);
      }
    } catch (e) {
      console.error("Failed to fetch services", e);
    } finally {
      setServicesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const showToast = useCallback((message: string, type: ToastMessage["type"] = "success") => {
    setToast({ message, type });
  }, []);

  const pushNotification = useCallback((title: string, message: string, type: Notification["type"] = "system") => {
    setNotifications((prev) => [
      { id: Date.now(), type, title, message, time: "الآن", read: false },
      ...prev,
    ]);
  }, []);

  const addService = useCallback(async (form: NewServiceForm) => {
    try {
      const multiplierNum = parseFloat(form.multiplier.replace("x", ""));
      const res = await fetch(`${BASE_URL}/provider/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId: form.categoryId,
          name: form.name,
          description: form.description,
          icon: form.icon,
          duration_hours: form.durationHours,
          price: parseFloat(form.price),
          fast_service: form.fastService,
          fast_multiplier: multiplierNum,
          is_active: form.active,
        }),
      });
      const json = await res.json();
      if (json.success) {
        // add new service to state immediately from response
        const ps = json.data;
        const newSvc: Service = {
          id: ps._id,
          categoryId: ps.service?.parent?._id ?? form.categoryId,
          icon: ps.service?.icon || form.icon,
          name: ps.service?.name ?? form.name,
          description: ps.service?.description ?? form.description,
          durationHours: ps.service?.duration_hours ?? form.durationHours,
          duration: form.durationHours < 24
            ? `الوقت المتوقع: ${form.durationHours} ساعة`
            : `الوقت المتوقع: ${Math.floor(form.durationHours / 24)} ${Math.floor(form.durationHours / 24) === 1 ? "يوم" : "أيام"}`,
          price: String(ps.price),
          fastService: ps.fast_service ?? false,
          multiplier: `x${ps.fast_multiplier ?? 1.5}`,
          active: ps.is_active ?? true,
        };
        setServices((prev) => [...prev, newSvc]);
        setCategories((prev) => prev.map((cat) =>
          cat.id === form.categoryId ? { ...cat, count: cat.count + 1 } : cat
        ));
        pushNotification("تمت إضافة خدمة جديدة", `تم إضافة "${form.name}" إلى قائمة الخدمات`);
        showToast("تمت إضافة الخدمة بنجاح");
      } else {
        showToast(json.message || "حدث خطأ", "error");
      }
    } catch (e) {
      showToast("تعذر الاتصال بالسيرفر", "error");
    }
  }, [pushNotification, showToast]);

  const deleteService = useCallback(async (id: string) => {
    // optimistic update
    setServices((prev) => prev.filter((s) => s.id !== id));
    setCategories((prev) => prev.map((cat) => {
      const svc = services.find((s) => s.id === id);
      return svc && cat.id === svc.categoryId ? { ...cat, count: Math.max(0, cat.count - 1) } : cat;
    }));
    try {
      const res = await fetch(`${BASE_URL}/provider/services/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        showToast("تم حذف الخدمة");
      } else {
        // revert on failure
        await fetchServices();
        showToast(json.message || "حدث خطأ", "error");
      }
    } catch (e) {
      await fetchServices();
      showToast("تعذر الاتصال بالسيرفر", "error");
    }
  }, [services, fetchServices, showToast]);

  const updateService = useCallback(async (id: string, updates: Partial<Service>) => {
    // optimistic update — UI changes instantly
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    try {
      const body: any = {};
      if (updates.price !== undefined) body.price = parseFloat(String(updates.price));
      if (updates.fastService !== undefined) body.fast_service = updates.fastService;
      if (updates.multiplier !== undefined) body.fast_multiplier = parseFloat(updates.multiplier.replace("x", ""));
      if (updates.active !== undefined) body.is_active = updates.active;
      if (updates.name !== undefined) body.name = updates.name;
      if (updates.description !== undefined) body.description = updates.description;
      if (updates.durationHours !== undefined) body.duration_hours = updates.durationHours;

      const res = await fetch(`${BASE_URL}/provider/services/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!json.success) {
        // revert on failure
        await fetchServices();
        showToast(json.message || "حدث خطأ", "error");
      }
    } catch (e) {
      await fetchServices();
      showToast("تعذر الاتصال بالسيرفر", "error");
    }
  }, [fetchServices, showToast]);

  const addServiceCategory = useCallback(async (label: string, icon: string) => {
    try {
      const res = await fetch(`${BASE_URL}/provider/services/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: label, icon }),
      });
      const json = await res.json();
      if (json.success) {
        const newId = json.data._id;
        setCategories((prev) => [...prev, { id: newId, label, icon, count: 0, isBasic: false }]);
        showToast(`تمت إضافة تصنيف "${label}"`);
        return newId;
      } else {
        showToast(json.message || "حدث خطأ", "error");
        return "";
      }
    } catch (e) {
      showToast("تعذر الاتصال بالسيرفر", "error");
      return "";
    }
  }, [showToast]);

  const deleteServiceCategory = useCallback(async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/provider/services/categories/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        showToast("تم حذف التصنيف");
        return true;
      } else {
        showToast(json.message || "حدث خطأ", "error");
        return false;
      }
    } catch (e) {
      showToast("تعذر الاتصال بالسيرفر", "error");
      return false;
    }
  }, [showToast]);

  const addOrderCategory = useCallback((label: string, icon: string, color: string) => {
    const id = label.replace(/\s+/g, "-").toLowerCase() + "-" + Date.now();
    setOrderCategories((prev) => [...prev, { id, label, icon, color }]);
    showToast(`تمت إضافة تصنيف "${label}"`);
  }, [showToast]);

  const deleteOrderCategory = useCallback((id: string) => {
    const hasOrders = orders.some((o) => o.categoryId === id);
    if (hasOrders) {
      showToast("لا يمكن حذف التصنيف — يحتوي على طلبات", "error");
      return false;
    }
    setOrderCategories((prev) => prev.filter((c) => c.id !== id));
    showToast("تم حذف التصنيف");
    return true;
  }, [orders, showToast]);

  const updateOrderStatus = useCallback(async (id: string, status: OrderStatus) => {
    // optimistic update
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
    try {
      const backendStatus = frontendToBackendStatus(status);
      const res = await fetch(`${BASE_URL}/provider/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: backendStatus }),
      });
      const json = await res.json();
      if (!json.success) {
        await fetchOrders();
        showToast(json.message || "حدث خطأ", "error");
      } else {
        showToast("تم تحديث حالة الطلب");
      }
    } catch (e) {
      await fetchOrders();
      showToast("تعذر الاتصال بالسيرفر", "error");
    }
  }, [fetchOrders, showToast]);

  const acceptOrder = useCallback(async (id: string) => {
    // optimistic update
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: "processing" as OrderStatus } : o));
    try {
      const res = await fetch(`${BASE_URL}/provider/orders/${id}/accept`, { method: "POST" });
      const json = await res.json();
      if (!json.success) {
        await fetchOrders();
        showToast(json.message || "حدث خطأ", "error");
      } else {
        await fetchDashboard(); // refresh urgent orders list
        pushNotification("تم قبول طلب", `تم قبول الطلب`, "order");
        showToast("تم قبول الطلب بنجاح");
      }
    } catch (e) {
      await fetchOrders();
      showToast("تعذر الاتصال بالسيرفر", "error");
    }
  }, [fetchOrders, fetchDashboard, pushNotification, showToast]);

  const rejectOrder = useCallback(async (id: string) => {
    // optimistic update
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: "cancelled" as OrderStatus } : o));
    try {
      const res = await fetch(`${BASE_URL}/provider/orders/${id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cancel_reason: "رُفض من قبل المغسلة" }),
      });
      const json = await res.json();
      if (!json.success) {
        await fetchOrders();
        showToast(json.message || "حدث خطأ", "error");
      } else {
        await fetchDashboard(); // refresh urgent orders list
        showToast("تم رفض الطلب", "error");
      }
    } catch (e) {
      await fetchOrders();
      showToast("تعذر الاتصال بالسيرفر", "error");
    }
  }, [fetchOrders, fetchDashboard, showToast]);

  const addDiscountTier = useCallback(async (tier: Omit<DiscountTier, "id">) => {
    try {
      const res = await fetch(`${BASE_URL}/provider/discounts/tiers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: tier.name,
          minQty: tier.minQty,
          maxQty: tier.maxQty,
          discount: tier.discount,
          color: tier.color,
          is_active: tier.active,
        }),
      });
      const json = await res.json();
      if (json.success) {
        await fetchDiscountTiers();
        showToast("تمت إضافة مستوى الخصم");
      } else {
        showToast(json.message || "حدث خطأ", "error");
      }
    } catch (e) {
      showToast("تعذر الاتصال بالسيرفر", "error");
    }
  }, [fetchDiscountTiers, showToast]);

  const updateDiscountTier = useCallback(async (id: string, updates: Partial<DiscountTier>) => {
    // optimistic
    setDiscountTiers((prev) => prev.map((t) => t.id === id ? { ...t, ...updates } : t));
    try {
      const body: any = {};
      if (updates.name !== undefined) body.name = updates.name;
      if (updates.discount !== undefined) body.discount = updates.discount;
      if (updates.active !== undefined) body.is_active = updates.active;
      if (updates.color !== undefined) body.color = updates.color;
      if (updates.minQty !== undefined) body.minQty = updates.minQty;
      if (updates.maxQty !== undefined) body.maxQty = updates.maxQty;
      const res = await fetch(`${BASE_URL}/provider/discounts/tiers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!json.success) {
        await fetchDiscountTiers();
        showToast(json.message || "حدث خطأ", "error");
      } else {
        showToast("تم تحديث مستوى الخصم");
      }
    } catch (e) {
      await fetchDiscountTiers();
      showToast("تعذر الاتصال بالسيرفر", "error");
    }
  }, [fetchDiscountTiers, showToast]);

  const toggleDiscountTier = useCallback(async (id: string) => {
    // optimistic
    setDiscountTiers((prev) => prev.map((t) => t.id === id ? { ...t, active: !t.active } : t));
    try {
      const res = await fetch(`${BASE_URL}/provider/discounts/tiers/${id}/toggle`, { method: "PATCH" });
      const json = await res.json();
      if (!json.success) {
        await fetchDiscountTiers();
        showToast(json.message || "حدث خطأ", "error");
      }
    } catch (e) {
      await fetchDiscountTiers();
      showToast("تعذر الاتصال بالسيرفر", "error");
    }
  }, [fetchDiscountTiers, showToast]);

  const deleteDiscountTier = useCallback(async (id: string) => {
    // optimistic
    setDiscountTiers((prev) => prev.filter((t) => t.id !== id));
    try {
      const res = await fetch(`${BASE_URL}/provider/discounts/tiers/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) {
        await fetchDiscountTiers();
        showToast(json.message || "حدث خطأ", "error");
      } else {
        showToast("تم حذف مستوى الخصم");
      }
    } catch (e) {
      await fetchDiscountTiers();
      showToast("تعذر الاتصال بالسيرفر", "error");
    }
  }, [fetchDiscountTiers, showToast]);

  const updateSpecialEntity = useCallback((id: string, updates: Partial<SpecialEntity>) => {
    // local only — user saves all at once via saveSpecialEntities
    setSpecialEntities((prev) => prev.map((e) => e.id === id ? { ...e, ...updates } : e));
  }, []);

  const saveSpecialEntities = useCallback(async () => {
    try {
      const entities = specialEntities.map((e) => ({
        entityKey: e.entityKey,
        label: e.label,
        icon: e.icon,
        sub: e.sub,
        discount: e.value,
        is_enabled: e.enabled,
      }));
      const res = await fetch(`${BASE_URL}/provider/discounts/special-entities/save-all`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entities }),
      });
      const json = await res.json();
      if (json.success) {
        showToast("تم حفظ خصومات الجهات الخاصة");
      } else {
        showToast(json.message || "حدث خطأ", "error");
      }
    } catch (e) {
      showToast("تعذر الاتصال بالسيرفر", "error");
    }
  }, [specialEntities, showToast]);

  const markNotificationRead = useCallback((id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  // ── Fetch profile from API ───────────────────────────────────
  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/provider/profile`);
      const json = await res.json();
      if (json.success) {
        setProfile((prev) => ({
          ...prev,
          name: json.data.name || prev.name,
          email: json.data.email || prev.email,
          phone: json.data.phone || prev.phone,
          role: json.data.role || prev.role,
          businessName: json.data.businessName || prev.businessName,
          businessAddress: json.data.businessAddress || prev.businessAddress,
        }));
      }
    } catch (e) {
      console.error("Failed to fetch profile", e);
    }
  }, []);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  // ── Settings state ───────────────────────────────────────────
  const [settings, setSettings] = useState({
    openTime: "08:00",
    closeTime: "22:00",
    acceptOrders: true,
    fastServiceDefault: true,
    orderAlerts: true,
    emailNotifications: true,
    smsNotifications: false,
    language: "ar" as "ar" | "en",
  });

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/provider/settings`);
      const json = await res.json();
      if (json.success) {
        setSettings({
          openTime: json.data.openTime || "08:00",
          closeTime: json.data.closeTime || "22:00",
          acceptOrders: json.data.acceptOrders ?? true,
          fastServiceDefault: json.data.fastServiceDefault ?? true,
          orderAlerts: json.data.orderAlerts ?? true,
          emailNotifications: json.data.emailNotifications ?? true,
          smsNotifications: json.data.smsNotifications ?? false,
          language: json.data.language || "ar",
        });
        // also update profile with shop info
        setProfile((prev) => ({
          ...prev,
          businessName: json.data.businessName || prev.businessName,
          businessAddress: json.data.businessAddress || prev.businessAddress,
          phone: json.data.phone || prev.phone,
          email: json.data.email || prev.email,
        }));
      }
    } catch (e) {
      console.error("Failed to fetch settings", e);
    }
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const updateProfile = useCallback(async (updates: Partial<ProviderProfile>) => {
    // optimistic update
    setProfile((prev) => ({ ...prev, ...updates }));
    try {
      const res = await fetch(`${BASE_URL}/provider/profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: updates.name,
          email: updates.email,
          phone: updates.phone,
          businessAddress: updates.businessAddress,
        }),
      });
      const json = await res.json();
      if (!json.success) {
        showToast(json.message || "حدث خطأ", "error");
      }
    } catch (e) {
      showToast("تعذر الاتصال بالسيرفر", "error");
    }
  }, [showToast]);

  const saveSettings = useCallback(async (s: typeof settings) => {
    try {
      const res = await fetch(`${BASE_URL}/provider/settings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          openTime: s.openTime,
          closeTime: s.closeTime,
          acceptOrders: s.acceptOrders,
          fastServiceDefault: s.fastServiceDefault,
          orderAlerts: s.orderAlerts,
          emailNotifications: s.emailNotifications,
          smsNotifications: s.smsNotifications,
          language: s.language,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSettings(s);
        showToast("تم حفظ الإعدادات بنجاح");
      } else {
        showToast(json.message || "حدث خطأ", "error");
      }
    } catch (e) {
      showToast("تعذر الاتصال بالسيرفر", "error");
    }
  }, [showToast]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const orderStats = {
    new: orders.filter((o) => o.status === "new").length,
    processing: orders.filter((o) => o.status === "processing").length,
    ready: orders.filter((o) => o.status === "ready").length,
    delivering: orders.filter((o) => o.status === "delivering").length,
    done: orders.filter((o) => o.status === "done").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
    revenue: orders.filter((o) => o.status === "done").reduce((a, o) => a + o.price, 0),
  };

  return (
    <ProviderContext.Provider
      value={{
        categories, orderCategories, services, orders, discountTiers, specialEntities,
        notifications, profile, pickupEnabled, laundryCapacity,
        addServiceOpen, notificationsOpen, toast,
        setAddServiceOpen, setNotificationsOpen, setPickupEnabled, setLaundryCapacity,
        searchQuery, setSearchQuery,
        showToast, servicesLoading, fetchServices, addService, deleteService, updateService,
        addServiceCategory, deleteServiceCategory, addOrderCategory, deleteOrderCategory,
        updateOrderStatus, acceptOrder, rejectOrder, fetchOrderDetails,
        dashboardStats, fetchDashboard,
        addDiscountTier, updateDiscountTier, toggleDiscountTier, deleteDiscountTier,
        updateSpecialEntity, saveSpecialEntities,
        markNotificationRead, markAllNotificationsRead, updateProfile,
        settings, saveSettings,
        unreadCount, orderStats, defaultOrderTab, setDefaultOrderTab,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
}

export function useProvider() {
  const ctx = useContext(ProviderContext);
  if (!ctx) throw new Error("useProvider must be used within ProviderProvider");
  return ctx;
}