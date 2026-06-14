import { useState, useEffect, useCallback } from "react";
import {
  Eye, Search, X, ShoppingBag, User as UserIcon,
  Store, CreditCard, MapPin, Calendar, Clock,
  Package, Tag, FileText, Truck,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type OrderStatus =
  | "pending" | "accepted" | "picked_up" | "in_progress"
  | "ready" | "out_for_delivery" | "delivered" | "cancelled";

type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
type PaymentMethod = "card" | "vodafone_cash" | "cash";
type DeliveryType  = "pickup" | "delivery";

export interface OrderListItem {
  id: string;
  orderNumber: string;
  client: string;
  provider: string;
  services: string[];
  amount: number;
  status: OrderStatus;
  createdAt: string;
}

export interface OrderDetail {
  id: string;
  orderNumber: string;
  client: { name: string; email: string; phone: string } | null;
  provider: { name: string; phone: string; address: string } | null;
  deliveryType: DeliveryType | null;
  address: string | null;
  items: { name: string; quantity: number; unitPrice: number; totalPrice: number }[];
  pricing: {
    providerPrice: number;
    shippingPrice: number;
    discount: number;
    totalPrice: number;
    platformCommission: number;
  };
  payment: { method: PaymentMethod | null; status: PaymentStatus | null };
  status: OrderStatus;
  pickupTime: string | null;
  deliveryTime: string | null;
  notes: string | null;
  createdAt: string;
}

type TabKey = "all" | "pending" | "processing" | "completed" | "cancelled";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending:          "قيد الانتظار",
  accepted:         "مقبول",
  picked_up:        "تم الاستلام",
  in_progress:      "جاري التنفيذ",
  ready:            "جاهز",
  out_for_delivery: "جاري التوصيل",
  delivered:        "مكتمل",
  cancelled:        "ملغي",
};

const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  pending:  "قيد الانتظار",
  paid:     "مدفوع",
  failed:   "فشل",
  refunded: "مُسترد",
};

const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  card:          "بطاقة بنكية",
  vodafone_cash: "فودافون كاش",
  cash:          "كاش عند الاستلام",
};

const DELIVERY_TYPE_LABEL: Record<DeliveryType, string> = {
  pickup:   "استلام من المغسلة",
  delivery: "توصيل للمنزل",
};

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("ar-EG", { year: "numeric", month: "short", day: "numeric" });
}

function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("ar-EG", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: OrderStatus }) {
  const styles: Record<string, string> = {
    pending:          "bg-[#F4C542] text-[#0D1F3C]",
    accepted:         "bg-blue-100 text-blue-800",
    picked_up:        "bg-purple-100 text-purple-800",
    in_progress:      "bg-[#0D1F3C] text-white",
    ready:            "bg-teal-100 text-teal-800",
    out_for_delivery: "bg-orange-100 text-orange-800",
    delivered:        "bg-[#00C9B1]/80 text-white",
    cancelled:        "bg-[#FF4D4D] text-white",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] ?? "bg-gray-100 text-gray-600"}`}>
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}

function PaymentStatusBadge({ status }: { status: PaymentStatus | null }) {
  if (!status) return <span className="text-gray-400 text-sm">—</span>;
  const styles: Record<string, string> = {
    pending:  "bg-yellow-100 text-yellow-800",
    paid:     "bg-green-100 text-green-800",
    failed:   "bg-red-100 text-red-800",
    refunded: "bg-gray-100 text-gray-700",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] ?? "bg-gray-100 text-gray-600"}`}>
      {PAYMENT_STATUS_LABEL[status]}
    </span>
  );
}

// ─── Order Detail Modal ───────────────────────────────────────────────────────

interface OrderDetailModalProps {
  data: OrderDetail;
  onClose: () => void;
}

