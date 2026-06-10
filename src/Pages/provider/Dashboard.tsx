import { useState, useMemo } from "react";
import { useProvider } from "./context/ProviderContext";
import type { Page } from "./types";

interface Props {
  setPage: (p: Page) => void;
}

const WEEK_DAYS = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
const MONTH_WEEKS = ["الأسبوع ١", "الأسبوع ٢", "الأسبوع ٣", "الأسبوع ٤"];

export default function Dashboard({ setPage }: Props) {
  const {
    orders, orderStats, pickupEnabled, setPickupEnabled,
    laundryCapacity, setLaundryCapacity,
    acceptOrder, rejectOrder, showToast, profile,
  } = useProvider();

  const [chartPeriod, setChartPeriod] = useState<"week" | "month">("week");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const urgentOrders = orders.filter((o) => o.urgent && o.status === "new");
  const doneRevenue = orders.filter((o) => o.status === "done").reduce((a, o) => a + o.price, 0);

  const chartData = useMemo(() => {
    const base = doneRevenue || 2450;
    const multipliers = chartPeriod === "week"
      ? [0.6, 0.75, 0.85, 0.5, 0.9, 0.65, 0.4]
      : [0.7, 0.85, 0.95, 0.8];
    const prevMultipliers = chartPeriod === "week"
      ? [0.4, 0.55, 0.3, 0.6, 0.45, 0.7, 0.2]
      : [0.55, 0.7, 0.6, 0.65];

    const labels = chartPeriod === "week" ? WEEK_DAYS : MONTH_WEEKS;
    const perDay = base / labels.length;

    return labels.map((day, i) => ({
      day,
      curr: Math.round(perDay * multipliers[i]),
      prev: Math.round(perDay * prevMultipliers[i]),
    }));
  }, [doneRevenue, chartPeriod]);

  const totalCurr = chartData.reduce((a, b) => a + b.curr, 0);
  const totalPrev = chartData.reduce((a, b) => a + b.prev, 0);
  const growth = totalPrev > 0 ? Math.round(((totalCurr - totalPrev) / totalPrev) * 100) : 0;
  const maxVal = Math.max(...chartData.flatMap((b) => [b.curr, b.prev]), 1);

  const kpis = [
    { label: "طلبات جديدة", value: String(orderStats.new), icon: "add_shopping_cart", color: "border-[#006B5D]", bg: "bg-[#5BF7DD]/30", iconColor: "text-[#006B5D]", action: () => setPage("orders") },
    { label: "قيد التنفيذ", value: String(orderStats.processing), icon: "sync", color: "border-orange-400", bg: "bg-orange-100", iconColor: "text-orange-500", action: () => setPage("orders") },
    { label: "مكتملة اليوم", value: String(orderStats.done), icon: "task_alt", color: "border-teal-500", bg: "bg-teal-100", iconColor: "text-teal-600", action: () => setPage("orders") },
    { label: "إيرادات اليوم", value: `${orderStats.revenue.toLocaleString("ar-SA")} ر.س`, icon: "payments", color: "border-[#765B00]", bg: "bg-[#FFDF94]/50", iconColor: "text-[#765B00]", action: () => setPage("discounts") },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>
            لوحة تحكم {profile.businessName}
          </h2>
          <p className="text-slate-500 mt-1">مرحباً، هناك {orderStats.new} طلب جديد ينتظر مراجعتك</p>
        </div>
        <div className="flex items-center gap-3 bg-[#EFF4FA] px-4 py-2 rounded-full">
          <span className="text-sm text-slate-500">حالة الاستلام:</span>
          <button
            onClick={() => {
              setPickupEnabled(!pickupEnabled);
              showToast(pickupEnabled ? "تم إيقاف استقبال الطلبات" : "تم تفعيل استقبال الطلبات");
            }}
            className={`w-11 h-6 rounded-full relative transition-all shadow-inner ${pickupEnabled ? "bg-[#006B5D]" : "bg-slate-200"}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${pickupEnabled ? "left-1" : "right-1"}`} />
          </button>
          <span className={`text-xs font-bold ${pickupEnabled ? "text-[#006B5D]" : "text-slate-400"}`}>
            {pickupEnabled ? "مفعّل" : "متوقف"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {kpis.map((k) => (
          <button
            key={k.label}
            onClick={k.action}
            className={`bg-white p-6 rounded-xl flex items-center justify-between border-b-4 ${k.color} shadow-sm hover:shadow-md transition-all text-right w-full`}
          >
            <div>
              <p className="text-sm text-slate-500 mb-1">{k.label}</p>
              <h3 className="text-3xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>{k.value}</h3>
            </div>
            <div className={`w-14 h-14 rounded-full ${k.bg} flex items-center justify-center`}>
              <span className={`material-symbols-outlined ${k.iconColor} text-3xl`} style={{ fontVariationSettings: "'FILL' 1" }}>{k.icon}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>الطلبات العاجلة</h2>
              <button onClick={() => setPage("orders")} className="text-[#006B5D] text-sm hover:underline font-bold">عرض الكل</button>
            </div>
            {urgentOrders.length === 0 ? (
              <div className="bg-white p-8 rounded-xl text-center border border-[#C5C6CE]/20">
                <p className="text-slate-500 text-sm">لا توجد طلبات عاجلة حالياً</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {urgentOrders.map((o) => (
                  <div key={o.id} className="bg-white p-5 rounded-xl shadow-sm border border-[#C5C6CE]/20 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#E9EEF4] flex items-center justify-center">
                          <span className="material-symbols-outlined text-[#0D1F3C]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                        </div>
                        <div>
                          <p className="font-bold text-sm">{o.customerName}</p>
                          <p className="text-xs text-slate-500">{o.location.split("•")[0]}</p>
                        </div>
                      </div>
                      <div className="bg-red-50 text-red-600 px-3 py-1 rounded-full flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">timer</span>
                        <span className="text-xs font-bold">مستعجل</span>
                      </div>
                    </div>
                    <div className="space-y-2 py-2 border-y border-[#E9EEF4]">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">الخدمة:</span>
                        <span className="font-medium">{o.items}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">السعر:</span>
                        <span className="font-medium">{o.price} ر.س</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => acceptOrder(o.id)} className="flex-1 bg-[#006B5D] text-white py-2 rounded-full text-sm font-bold hover:opacity-90 active:scale-95 transition-all">قبول الطلب</button>
                      <button onClick={() => rejectOrder(o.id)} className="flex-1 bg-[#E9EEF4] text-slate-500 py-2 rounded-full text-sm font-bold hover:bg-red-50 hover:text-red-600 active:scale-95 transition-all">رفض</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Revenue Chart */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#C5C6CE]/20">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>تحليلات الإيرادات</h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-2xl font-bold text-[#0D1F3C]">{totalCurr.toLocaleString("ar-SA")} <span className="text-sm text-slate-400">ر.س</span></span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${growth >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                    {growth >= 0 ? "+" : ""}{growth}% عن الفترة السابقة
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setChartPeriod("week")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${chartPeriod === "week" ? "bg-[#006B5D] text-white" : "bg-[#EFF4FA] text-slate-500"}`}
                >
                  أسبوع
                </button>
                <button
                  onClick={() => setChartPeriod("month")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${chartPeriod === "month" ? "bg-[#006B5D] text-white" : "bg-[#EFF4FA] text-slate-500"}`}
                >
                  شهر
                </button>
              </div>
            </div>

            <div className="flex gap-4 mb-4">
              <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded-sm bg-[#006B5D] inline-block" /> الحالي</span>
              <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded-sm bg-[#E4E9EF] inline-block" /> السابق</span>
            </div>

            <div className="relative flex items-end justify-between h-52 gap-3 px-2">
              {chartData.map((b, i) => (
                <div
                  key={b.day}
                  className="flex flex-col items-center flex-1 gap-2 relative cursor-pointer"
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                  onClick={() => showToast(`${b.day}: ${b.curr.toLocaleString("ar-SA")} ر.س`, "info")}
                >
                  {hoveredBar === i && (
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[#0D1F3C] text-white text-xs px-3 py-2 rounded-xl whitespace-nowrap z-10 shadow-lg">
                      <p className="font-bold">{b.day}</p>
                      <p>الحالي: {b.curr.toLocaleString("ar-SA")} ر.س</p>
                      <p className="text-slate-400">السابق: {b.prev.toLocaleString("ar-SA")} ر.س</p>
                    </div>
                  )}
                  <div className="w-full flex justify-center items-end gap-1 h-40">
                    <div
                      className={`bg-[#E4E9EF] w-4 rounded-t-md transition-all ${hoveredBar === i ? "bg-slate-300" : ""}`}
                      style={{ height: `${(b.prev / maxVal) * 100}%` }}
                    />
                    <div
                      className={`bg-[#006B5D] w-4 rounded-t-md transition-all ${hoveredBar === i ? "bg-[#005046] scale-105" : ""}`}
                      style={{ height: `${(b.curr / maxVal) * 100}%` }}
                    />
                  </div>
                  <span className={`text-xs transition-colors ${hoveredBar === i ? "text-[#006B5D] font-bold" : "text-slate-500"}`}>{b.day}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#E4E9EF] grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-xs text-slate-400">إجمالي الفترة</p>
                <p className="font-bold text-[#0D1F3C]">{totalCurr.toLocaleString("ar-SA")} ر.س</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-400">الفترة السابقة</p>
                <p className="font-bold text-slate-500">{totalPrev.toLocaleString("ar-SA")} ر.س</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-400">متوسط يومي</p>
                <p className="font-bold text-[#006B5D]">{Math.round(totalCurr / chartData.length).toLocaleString("ar-SA")} ر.س</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0D1F3C] p-6 rounded-2xl text-white">
            <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "Cairo, sans-serif" }}>إجراءات سريعة</h3>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setPage("orders")} className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex flex-col items-center gap-2 transition-colors">
                <span className="material-symbols-outlined">inbox</span>
                <span className="text-xs">الطلبات الواردة</span>
              </button>
              <button onClick={() => setPage("services")} className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex flex-col items-center gap-2 transition-colors">
                <span className="material-symbols-outlined">list_alt</span>
                <span className="text-xs">إدارة الخدمات</span>
              </button>
              <button onClick={() => setPage("discounts")} className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex flex-col items-center gap-2 transition-colors col-span-2">
                <span className="material-symbols-outlined">payments</span>
                <span className="text-xs">الخصومات والتسعير</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#C5C6CE]/20 space-y-6">
            <h3 className="text-lg font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>حالة التشغيل</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">سعة المغسلة الحالية</span>
                  <span className="font-bold">{laundryCapacity}٪</span>
                </div>
                <input type="range" min={0} max={100} value={laundryCapacity} onChange={(e) => setLaundryCapacity(Number(e.target.value))} className="w-full accent-[#006B5D]" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">جاهز للتوصيل</span>
                  <span className="font-bold">{orderStats.ready + orderStats.delivering} طلب</span>
                </div>
                <div className="h-2 w-full bg-[#DEE3E9] rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400 rounded-full transition-all" style={{ width: `${Math.min(100, ((orderStats.ready + orderStats.delivering) / Math.max(orders.length, 1)) * 100)}%` }} />
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-[#E9EEF4]">
              <div className="flex items-center gap-4">
                <div className="bg-[#E9EEF4] p-3 rounded-xl">
                  <span className="material-symbols-outlined text-[#006B5D]">local_shipping</span>
                </div>
                <div>
                  <p className="text-sm font-bold">{orderStats.delivering > 0 ? `${orderStats.delivering} مندوب` : "٢ مندوب توصيل"}</p>
                  <p className="text-xs text-slate-500">{orderStats.delivering > 0 ? "في الطريق" : "في انتظار الطلبات"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
