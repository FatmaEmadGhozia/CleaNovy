


// import { useState } from "react";
// import { useProvider } from "./context/ProviderContext";
// import type { Page } from "./types";

// interface Props {
//   setPage: (p: Page) => void;
// }

// const DAY_LABELS: Record<string, string> = {
//   "0": "الأحد", "1": "الاثنين", "2": "الثلاثاء",
//   "3": "الأربعاء", "4": "الخميس", "5": "الجمعة", "6": "السبت",
// };

// export default function Dashboard({ setPage }: Props) {
//   const {
//     dashboardStats,
//     pickupEnabled, setPickupEnabled,
//     acceptOrder, rejectOrder, showToast, profile,
//   } = useProvider();

//   const [hoveredBar, setHoveredBar] = useState<number | null>(null);

//   const stats = dashboardStats?.stats ?? { new: 0, processing: 0, ready: 0, delivering: 0, done: 0, cancelled: 0, revenue: 0 };
//   const capacityPct = dashboardStats?.capacityPct ?? 0;
//   const urgentOrders = dashboardStats?.urgentOrders ?? [];
//   const revenueChart = dashboardStats?.revenueChart ?? [];

//   // build chart data from API revenueChart
//   const chartData = revenueChart.map((r: { date: string; revenue: number }) => {
//     const d = new Date(r.date);
//     return {
//       day: DAY_LABELS[String(d.getDay())] ?? r.date,
//       curr: r.revenue,
//       prev: 0, // no prev data from API
//     };
//   });

//   const totalCurr = chartData.reduce((a: number, b: { curr: number }) => a + b.curr, 0);
//   const maxVal = Math.max(...chartData.map((b: { curr: number }) => b.curr), 1);

//   const kpis = [
//     { label: "طلبات جديدة", value: String(stats.new), icon: "add_shopping_cart", color: "border-[#006B5D]", bg: "bg-[#5BF7DD]/30", iconColor: "text-[#006B5D]", action: () => setPage("orders") },
//     { label: "قيد التنفيذ", value: String(stats.processing), icon: "sync", color: "border-orange-400", bg: "bg-orange-100", iconColor: "text-orange-500", action: () => setPage("orders") },
//     { label: "مكتملة اليوم", value: String(stats.done), icon: "task_alt", color: "border-teal-500", bg: "bg-teal-100", iconColor: "text-teal-600", action: () => setPage("orders") },
//     { label: "إيرادات اليوم", value: `${stats.revenue.toLocaleString("ar-SA")} ر.س`, icon: "payments", color: "border-[#765B00]", bg: "bg-[#FFDF94]/50", iconColor: "text-[#765B00]", action: () => setPage("discounts") },
//   ];

//   return (
//     <div className="p-8 space-y-8">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-3xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>
//             لوحة تحكم {profile.businessName}
//           </h2>
//           <p className="text-slate-500 mt-1">مرحباً، هناك {stats.new} طلب جديد ينتظر مراجعتك</p>
//         </div>
//         <div className="flex items-center gap-3 bg-[#EFF4FA] px-4 py-2 rounded-full">
//           <span className="text-sm text-slate-500">حالة الاستلام:</span>
//           <button
//             onClick={() => {
//               setPickupEnabled(!pickupEnabled);
//               showToast(pickupEnabled ? "تم إيقاف استقبال الطلبات" : "تم تفعيل استقبال الطلبات");
//             }}
//             className={`w-11 h-6 rounded-full relative transition-all shadow-inner ${pickupEnabled ? "bg-[#006B5D]" : "bg-slate-200"}`}
//           >
//             <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${pickupEnabled ? "left-1" : "right-1"}`} />
//           </button>
//           <span className={`text-xs font-bold ${pickupEnabled ? "text-[#006B5D]" : "text-slate-400"}`}>
//             {pickupEnabled ? "مفعّل" : "متوقف"}
//           </span>
//         </div>
//       </div>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-4 gap-6">
//         {kpis.map((k) => (
//           <button
//             key={k.label}
//             onClick={k.action}
//             className={`bg-white p-6 rounded-xl flex items-center justify-between border-b-4 ${k.color} shadow-sm hover:shadow-md transition-all text-right w-full`}
//           >
//             <div>
//               <p className="text-sm text-slate-500 mb-1">{k.label}</p>
//               <h3 className="text-3xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>{k.value}</h3>
//             </div>
//             <div className={`w-14 h-14 rounded-full ${k.bg} flex items-center justify-center`}>
//               <span className={`material-symbols-outlined ${k.iconColor} text-3xl`} style={{ fontVariationSettings: "'FILL' 1" }}>{k.icon}</span>
//             </div>
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-3 gap-8">
//         <div className="col-span-2 space-y-6">