function OrderDetailModal({ data, onClose }: OrderDetailModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Accent Bar */}
        <div className="h-2 bg-gradient-to-r from-[#00C9B1] to-[#00A896]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute top-4 left-4 p-2 hover:bg-[#F4F6F9] rounded-full transition-colors group"
        >
          <X className="w-5 h-5 text-[#777779] group-hover:text-[#0D1F3C]" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4 border-b border-[#F4F6F9]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#00C9B1] to-[#00A896] text-white flex items-center justify-center shadow-md">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0D1F3C]">{data.orderNumber}</h2>
              <p className="text-sm text-[#777779]">{formatDateTime(data.createdAt)}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={data.status} />
            <PaymentStatusBadge status={data.payment.status} />
          </div>
        </div>

        {/* Body - scrollable */}
        <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">

          {/* Client & Provider */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Client */}
            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#F4F6F9] space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <UserIcon className="w-4 h-4 text-[#00C9B1]" />
                <span className="text-xs font-semibold text-[#777779] uppercase tracking-wide">العميل</span>
              </div>
              <p className="text-sm font-semibold text-[#0D1F3C]">{data.client?.name || "—"}</p>
              <p className="text-xs text-[#777779]">{data.client?.email || "—"}</p>
              <p className="text-xs text-[#777779]" dir="ltr">{data.client?.phone || "—"}</p>
            </div>

            {/* Provider */}
            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#F4F6F9] space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Store className="w-4 h-4 text-[#00C9B1]" />
                <span className="text-xs font-semibold text-[#777779] uppercase tracking-wide">المغسلة</span>
              </div>
              <p className="text-sm font-semibold text-[#0D1F3C]">{data.provider?.name || "—"}</p>
              <p className="text-xs text-[#777779]" dir="ltr">{data.provider?.phone || "—"}</p>
              <p className="text-xs text-[#777779]">{data.provider?.address || "—"}</p>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Delivery Type */}
            <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#F4F6F9] flex items-start gap-3">
              <Truck className="w-5 h-5 text-[#00C9B1] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-medium text-[#777779] mb-1">نوع التوصيل</span>
                <span className="text-sm font-semibold text-[#0D1F3C]">
                  {data.deliveryType ? DELIVERY_TYPE_LABEL[data.deliveryType] : "—"}
                </span>
              </div>
            </div>

            {/* Address */}
            <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#F4F6F9] flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#00C9B1] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-medium text-[#777779] mb-1">عنوان التوصيل</span>
                <span className="text-sm font-semibold text-[#0D1F3C]">{data.address || "—"}</span>
              </div>
            </div>

            {/* Pickup Time */}
            <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#F4F6F9] flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#00C9B1] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-medium text-[#777779] mb-1">وقت الاستلام</span>
                <span className="text-sm font-semibold text-[#0D1F3C]">{formatDateTime(data.pickupTime)}</span>
              </div>
            </div>

            {/* Delivery Time */}
            <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#F4F6F9] flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#00C9B1] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-medium text-[#777779] mb-1">وقت التسليم</span>
                <span className="text-sm font-semibold text-[#0D1F3C]">{formatDateTime(data.deliveryTime)}</span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          {data.items.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-4 h-4 text-[#00C9B1]" />
                <span className="text-sm font-semibold text-[#0D1F3C]">الخدمات المطلوبة</span>
              </div>
              <div className="bg-[#F8FAFC] rounded-xl border border-[#F4F6F9] overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#F4F6F9] bg-[#F4F6F9]">
                      <th className="text-right text-[#777779] text-xs py-2.5 px-4">الخدمة</th>
                      <th className="text-right text-[#777779] text-xs py-2.5 px-4">الكمية</th>
                      <th className="text-right text-[#777779] text-xs py-2.5 px-4">سعر الوحدة</th>
                      <th className="text-right text-[#777779] text-xs py-2.5 px-4">الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((item, i) => (
                      <tr key={i} className="border-b border-[#F4F6F9] last:border-0">
                        <td className="py-2.5 px-4 text-[#0D1F3C] font-medium">{item.name || "—"}</td>
                        <td className="py-2.5 px-4 text-[#777779]">{item.quantity}</td>
                        <td className="py-2.5 px-4 text-[#777779]">{item.unitPrice?.toFixed(2)} ج.م</td>
                        <td className="py-2.5 px-4 text-[#0D1F3C] font-medium">{item.totalPrice?.toFixed(2)} ج.م</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pricing */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-[#00C9B1]" />
              <span className="text-sm font-semibold text-[#0D1F3C]">تفاصيل السعر</span>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl border border-[#F4F6F9] p-4 space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-[#777779]">سعر الخدمات</span>
                <span className="text-[#0D1F3C]">{data.pricing.providerPrice?.toFixed(2)} ج.م</span>
              </div>
              {data.pricing.shippingPrice > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#777779]">رسوم الشحن</span>
                  <span className="text-[#0D1F3C]">{data.pricing.shippingPrice?.toFixed(2)} ج.م</span>
                </div>
              )}
              {data.pricing.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#777779]">خصم</span>
                  <span className="text-green-600">- {data.pricing.discount?.toFixed(2)} ج.م</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#F4F6F9] flex justify-between font-bold text-[#0D1F3C]">
                <span>الإجمالي</span>
                <span>{data.pricing.totalPrice?.toFixed(2)} ج.م</span>
              </div>
              {data.pricing.platformCommission > 0 && (
                <div className="flex justify-between text-xs text-[#777779]">
                  <span>عمولة المنصة</span>
                  <span>{data.pricing.platformCommission?.toFixed(2)} ج.م</span>
                </div>
              )}
            </div>
          </div>

          {/* Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#F4F6F9] flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-[#00C9B1] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-medium text-[#777779] mb-1">طريقة الدفع</span>
                <span className="text-sm font-semibold text-[#0D1F3C]">
                  {data.payment.method ? PAYMENT_METHOD_LABEL[data.payment.method] : "—"}
                </span>
              </div>
            </div>
            <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#F4F6F9] flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-[#00C9B1] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-medium text-[#777779] mb-2">حالة الدفع</span>
                <PaymentStatusBadge status={data.payment.status} />
              </div>
            </div>
          </div>

          {/* Notes */}
          {data.notes && (
            <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#F4F6F9] flex items-start gap-3">
              <FileText className="w-5 h-5 text-[#00C9B1] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-medium text-[#777779] mb-1">ملاحظات</span>
                <span className="text-sm text-[#0D1F3C]">{data.notes}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8FAFC] border-t border-[#F4F6F9] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#0D1F3C] hover:bg-[#162F56] text-white text-sm font-semibold rounded-lg transition-colors shadow-md"
          >
            إغلاق (Close)
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Loading Detail Modal ─────────────────────────────────────────────────────

function LoadingDetailModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-12 flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()} dir="rtl">
        <div className="w-10 h-10 border-4 border-[#00C9B1] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#777779]">جاري تحميل تفاصيل الطلب...</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 10;

const TAB_LABELS: Record<TabKey, string> = {
  all:        "جميع الطلبات",
  pending:    "قيد الانتظار",
  processing: "قيد التنفيذ",
  completed:  "مكتمل",
  cancelled:  "ملغي",
};

export function OrdersManagement() {
  const [activeTab, setActiveTab]       = useState<TabKey>("all");
  const [searchQuery, setSearchQuery]   = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [currentPage, setCurrentPage]   = useState(1);

  const [orders, setOrders]             = useState<OrderListItem[]>([]);
  const [counts, setCounts]             = useState({ all: 0, pending: 0, processing: 0, completed: 0, cancelled: 0 });
  const [totalPages, setTotalPages]     = useState(1);
  const [isLoading, setIsLoading]       = useState(true);
  const [error, setError]               = useState<string | null>(null);

  const [laundries, setLaundries]       = useState<{ id: string; name: string }[]>([]);

  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // ── Fetch laundries list for dropdown ──────────────────────────────────────
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/laundries?status=all&limit=1000`)
      .then((r) => r.json())
      .then((json) => {
        if (json.status === "success") {
          setLaundries(
            json.data.laundries.map((l: any) => ({ id: String(l.id), name: l.name }))
          );
        }
      })
      .catch(() => {});
  }, [API_BASE_URL]);

  // ── Fetch list ─────────────────────────────────────────────────────────────
  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const params = new URLSearchParams({
        tab:   activeTab,
        page:  String(currentPage),
        limit: String(ITEMS_PER_PAGE),
      });
      if (searchQuery.trim())  params.set("search",   searchQuery.trim());
      if (selectedProvider)    params.set("provider", selectedProvider);

      const res = await fetch(`${API_BASE_URL}/api/admin/orders?${params}`);
      if (!res.ok) throw new Error("فشل تحميل الطلبات");
      const json = await res.json();

      if (json.status === "success") {
        setCounts(json.data.counts);
        setTotalPages(json.data.pagination.totalPages || 1);
        setOrders(
          json.data.orders.map((o: any): OrderListItem => ({
            id:          String(o.id),
            orderNumber: o.orderNumber,
            client:      o.client || "—",
            provider:    o.provider || "—",
            services:    Array.isArray(o.services) ? o.services.filter(Boolean) : [],
            amount:      o.amount ?? 0,
            status:      o.status as OrderStatus,
            createdAt:   o.createdAt,
          }))
        );
      }
    } catch (err: any) {
      setError(err.message || "حدث خطأ أثناء تحميل البيانات");
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, currentPage, searchQuery, selectedProvider, API_BASE_URL]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // ── Fetch single order detail ───────────────────────────────────────────────
  async function handleViewOrder(id: string) {
    try {
      setLoadingDetail(true);
      const res = await fetch(`${API_BASE_URL}/api/admin/orders/${id}`);
      if (!res.ok) throw new Error("فشل تحميل تفاصيل الطلب");
      const json = await res.json();
      if (json.status === "success") {
        const d = json.data;
        setSelectedOrder({
          id:           String(d.id),
          orderNumber:  d.orderNumber,
          client:       d.client ?? null,
          provider:     d.provider ?? null,
          deliveryType: d.deliveryType ?? null,
          address:      d.address ?? null,
          items:        Array.isArray(d.items) ? d.items : [],
          pricing: {
            providerPrice:      d.pricing?.providerPrice ?? 0,
            shippingPrice:      d.pricing?.shippingPrice ?? 0,
            discount:           d.pricing?.discount ?? 0,
            totalPrice:         d.pricing?.totalPrice ?? 0,
            platformCommission: d.pricing?.platformCommission ?? 0,
          },
          payment: {
            method: d.payment?.method ?? null,
            status: d.payment?.status ?? null,
          },
          status:       d.status as OrderStatus,
          pickupTime:   d.pickupTime ?? null,
          deliveryTime: d.deliveryTime ?? null,
          notes:        d.notes ?? null,
          createdAt:    d.createdAt,
        });
      }
    } catch (err: any) {
      alert(err.message || "حدث خطأ أثناء تحميل التفاصيل");
    } finally {
      setLoadingDetail(false);
    }
  }

  function handleTabChange(tab: TabKey) {
    setActiveTab(tab);
    setCurrentPage(1);
  }

  function handleSearch(val: string) {
    setSearchQuery(val);
    setCurrentPage(1);
  }

  function handleProviderChange(id: string) {
    setSelectedProvider(id);
    setCurrentPage(1);
  }

  const TAB_STYLES: Record<TabKey, { active: string; inactive: string }> = {
    all:        { active: "bg-[#0D1F3C] text-white", inactive: "bg-white text-[#777779] border border-[#F4F6F9] hover:border-[#0D1F3C]" },
    pending:    { active: "bg-[#F4C542] text-[#0D1F3C]", inactive: "bg-white text-[#777779] border border-[#F4F6F9] hover:border-[#F4C542]" },
    processing: { active: "bg-blue-600 text-white", inactive: "bg-white text-[#777779] border border-[#F4F6F9] hover:border-blue-600" },
    completed:  { active: "bg-[#00C9B1] text-white", inactive: "bg-white text-[#777779] border border-[#F4F6F9] hover:border-[#00C9B1]" },
    cancelled:  { active: "bg-[#FF4D4D] text-white", inactive: "bg-white text-[#777779] border border-[#F4F6F9] hover:border-[#FF4D4D]" },
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Order Detail Modal */}
      {loadingDetail && <LoadingDetailModal onClose={() => setLoadingDetail(false)} />}
      {selectedOrder && !loadingDetail && (
        <OrderDetailModal data={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}

      <h1 className="text-3xl text-[#0D1F3C]">إدارة الطلبات</h1>

      {/* Status Filter Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {(Object.keys(TAB_LABELS) as TabKey[]).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors text-sm font-medium ${
              activeTab === tab
                ? TAB_STYLES[tab].active
                : TAB_STYLES[tab].inactive
            }`}
          >
            {TAB_LABELS[tab]} ({counts[tab]})
          </button>
        ))}
      </div>

      {/* Search + Provider Filter */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search by order number */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777779]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="ابحث برقم الطلب..."
            className="pr-9 pl-4 py-2 border border-[#F4F6F9] rounded-lg focus:outline-none focus:border-[#00C9B1] bg-white text-sm w-52"
          />
        </div>

        {/* Laundry filter dropdown */}
        <div className="relative">
          <Store className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777779] pointer-events-none" />
          <select
            value={selectedProvider}
            onChange={(e) => handleProviderChange(e.target.value)}
            aria-label="فلتر بالمغسلة"
            className="pr-9 pl-8 py-2 border border-[#F4F6F9] rounded-lg focus:outline-none focus:border-[#00C9B1] bg-white text-sm appearance-none cursor-pointer text-[#0D1F3C] w-52"
          >
            <option value="">كل المغاسل</option>
            {laundries.map((l) => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2">
            <svg className="w-4 h-4 text-[#777779]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Clear filters */}
        {(searchQuery || selectedProvider) && (
          <button
            onClick={() => { handleSearch(""); handleProviderChange(""); }}
            className="flex items-center gap-1 text-sm text-[#777779] hover:text-[#FF4D4D] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            مسح الفلاتر
          </button>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F4F6F9] bg-[#F4F6F9]">
                <th className="text-right text-[#777779] text-sm py-4 px-6">رقم الطلب</th>
                <th className="text-right text-[#777779] text-sm py-4 px-6">العميل</th>
                <th className="text-right text-[#777779] text-sm py-4 px-6">المغسلة</th>
                <th className="text-right text-[#777779] text-sm py-4 px-6">الخدمات</th>
                <th className="text-right text-[#777779] text-sm py-4 px-6">المبلغ</th>
                <th className="text-right text-[#777779] text-sm py-4 px-6">التاريخ</th>
                <th className="text-right text-[#777779] text-sm py-4 px-6">الحالة</th>
                <th className="text-right text-[#777779] text-sm py-4 px-6">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#777779]">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-[#00C9B1] border-t-transparent rounded-full animate-spin" />
                      جاري تحميل الطلبات...
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#FF4D4D] font-medium">
                    {error}
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#777779]">
                    لا يوجد طلبات.
                  </td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`border-b border-[#F4F6F9] hover:bg-[#F4F6F9] transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-[#F4F6F9]/50"
                    }`}
                  >
                    <td className="py-4 px-6 text-[#0D1F3C] font-medium text-sm">{order.orderNumber}</td>
                    <td className="py-4 px-6 text-[#777779] text-sm">{order.client}</td>
                    <td className="py-4 px-6 text-[#777779] text-sm">{order.provider}</td>
                    <td className="py-4 px-6 text-[#777779] text-sm max-w-xs">
                      {order.services.length > 0
                        ? order.services.filter(Boolean).join("، ")
                        : <span className="text-gray-400 italic text-xs">—</span>
                      }
                    </td>
                    <td className="py-4 px-6 text-[#0D1F3C] font-medium text-sm">
                      {order.amount?.toFixed(2)} ج.م
                    </td>
                    <td className="py-4 px-6 text-[#777779] text-sm">{formatDate(order.createdAt)}</td>
                    <td className="py-4 px-6">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="py-4 px-6">
                      <button
                        className="p-2 hover:bg-[#00C9B1]/10 rounded-lg transition-colors"
                        title="عرض التفاصيل"
                        onClick={() => handleViewOrder(order.id)}
                        aria-label={`عرض تفاصيل الطلب ${order.orderNumber}`}
                      >
                        <Eye className="w-4 h-4 text-[#00C9B1]" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {!isLoading && !error && orders.length > 0 && (
        <div className="flex justify-between items-center">
          <p className="text-[#777779] text-sm">
            صفحة {currentPage} من {totalPages}
          </p>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-[#F4F6F9] rounded-lg text-[#777779] hover:bg-[#F4F6F9] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              السابق
            </button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    page === currentPage
                      ? "bg-[#00C9B1] text-white shadow-sm"
                      : "border border-[#F4F6F9] text-[#777779] hover:bg-[#F4F6F9]"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            {totalPages > 7 && currentPage < totalPages && (
              <span className="text-[#777779] px-2">…</span>
            )}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-[#F4F6F9] rounded-lg text-[#777779] hover:bg-[#F4F6F9] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              التالي
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
