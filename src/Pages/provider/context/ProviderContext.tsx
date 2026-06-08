import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
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

function formatDuration(hours: number): string {
  if (hours <= 0) return "غير متاح مؤقتاً";
  if (hours < 24) return `الوقت المتوقع: ${hours} ساعة`;
  const days = Math.floor(hours / 24);
  return `الوقت المتوقع: ${days} ${days === 1 ? "يوم" : "أيام"}`;
}

const initialCategories: ServiceCategory[] = [
  { id: "clothes", label: "الملابس", icon: "checkroom", count: 3 },
  { id: "carpet", label: "السجاد والموكيت", icon: "grid_view", count: 0 },
  { id: "curtains", label: "الستائر", icon: "texture", count: 0 },
  { id: "bedding", label: "المفارش والأغطية", icon: "bed", count: 0 },
  { id: "special", label: "خدمات خاصة", icon: "settings_backup_restore", count: 0 },
];

const initialOrderCategories: OrderCategory[] = [
  { id: "clothes", label: "ملابس", icon: "checkroom", color: "bg-[#006B5D]" },
  { id: "dry-clean", label: "تنظيف جاف", icon: "dry_cleaning", color: "bg-[#765B00]" },
  { id: "carpet", label: "سجاد", icon: "grid_view", color: "bg-blue-500" },
  { id: "urgent", label: "مستعجل", icon: "bolt", color: "bg-red-500" },
];

const initialServices: Service[] = [
  {
    id: 1, categoryId: "clothes", icon: "dry_cleaning", name: "غسيل وكوي (ثوب/قميص)",
    description: "غسيل وكوي احترافي للثوب والقميص", durationHours: 24,
    duration: "الوقت المتوقع: 24 ساعة", price: "15.00", fastService: true, multiplier: "x1.5", active: true,
  },
  {
    id: 2, categoryId: "clothes", icon: "iron", name: "كوي فقط",
    description: "كوي فقط بدون غسيل", durationHours: 12,
    duration: "الوقت المتوقع: 12 ساعة", price: "8.00", fastService: true, multiplier: "x1.2", active: true,
  },
  {
    id: 3, categoryId: "clothes", icon: "checkroom", name: "غسيل جاف (فستان سهرة)",
    description: "تنظيف جاف للأزياء الراقية", durationHours: 48,
    duration: "غير متاح مؤقتاً", price: "45.00", fastService: false, multiplier: "--", active: false,
  },
];

const initialOrders: Order[] = [
  {
    id: "ORD-8821", customerName: "عبدالله العتيبي", tag: "محول من مغسلة الفجر",
    items: "15 قطعة (غسيل وكوي)", itemCount: 15, time: "الاستلام: اليوم، 4:00 م",
    price: 145, status: "new", location: "يبعد 3.2 كم • حي النرجس، الرياض",
    address: "الرياض، حي النرجس، شارع رقم 12، فيلا رقم 4", phone: "٠٥٠ ١١١ ٢٢٢٢",
    notes: "يرجى الانتباه للأزرار في البدلة الرمادية، واستخدام نشاء خفيف للثياب.",
    categoryId: "urgent", urgent: true,
    itemsList: [
      { name: "ثوب سعودي (غسيل وكوي)", qty: "× 10" },
      { name: "شماغ (كوي بخار)", qty: "× 2" },
      { name: "بدلة رسمية (تنظيف جاف)", qty: "× 3" },
    ],
  },
  {
    id: "ORD-8820", customerName: "سارة الغامدي", tag: null,
    items: "8 قطع (تنظيف جاف)", itemCount: 8, time: "الاستلام: 22 مايو، 11:00 ص",
    price: 89, status: "processing", location: "يبعد 1.5 كم • حي الملقا، الرياض",
    address: "الرياض، حي الملقا، شارع الأمير سلطان", phone: "٠٥٠ ٣٣٣ ٤٤٤٤",
    notes: "", categoryId: "dry-clean", urgent: false,
    itemsList: [
      { name: "فستان سهرة", qty: "× 2" },
      { name: "عباءة", qty: "× 3" },
      { name: "جاكيت جلد", qty: "× 3" },
    ],
  },
  {
    id: "ORD-8819", customerName: "خالد الشمري", tag: null,
    items: "22 قطعة (شامل)", itemCount: 22, time: "الاستلام: أمس",
    price: 210, status: "ready", location: "يبعد 5.8 كم • حي الياسمين، الرياض",
    address: "الرياض، حي الياسمين، مجمع سكني ٥", phone: "٠٥٠ ٥٥٥ ٦٦٦٦",
    notes: "التوصيل بعد الساعة ٥ مساءً", categoryId: "clothes", urgent: false,
    itemsList: [
      { name: "ثوب", qty: "× 15" },
      { name: "قميص", qty: "× 5" },
      { name: "بنطلون", qty: "× 2" },
    ],
  },
  {
    id: "ORD-8818", customerName: "نورة القحطاني", tag: null,
    items: "6 قطع (سجاد)", itemCount: 6, time: "الاستلام: اليوم، 9:00 ص",
    price: 320, status: "delivering", location: "يبعد 2.1 كم • حي الورود، الرياض",
    address: "الرياض، حي الورود، فيلا ١٢", phone: "٠٥٠ ٧٧٧ ٨٨٨٨",
    notes: "", categoryId: "carpet", urgent: false,
    itemsList: [{ name: "سجاد صلاة", qty: "× 4" }, { name: "موكيت غرفة", qty: "× 2" }],
  },
  {
    id: "ORD-8817", customerName: "فهد الدوسري", tag: null,
    items: "10 قطع", itemCount: 10, time: "الاستلام: أمس",
    price: 95, status: "done", location: "يبعد 4.0 كم • حي الصحافة، الرياض",
    address: "الرياض، حي الصحافة", phone: "٠٥٠ ٩٩٩ ٠٠٠٠",
    notes: "", categoryId: "clothes", urgent: false,
    itemsList: [{ name: "ثوب", qty: "× 10" }],
  },
];