//           {/* Urgent Orders */}
//           <div>
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>الطلبات العاجلة</h2>
//               <button onClick={() => setPage("orders")} className="text-[#006B5D] text-sm hover:underline font-bold">عرض الكل</button>
//             </div>
//             {urgentOrders.length === 0 ? (
//               <div className="bg-white p-8 rounded-xl text-center border border-[#C5C6CE]/20">
//                 <p className="text-slate-500 text-sm">لا توجد طلبات عاجلة حالياً</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 gap-4">
//                 {urgentOrders.map((o: any) => (
//                   <div key={o._id} className="bg-white p-5 rounded-xl shadow-sm border border-[#C5C6CE]/20 flex flex-col gap-4">
//                     <div className="flex justify-between items-start">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-[#E9EEF4] flex items-center justify-center">
//                           <span className="material-symbols-outlined text-[#0D1F3C]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
//                         </div>
//                         <div>
//                           <p className="font-bold text-sm">{o.client?.name ?? "عميل"}</p>
//                           <p className="text-xs text-slate-500">{o.address?.address ?? ""}</p>
//                         </div>
//                       </div>
//                       <div className="bg-red-50 text-red-600 px-3 py-1 rounded-full flex items-center gap-1">
//                         <span className="material-symbols-outlined text-sm">timer</span>
//                         <span className="text-xs font-bold">مستعجل</span>
//                       </div>
//                     </div>
//                     <div className="space-y-2 py-2 border-y border-[#E9EEF4]">
//                       <div className="flex justify-between text-sm">
//                         <span className="text-slate-500">الخدمة:</span>
//                         <span className="font-medium">
//                           {o.itemsSummary?.totalQty > 0
//                             ? `${o.itemsSummary.totalQty} قطعة (${o.itemsSummary.serviceNames?.join("، ")})`
//                             : "—"}
//                         </span>
//                       </div>
//                       <div className="flex justify-between text-sm">
//                         <span className="text-slate-500">السعر:</span>
//                         <span className="font-medium">{o.total_price} ر.س</span>
//                       </div>
//                     </div>
//                     <div className="flex gap-3">
//                       <button onClick={() => acceptOrder(o._id)} className="flex-1 bg-[#006B5D] text-white py-2 rounded-full text-sm font-bold hover:opacity-90 active:scale-95 transition-all">قبول الطلب</button>
//                       <button onClick={() => rejectOrder(o._id)} className="flex-1 bg-[#E9EEF4] text-slate-500 py-2 rounded-full text-sm font-bold hover:bg-red-50 hover:text-red-600 active:scale-95 transition-all">رفض</button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Revenue Chart */}
//           <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#C5C6CE]/20">
//             <div className="flex justify-between items-start mb-6">
//               <div>
//                 <h2 className="text-xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>تحليلات الإيرادات</h2>
//                 <div className="flex items-center gap-4 mt-2">
//                   <span className="text-2xl font-bold text-[#0D1F3C]">{totalCurr.toLocaleString("ar-SA")} <span className="text-sm text-slate-400">ر.س</span></span>
//                 </div>
//               </div>
//               <span className="text-xs text-slate-400">آخر ٧ أيام</span>
//             </div>

//             <div className="relative flex items-end justify-between h-52 gap-3 px-2">
//               {chartData.length === 0 ? (
//                 <div className="w-full flex items-center justify-center text-slate-400 text-sm">لا توجد بيانات</div>
//               ) : (
//                 chartData.map((b: { day: string; curr: number }, i: number) => (
//                   <div
//                     key={i}
//                     className="flex flex-col items-center flex-1 gap-2 relative cursor-pointer"
//                     onMouseEnter={() => setHoveredBar(i)}
//                     onMouseLeave={() => setHoveredBar(null)}
//                     onClick={() => showToast(`${b.day}: ${b.curr.toLocaleString("ar-SA")} ر.س`, "info")}
//                   >
//                     {hoveredBar === i && (
//                       <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#0D1F3C] text-white text-xs px-3 py-2 rounded-xl whitespace-nowrap z-10 shadow-lg">
//                         <p className="font-bold">{b.day}</p>
//                         <p>{b.curr.toLocaleString("ar-SA")} ر.س</p>
//                       </div>
//                     )}
//                     <div className="w-full flex justify-center items-end h-40">
//                       <div
//                         className={`bg-[#006B5D] w-6 rounded-t-md transition-all ${hoveredBar === i ? "bg-[#005046] scale-105" : ""}`}
//                         style={{ height: `${(b.curr / maxVal) * 100}%`, minHeight: b.curr > 0 ? "4px" : "0" }}
//                       />
//                     </div>
//                     <span className={`text-xs transition-colors ${hoveredBar === i ? "text-[#006B5D] font-bold" : "text-slate-500"}`}>{b.day}</span>
//                   </div>
//                 ))
//               )}
//             </div>

