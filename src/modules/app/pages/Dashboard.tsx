import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Users, Store, ShoppingBag, Check, X, ArrowLeft } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

type OrderStatus =
  | "pending" | "accepted" | "picked_up" | "in_progress"
  | "ready" | "out_for_delivery" | "delivered" | "cancelled";

interface DashboardStats {
  totalClients: number;
  totalLaundries: number;
  totalOrders: number;
}

interface FinancialData {
  totalRevenue: number;
  totalProviderEarnings: number;
  totalAdminCommission: number;
}

interface RecentOrder {
  orderNumber: string;
  client: string;
  provider: string;
  amount: number;
  status: OrderStatus;
  createdAt: string;
}

interface PendingLaundry {
  id: string;
  name: string;
  email: string;
  services: string;
  createdAt: string;
}

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
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-200"}`}>
      {STATUS_LABEL[status] || status}
    </span>
  );
}

function formatAmount(v: number) {
  return v.toLocaleString("ar-SA") + " ج.م";
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("ar-EG", { year: "numeric", month: "short", day: "numeric" });
}

type FinancialPeriod = "all" | "monthly" | "yearly";

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [financial, setFinancial] = useState<FinancialData | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [pendingLaundries, setPendingLaundries] = useState<PendingLaundry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFinancialLoading, setIsFinancialLoading] = useState(false);

  // فلاتر الملخص المالي
  const [financialPeriod, setFinancialPeriod] = useState<FinancialPeriod>("all");
  const [financialProvider, setFinancialProvider] = useState("all");
  const [laundries, setLaundries] = useState<{ id: string; name: string }[]>([]);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // جيب قائمة المغاسل للـ dropdown
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/laundries?status=all&limit=1000`)
      .then((r) => r.json())
      .then((json) => {
        if (json.status === "success") {
          setLaundries(json.data.laundries.map((l: any) => ({ id: String(l.id), name: l.name })));
        }
      })
      .catch(() => {});
  }, [API_BASE_URL]);

  // fetch الملخص المالي مع الفلاتر
  useEffect(() => {
    const fetchFinancial = async () => {
      try {
        setIsFinancialLoading(true);
        const params = new URLSearchParams({ period: financialPeriod, provider: financialProvider });
        const res = await fetch(`${API_BASE_URL}/api/admin/dashboard/financial?${params}`);
        const json = await res.json();
        if (json.status === "success") setFinancial(json.data);
      } catch (err) {
        console.error("Financial fetch error:", err);
      } finally {
        setIsFinancialLoading(false);
      }
    };
    fetchFinancial();
  }, [API_BASE_URL, financialPeriod, financialProvider]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setIsLoading(true);
        const [statsRes, ordersRes, pendingRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/admin/dashboard/stats`),
          fetch(`${API_BASE_URL}/api/admin/dashboard/recent-orders`),
          fetch(`${API_BASE_URL}/api/admin/dashboard/pending-laundries`),
        ]);

        const [statsJson, ordersJson, pendingJson] = await Promise.all([
          statsRes.json(), ordersRes.json(), pendingRes.json(),
        ]);

        if (statsJson.status === "success") setStats(statsJson.data);
        if (ordersJson.status === "success") setRecentOrders(ordersJson.data);
        if (pendingJson.status === "success") setPendingLaundries(pendingJson.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, [API_BASE_URL]);

  async function handleApprove(id: string) {
    const prev = [...pendingLaundries];
    setPendingLaundries((list) => list.filter((l) => l.id !== id));
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/admin/dashboard/pending-laundries/${id}/approve`,
        { method: "PATCH" }
      );
      if (!res.ok) throw new Error("Failed to approve");
    } catch {
      setPendingLaundries(prev);
      alert("حدث خطأ أثناء القبول، يرجى المحاولة مرة أخرى.");
    }
  }

  async function handleReject(id: string) {
    if (!confirm("هل أنت متأكد من رفض وحذف هذه المغسلة؟")) return;
    const prev = [...pendingLaundries];
    setPendingLaundries((list) => list.filter((l) => l.id !== id));
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/admin/dashboard/pending-laundries/${id}/reject`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to reject");
    } catch {
      setPendingLaundries(prev);
      alert("حدث خطأ أثناء الرفض، يرجى المحاولة مرة أخرى.");
    }
  }

  const statsCards = [
    { label: "إجمالي المستخدمين", value: stats?.totalClients, accent: "#00C9B1", icon: Users },
    { label: "إجمالي المغاسل",   value: stats?.totalLaundries, accent: "#0D1F3C", icon: Store },
    { label: "إجمالي الطلبات",   value: stats?.totalOrders,   accent: "#F4C542", icon: ShoppingBag },
  ];

  // الـ pie يظهر فيه القسمة بس (90% + 10%) — مش مدفوعات المستخدمين علشان متحسبش مرتين
  const pieData = financial
    ? [
        { name: "أرباح المغاسل", value: financial.totalProviderEarnings, color: "#0D1F3C" },
        { name: "أرباح الأدمن",  value: financial.totalAdminCommission,  color: "#F4C542" },
      ]
    : [];

  // الـ bars بتعرض الثلاثة مع بعض كمرجع
  const barData = financial
    ? [
        { name: "مدفوعات المستخدمين", value: financial.totalRevenue,          color: "#00C9B1" },
        { name: "أرباح المغاسل",      value: financial.totalProviderEarnings, color: "#0D1F3C" },
        { name: "أرباح الأدمن",       value: financial.totalAdminCommission,  color: "#F4C542" },
      ]
    : [];

  // الإجمالي = ما دفعه اليوزر (100%)
  const totalAmount = financial?.totalRevenue || 0;

  return (
    <div className="space-y-6" dir="rtl">
      <h1 className="text-3xl text-[#0D1F3C]">لوحة التحكم</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.07)] border-r-4"
              style={{ borderRightColor: stat.accent }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#777779] text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl text-[#0D1F3C]">
                    {isLoading ? (
                      <span className="inline-block w-16 h-7 bg-[#F4F6F9] rounded animate-pulse" />
                    ) : (
                      (stat.value ?? 0).toLocaleString("ar-SA")
                    )}
                  </p>
                </div>
                <Icon className="w-10 h-10" style={{ color: stat.accent }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Financial Summary Pie Chart */}
      <div className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
        {/* Header + Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-xl text-[#0D1F3C]">الملخص المالي</h2>
          <div className="flex flex-wrap items-center gap-3">

            {/* Period toggle */}
            <div className="flex rounded-lg border border-[#F4F6F9] overflow-hidden text-sm">
              {(["all", "monthly", "yearly"] as FinancialPeriod[]).map((p) => {
                const label = p === "all" ? "الكل" : p === "monthly" ? "الشهر الحالي" : "السنة الحالية";
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFinancialPeriod(p)}
                    className={`px-3 py-1.5 transition-colors ${
                      financialPeriod === p
                        ? "bg-[#00C9B1] text-white"
                        : "bg-white text-[#777779] hover:bg-[#F4F6F9]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Laundry dropdown */}
            <select
              value={financialProvider}
              onChange={(e) => setFinancialProvider(e.target.value)}
              aria-label="فلتر بالمغسلة"
              className="pr-3 pl-7 py-1.5 border border-[#F4F6F9] rounded-lg text-sm bg-white text-[#0D1F3C] focus:outline-none focus:border-[#00C9B1] appearance-none cursor-pointer"
            >
              <option value="all">كل المغاسل</option>
              {laundries.map((l) => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>
        </div>

        {isLoading || isFinancialLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#00C9B1] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : totalAmount > 0 ? (
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-full lg:w-1/2 h-64">
              <ResponsiveContainer key={`${financialPeriod}-${financialProvider}-${totalAmount}`} width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [formatAmount(Number(value ?? 0)), ""]}
                    contentStyle={{
                      borderRadius: "10px",
                      border: "none",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      fontFamily: "Cairo, sans-serif",
                      direction: "rtl",
                    }}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={10}
                    formatter={(value) => (
                      <span style={{ color: "#777779", fontSize: "13px", fontFamily: "Cairo, sans-serif" }}>
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full lg:w-1/2 space-y-4">
              {barData.map((item) => {
                const pct = totalAmount > 0 ? ((item.value / totalAmount) * 100).toFixed(1) : "0.0";
                return (
                  <div key={item.name} className="flex items-center gap-4">
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[#0D1F3C] text-sm font-medium">{item.name}</span>
                        <span className="text-[#777779] text-sm">{pct}%</span>
                      </div>
                      <div className="w-full bg-[#F4F6F9] rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full"
                          style={{ width: `${pct}%`, backgroundColor: item.color }}
                        />
                      </div>
                      <div className="text-[#777779] text-xs mt-1">{formatAmount(item.value)}</div>
                    </div>
                  </div>
                );
              })}
              <div className="pt-3 border-t border-[#F4F6F9] flex justify-between items-center">
                <span className="text-[#777779] text-sm">الإجمالي</span>
                <span className="text-[#0D1F3C] font-medium">{formatAmount(totalAmount)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center text-[#777779]">
            لا توجد بيانات مالية بعد
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
          <h2 className="text-xl text-[#0D1F3C] mb-4">الطلبات الأخيرة</h2>
          {isLoading ? (
            <div className="py-8 flex justify-center">
              <div className="w-6 h-6 border-4 border-[#00C9B1] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : recentOrders.length === 0 ? (
            <p className="text-[#777779] text-sm text-center py-6">لا توجد طلبات حديثة</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#F4F6F9]">
                    <th className="text-right text-[#777779] text-sm py-3 px-2">رقم الطلب</th>
                    <th className="text-right text-[#777779] text-sm py-3 px-2">العميل</th>
                    <th className="text-right text-[#777779] text-sm py-3 px-2">المبلغ</th>
                    <th className="text-right text-[#777779] text-sm py-3 px-2">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#F4F6F9]"}>
                      <td className="py-3 px-2 text-[#777779] text-sm">{order.orderNumber}</td>
                      <td className="py-3 px-2 text-[#777779] text-sm">{order.client}</td>
                      <td className="py-3 px-2 text-[#777779] text-sm">{formatAmount(order.amount)}</td>
                      <td className="py-3 px-2">
                        <StatusBadge status={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pending Provider Requests */}
        <div className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.07)] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-[#0D1F3C]">طلبات المغاسل قيد الانتظار</h2>
            {pendingLaundries.length > 0 && (
              <Link
                to="/providers"
                className="text-sm text-[#00C9B1] hover:text-[#00b39d] flex items-center gap-1 transition-colors"
              >
                عرض الكل
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
          {isLoading ? (
            <div className="py-8 flex justify-center">
              <div className="w-6 h-6 border-4 border-[#00C9B1] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : pendingLaundries.length === 0 ? (
            <p className="text-[#777779] text-sm text-center py-6">لا توجد طلبات معلقة</p>
          ) : (
            <>
              <div className="space-y-3 flex-1">
                {pendingLaundries.map((provider) => (
                  <div
                    key={provider.id}
                    className="border border-[#F4F6F9] rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-[#0D1F3C] font-medium text-sm">{provider.name}</h3>
                        <p className="text-[#777779] text-xs">{provider.email}</p>
                      </div>
                      <span className="text-xs text-[#777779] shrink-0">{formatDate(provider.createdAt)}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        type="button"
                        onClick={() => handleApprove(String(provider.id))}
                        className="flex-1 bg-[#00C9B1] text-white px-3 py-1.5 rounded-lg hover:bg-[#00b39d] transition-colors flex items-center justify-center gap-1.5 text-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        قبول
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReject(String(provider.id))}
                        className="flex-1 border-2 border-[#FF4D4D] text-[#FF4D4D] px-3 py-1.5 rounded-lg hover:bg-[#FF4D4D] hover:text-white transition-colors flex items-center justify-center gap-1.5 text-sm"
                      >
                        <X className="w-3.5 h-3.5" />
                        رفض
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/providers"
                className="mt-4 pt-4 border-t border-[#F4F6F9] text-center text-sm text-[#00C9B1] hover:text-[#00b39d] transition-colors flex items-center justify-center gap-1"
              >
                عرض جميع الطلبات المعلقة
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