const initialTiers: DiscountTier[] = [
  { id: 1, name: "Standard", minQty: 0, maxQty: 10, discount: 0, color: "bg-slate-300", active: true },
  { id: 2, name: "Bronze", minQty: 11, maxQty: 30, discount: 10, color: "bg-orange-400", active: true },
  { id: 3, name: "Silver", minQty: 31, maxQty: 60, discount: 15, color: "bg-slate-400", active: true },
  { id: 4, name: "Gold", minQty: 61, maxQty: 100, discount: 20, color: "bg-yellow-500", active: true },
  { id: 5, name: "Platinum", minQty: 101, maxQty: null, discount: 25, color: "bg-cyan-400", active: false },
];

const initialSpecialEntities: SpecialEntity[] = [
  { id: "mosque", icon: "mosque", label: "المساجد", sub: "خصم ثابت للخدمات", value: 50, bg: "bg-emerald-100", color: "text-emerald-700", enabled: true },
  { id: "school", icon: "school", label: "المدارس", sub: "خصم الزي المدرسي", value: 30, bg: "bg-blue-100", color: "text-blue-700", enabled: true },
  { id: "hospital", icon: "medical_services", label: "المستشفيات", sub: "خصم التعقيم الخاص", value: 40, bg: "bg-red-100", color: "text-red-700", enabled: false },
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
  addService: (form: NewServiceForm) => void;
  deleteService: (id: number) => void;
  updateService: (id: number, updates: Partial<Service>) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  addServiceCategory: (label: string, icon: string) => string;
  deleteServiceCategory: (id: string) => boolean;
  addOrderCategory: (label: string, icon: string, color: string) => void;
  deleteOrderCategory: (id: string) => boolean;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  acceptOrder: (id: string) => void;
  rejectOrder: (id: string) => void;
  addDiscountTier: (tier: Omit<DiscountTier, "id">) => void;
  updateDiscountTier: (id: number, updates: Partial<DiscountTier>) => void;
  toggleDiscountTier: (id: number) => void;
  updateSpecialEntity: (id: string, updates: Partial<SpecialEntity>) => void;
  saveSpecialEntities: () => void;
  markNotificationRead: (id: number) => void;
  markAllNotificationsRead: () => void;
  updateProfile: (updates: Partial<ProviderProfile>) => void;
  unreadCount: number;
  orderStats: { new: number; processing: number; ready: number; delivering: number; done: number; cancelled: number; revenue: number };
}

const ProviderContext = createContext<ProviderContextValue | null>(null);