//             <div className="mt-6 pt-4 border-t border-[#E4E9EF] grid grid-cols-2 gap-4">
//               <div className="text-center">
//                 <p className="text-xs text-slate-400">إجمالي الفترة</p>
//                 <p className="font-bold text-[#0D1F3C]">{totalCurr.toLocaleString("ar-SA")} ر.س</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-xs text-slate-400">متوسط يومي</p>
//                 <p className="font-bold text-[#006B5D]">{chartData.length > 0 ? Math.round(totalCurr / chartData.length).toLocaleString("ar-SA") : 0} ر.س</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           <div className="bg-[#0D1F3C] p-6 rounded-2xl text-white">
//             <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "Cairo, sans-serif" }}>إجراءات سريعة</h3>
//             <div className="grid grid-cols-2 gap-3">
//               <button onClick={() => setPage("orders")} className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex flex-col items-center gap-2 transition-colors">
//                 <span className="material-symbols-outlined">inbox</span>
//                 <span className="text-xs">الطلبات الواردة</span>
//               </button>
//               <button onClick={() => setPage("services")} className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex flex-col items-center gap-2 transition-colors">
//                 <span className="material-symbols-outlined">list_alt</span>
//                 <span className="text-xs">إدارة الخدمات</span>
//               </button>
//               <button onClick={() => setPage("discounts")} className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex flex-col items-center gap-2 transition-colors col-span-2">
//                 <span className="material-symbols-outlined">payments</span>
//                 <span className="text-xs">الخصومات والتسعير</span>
//               </button>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#C5C6CE]/20 space-y-6">
//             <h3 className="text-lg font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>حالة التشغيل</h3>
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <div className="flex justify-between text-xs">
//                   <span className="text-slate-500">سعة المغسلة الحالية</span>
//                   <span className="font-bold">{capacityPct}٪</span>
//                 </div>
//                 <div className="h-2 w-full bg-[#DEE3E9] rounded-full overflow-hidden">
//                   <div className="h-full bg-[#006B5D] rounded-full transition-all" style={{ width: `${capacityPct}%` }} />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <div className="flex justify-between text-xs">
//                   <span className="text-slate-500">جاهز للتوصيل</span>
//                   <span className="font-bold">{(stats.ready ?? 0) + (stats.delivering ?? 0)} طلب</span>
//                 </div>
//                 <div className="h-2 w-full bg-[#DEE3E9] rounded-full overflow-hidden">
//                   <div className="h-full bg-orange-400 rounded-full transition-all"
//                     style={{ width: `${Math.min(100, (((stats.ready ?? 0) + (stats.delivering ?? 0)) / Math.max(Object.values(stats).reduce((a: number, b) => a + (b as number), 0), 1)) * 100)}%` }}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="pt-4 border-t border-[#E9EEF4]">
//               <div className="flex items-center gap-4">
//                 <div className="bg-[#E9EEF4] p-3 rounded-xl">
//                   <span className="material-symbols-outlined text-[#006B5D]">local_shipping</span>
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold">{stats.delivering > 0 ? `${stats.delivering} مندوب` : "لا يوجد مناديب"}</p>
//                   <p className="text-xs text-slate-500">{stats.delivering > 0 ? "في الطريق" : "في انتظار الطلبات"}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }













import { useState } from "react";
import { useProvider } from "./context/ProviderContext";
import type { Page } from "./types";

interface Props {
  setPage: (p: Page) => void;
}

const DAY_LABELS: Record<string, string> = {
  "0": "الأحد", "1": "الاثنين", "2": "الثلاثاء",
  "3": "الأربعاء", "4": "الخميس", "5": "الجمعة", "6": "السبت",
};

export default function Dashboard({ setPage }: Props) {
  const {
    dashboardStats, fetchDashboard,
    pickupEnabled, setPickupEnabled,
    acceptOrder, rejectOrder, showToast, profile,
    setDefaultOrderTab,
  } = useProvider();

  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const stats = dashboardStats?.stats ?? { new: 0, processing: 0, ready: 0, delivering: 0, done: 0, cancelled: 0, revenue: 0 };
  const capacityPct = dashboardStats?.capacityPct ?? 0;
  const urgentOrders = (dashboardStats?.urgentOrders ?? []).slice(0, 2); // ← max 2
  const totalUrgent = dashboardStats?.urgentOrders?.length ?? 0;
  const revenueChart = dashboardStats?.revenueChart ?? [];

  const chartData = revenueChart.map((r: { date: string; revenue: number }) => {
    const d = new Date(r.date);
    return { day: DAY_LABELS[String(d.getDay())] ?? r.date, curr: r.revenue };
  });

  const totalCurr = chartData.reduce((a: number, b: { curr: number }) => a + b.curr, 0);
  const maxVal = Math.max(...chartData.map((b: { curr: number }) => b.curr), 1);

  // navigate to orders page with specific tab
  const goToOrders = (tab: string) => {
    setDefaultOrderTab(tab);
    setPage("orders");
  };

  const kpis = [
    { label: "طلبات جديدة",   value: String(stats.new),       icon: "add_shopping_cart", color: "border-[#006B5D]",  bg: "bg-[#5BF7DD]/30",    iconColor: "text-[#006B5D]",  tab: "new" },
    { label: "قيد التنفيذ",   value: String(stats.processing), icon: "sync",              color: "border-orange-400", bg: "bg-orange-100",      iconColor: "text-orange-500", tab: "processing" },
    { label: "مكتملة اليوم",  value: String(stats.done),       icon: "task_alt",          color: "border-teal-500",   bg: "bg-teal-100",        iconColor: "text-teal-600",   tab: "done" },
    { label: "إيرادات اليوم", value: `${stats.revenue.toLocaleString("ar-EG")} ج.م`, icon: "payments", color: "border-[#765B00]", bg: "bg-[#FFDF94]/50", iconColor: "text-[#765B00]", tab: "done" },
  ];

  const handleAccept = async (id: string) => {
    await acceptOrder(id);
    // fetchDashboard already called inside acceptOrder
  };

  const handleReject = async (id: string) => {
    await rejectOrder(id);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>
            لوحة تحكم {profile.businessName}
          </h2>
          <p className="text-slate-500 mt-1">مرحباً، هناك {stats.new} طلب جديد ينتظر مراجعتك</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Refresh button */}
          <button
            onClick={() => fetchDashboard()}
            className="p-2 rounded-full bg-[#EFF4FA] text-slate-500 hover:text-[#006B5D] hover:bg-[#006B5D]/10 transition-all"
            title="تحديث البيانات"
          >
            <span className="material-symbols-outlined text-xl">refresh</span>
          </button>
          {/* Pickup toggle */}
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
      </div>

      {/* KPI Cards — click goes to filtered orders */}
      <div className="grid grid-cols-4 gap-6">
        {kpis.map((k) => (
          <button
            key={k.label}
            onClick={() => goToOrders(k.tab)}
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

          {/* Urgent Orders — max 2 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>
                الطلبات العاجلة
                {totalUrgent > 0 && (
                  <span className="mr-2 text-sm bg-red-50 text-red-500 px-2 py-0.5 rounded-full font-bold">{totalUrgent}</span>
                )}
              </h2>
              <button onClick={() => goToOrders("new")} className="text-[#006B5D] text-sm hover:underline font-bold">
                عرض الكل
              </button>
            </div>
            {urgentOrders.length === 0 ? (
              <div className="bg-white p-8 rounded-xl text-center border border-[#C5C6CE]/20">
                <span className="material-symbols-outlined text-4xl text-slate-300 block mb-2">check_circle</span>
                <p className="text-slate-500 text-sm">لا توجد طلبات عاجلة حالياً</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  {urgentOrders.map((o: any) => (
                    <div key={o._id} className="bg-white p-5 rounded-xl shadow-sm border border-[#C5C6CE]/20 flex flex-col gap-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#E9EEF4] flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#0D1F3C]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                          </div>
                          <div>
                            <p className="font-bold text-sm">{o.client?.name ?? "عميل"}</p>
                            <p className="text-xs text-slate-500">{o.address?.address ?? ""}</p>
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
                          <span className="font-medium">
                            {o.itemsSummary?.totalQty > 0
                              ? `${o.itemsSummary.totalQty} قطعة (${o.itemsSummary.serviceNames?.join("، ")})`
                              : "—"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">السعر:</span>
                          <span className="font-medium">{o.total_price?.toLocaleString("ar-EG")} ج.م</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => handleAccept(o._id)} className="flex-1 bg-[#006B5D] text-white py-2 rounded-full text-sm font-bold hover:opacity-90 active:scale-95 transition-all">قبول الطلب</button>
                        <button onClick={() => handleReject(o._id)} className="flex-1 bg-[#E9EEF4] text-slate-500 py-2 rounded-full text-sm font-bold hover:bg-red-50 hover:text-red-600 active:scale-95 transition-all">رفض</button>
                      </div>
                    </div>
                  ))}
                </div>
                {totalUrgent > 2 && (
                  <button
                    onClick={() => goToOrders("new")}
                    className="mt-3 w-full py-2.5 bg-[#EFF4FA] text-[#006B5D] rounded-xl text-sm font-bold hover:bg-[#006B5D] hover:text-white transition-all"
                  >
                    عرض {totalUrgent - 2} طلبات إضافية
                  </button>
                )}
              </>
            )}
          </div>

          {/* Revenue Chart */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#C5C6CE]/20">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>تحليلات الإيرادات</h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-2xl font-bold text-[#0D1F3C]">
                    {totalCurr.toLocaleString("ar-EG")} <span className="text-sm text-slate-400">ج.م</span>
                  </span>
                </div>
              </div>
              <span className="text-xs text-slate-400">آخر ٧ أيام</span>
            </div>

            <div className="relative flex items-end justify-between h-52 gap-3 px-2">
              {chartData.length === 0 ? (
                <div className="w-full flex items-center justify-center text-slate-400 text-sm">لا توجد بيانات</div>
              ) : (
                chartData.map((b: { day: string; curr: number }, i: number) => (
                  <div
                    key={i}
                    className="flex flex-col items-center flex-1 gap-2 relative cursor-pointer"
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                    onClick={() => showToast(`${b.day}: ${b.curr.toLocaleString("ar-EG")} ج.م`, "info")}
                  >
                    {hoveredBar === i && (
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#0D1F3C] text-white text-xs px-3 py-2 rounded-xl whitespace-nowrap z-10 shadow-lg">
                        <p className="font-bold">{b.day}</p>
                        <p>{b.curr.toLocaleString("ar-EG")} ج.م</p>
                      </div>
                    )}
                    <div className="w-full flex justify-center items-end h-40">
                      <div
                        className={`bg-[#006B5D] w-6 rounded-t-md transition-all ${hoveredBar === i ? "bg-[#005046] scale-105" : ""}`}
                        style={{ height: `${(b.curr / maxVal) * 100}%`, minHeight: b.curr > 0 ? "4px" : "0" }}
                      />
                    </div>
                    <span className={`text-xs transition-colors ${hoveredBar === i ? "text-[#006B5D] font-bold" : "text-slate-500"}`}>{b.day}</span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[#E4E9EF] grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-xs text-slate-400">إجمالي الفترة</p>
                <p className="font-bold text-[#0D1F3C]">{totalCurr.toLocaleString("ar-EG")} ج.م</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-400">متوسط يومي</p>
                <p className="font-bold text-[#006B5D]">{chartData.length > 0 ? Math.round(totalCurr / chartData.length).toLocaleString("ar-EG") : 0} ج.م</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-[#0D1F3C] p-6 rounded-2xl text-white">
            <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "Cairo, sans-serif" }}>إجراءات سريعة</h3>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => goToOrders("new")} className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex flex-col items-center gap-2 transition-colors">
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
                  <span className="font-bold">{capacityPct}٪</span>
                </div>
                <div className="h-2 w-full bg-[#DEE3E9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#006B5D] rounded-full transition-all" style={{ width: `${capacityPct}%` }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">جاهز للتوصيل</span>
                  <span className="font-bold">{(stats.ready ?? 0) + (stats.delivering ?? 0)} طلب</span>
                </div>
                <div className="h-2 w-full bg-[#DEE3E9] rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (((stats.ready ?? 0) + (stats.delivering ?? 0)) / Math.max(Object.values(stats).reduce((a: number, b) => a + (b as number), 0), 1)) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-[#E9EEF4]">
              <div className="flex items-center gap-4">
                <div className="bg-[#E9EEF4] p-3 rounded-xl">
                  <span className="material-symbols-outlined text-[#006B5D]">local_shipping</span>
                </div>
                <div>
                  <p className="text-sm font-bold">{stats.delivering > 0 ? `${stats.delivering} مندوب` : "لا يوجد مناديب"}</p>
                  <p className="text-xs text-slate-500">{stats.delivering > 0 ? "في الطريق" : "في انتظار الطلبات"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}