export function ProviderProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState(initialCategories);
  const [orderCategories, setOrderCategories] = useState(initialOrderCategories);
  const [services, setServices] = useState(initialServices);
  const [orders, setOrders] = useState(initialOrders);
  const [discountTiers, setDiscountTiers] = useState(initialTiers);
  const [specialEntities, setSpecialEntities] = useState(initialSpecialEntities);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [profile, setProfile] = useState(initialProfile);
  const [pickupEnabled, setPickupEnabled] = useState(true);
  const [laundryCapacity, setLaundryCapacity] = useState(75);
  const [addServiceOpen, setAddServiceOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const showToast = useCallback((message: string, type: ToastMessage["type"] = "success") => {
    setToast({ message, type });
  }, []);

  const pushNotification = useCallback((title: string, message: string, type: Notification["type"] = "system") => {
    setNotifications((prev) => [
      { id: Date.now(), type, title, message, time: "الآن", read: false },
      ...prev,
    ]);
  }, []);

  const addService = useCallback((form: NewServiceForm) => {
    setServices((prev) => {
      const newId = Math.max(0, ...prev.map((s) => s.id)) + 1;
      const newService: Service = {
        id: newId, categoryId: form.categoryId, icon: form.icon, name: form.name,
        description: form.description, durationHours: form.durationHours,
        duration: form.active ? formatDuration(form.durationHours) : "غير متاح مؤقتاً",
        price: form.price, fastService: form.fastService,
        multiplier: form.fastService ? form.multiplier : "--", active: form.active,
      };
      setCategories((cats) =>
        cats.map((cat) => cat.id === form.categoryId ? { ...cat, count: cat.count + 1 } : cat)
      );
      return [...prev, newService];
    });
    pushNotification("تمت إضافة خدمة جديدة", `تم إضافة "${form.name}" إلى قائمة الخدمات`);
    showToast("تمت إضافة الخدمة بنجاح");
  }, [pushNotification, showToast]);

  const deleteService = useCallback((id: number) => {
    setServices((prev) => {
      const svc = prev.find((s) => s.id === id);
      if (svc) {
        setCategories((cats) =>
          cats.map((cat) => cat.id === svc.categoryId ? { ...cat, count: Math.max(0, cat.count - 1) } : cat)
        );
      }
      return prev.filter((s) => s.id !== id);
    });
    showToast("تم حذف الخدمة");
  }, [showToast]);

  const updateService = useCallback((id: number, updates: Partial<Service>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  }, []);

  const addServiceCategory = useCallback((label: string, icon: string) => {
    const id = label.replace(/\s+/g, "-").toLowerCase() + "-" + Date.now();
    setCategories((prev) => [...prev, { id, label, icon, count: 0 }]);
    showToast(`تمت إضافة تصنيف "${label}"`);
    return id;
  }, [showToast]);

  const deleteServiceCategory = useCallback((id: string) => {
    const hasServices = services.some((s) => s.categoryId === id);
    if (hasServices) {
      showToast("لا يمكن حذف التصنيف — يحتوي على خدمات", "error");
      return false;
    }
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast("تم حذف التصنيف");
    return true;
  }, [services, showToast]);

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

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    showToast("تم تحديث حالة الطلب");
  }, [showToast]);

  const acceptOrder = useCallback((id: string) => {
    updateOrderStatus(id, "processing");
    pushNotification("تم قبول طلب", `تم قبول الطلب #${id.replace("ORD-", "")}`, "order");
  }, [updateOrderStatus, pushNotification]);

  const rejectOrder = useCallback((id: string) => {
    updateOrderStatus(id, "cancelled");
    pushNotification("تم رفض طلب", `تم رفض الطلب #${id.replace("ORD-", "")}`, "order");
    showToast("تم رفض الطلب", "error");
  }, [updateOrderStatus, pushNotification, showToast]);

  const addDiscountTier = useCallback((tier: Omit<DiscountTier, "id">) => {
    setDiscountTiers((prev) => {
      const newId = Math.max(0, ...prev.map((t) => t.id)) + 1;
      return [...prev, { ...tier, id: newId }];
    });
    showToast("تمت إضافة مستوى خصم جديد");
  }, [showToast]);

  const updateDiscountTier = useCallback((id: number, updates: Partial<DiscountTier>) => {
    setDiscountTiers((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    showToast("تم تحديث مستوى الخصم");
  }, [showToast]);

  const toggleDiscountTier = useCallback((id: number) => {
    setDiscountTiers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
    );
    showToast("تم تغيير حالة المستوى");
  }, [showToast]);

  const updateSpecialEntity = useCallback((id: string, updates: Partial<SpecialEntity>) => {
    setSpecialEntities((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  }, []);

  const saveSpecialEntities = useCallback(() => {
    showToast("تم حفظ خصومات الجهات الخاصة");
  }, [showToast]);

  const markNotificationRead = useCallback((id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const updateProfile = useCallback((updates: Partial<ProviderProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  }, []);

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
        showToast, addService, deleteService, updateService,
        addServiceCategory, deleteServiceCategory, addOrderCategory, deleteOrderCategory,
        updateOrderStatus, acceptOrder, rejectOrder,
        addDiscountTier, updateDiscountTier, toggleDiscountTier,
        updateSpecialEntity, saveSpecialEntities,
        markNotificationRead, markAllNotificationsRead, updateProfile,
        unreadCount, orderStats,
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
