import { useState } from "react"
import { useProvider } from "./context/ProviderContext"
import type { Page } from "./types"

interface Props {
  setPage: (p: Page) => void
}

const DAY_LABELS: Record<string, string> = {
  "0": "الأحد",
  "1": "الاثنين",
  "2": "الثلاثاء",
  "3": "الأربعاء",
  "4": "الخميس",
  "5": "الجمعة",
  "6": "السبت",
}

export default function Dashboard({ setPage }: Props) {
  const {
    dashboardStats,
    fetchDashboard,
    pickupEnabled,
    setPickupEnabled,
    acceptOrder,
    rejectOrder,
    showToast,
    profile,
    setDefaultOrderTab,
  } = useProvider()

  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  const stats = dashboardStats?.stats ?? {
    new: 0,
    processing: 0,
    ready: 0,
    delivering: 0,
    done: 0,
    cancelled: 0,
    revenue: 0,
  }
  const capacityPct = dashboardStats?.capacityPct ?? 0
  const urgentOrders = (dashboardStats?.urgentOrders ?? []).slice(0, 2) // ← max 2
  const totalUrgent = dashboardStats?.urgentOrders?.length ?? 0
  const revenueChart = dashboardStats?.revenueChart ?? []

  const chartData = revenueChart.map((r: { date: string; revenue: number }) => {
    const d = new Date(r.date)
    return { day: DAY_LABELS[String(d.getDay())] ?? r.date, curr: r.revenue }
  })

  const totalCurr = chartData.reduce(
    (a: number, b: { curr: number }) => a + b.curr,
    0
  )
  const maxVal = Math.max(...chartData.map((b: { curr: number }) => b.curr), 1)

  // navigate to orders page with specific tab
  const goToOrders = (tab: string) => {
    setDefaultOrderTab(tab)
    setPage("orders")
  }

  const kpis = [
    {
      label: "طلبات جديدة",
      value: String(stats.new),
      icon: "add_shopping_cart",
      color: "border-[#006B5D]",
      bg: "bg-[#5BF7DD]/30",
      iconColor: "text-[#006B5D]",
      tab: "new",
    },
    {
      label: "قيد التنفيذ",
      value: String(stats.processing),
      icon: "sync",
      color: "border-orange-400",
      bg: "bg-orange-100",
      iconColor: "text-orange-500",
      tab: "processing",
    },
    {
      label: "مكتملة اليوم",
      value: String(stats.done),
      icon: "task_alt",
      color: "border-teal-500",
      bg: "bg-teal-100",
      iconColor: "text-teal-600",
      tab: "done",
    },
    {
      label: "إيرادات اليوم",
      value: `${stats.revenue.toLocaleString("ar-EG")} ج.م`,
      icon: "payments",
      color: "border-[#765B00]",
      bg: "bg-[#FFDF94]/50",
      iconColor: "text-[#765B00]",
      tab: "done",
    },
  ]

  const handleAccept = async (id: string) => {
    await acceptOrder(id)
    // fetchDashboard already called inside acceptOrder
  }

  const handleReject = async (id: string) => {
    await rejectOrder(id)
  }

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-3xl font-bold text-[#0D1F3C]"
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            لوحة تحكم {profile.businessName}
          </h2>
          <p className="mt-1 text-slate-500">
            مرحباً، هناك {stats.new} طلب جديد ينتظر مراجعتك
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Refresh button */}
          <button
            onClick={() => fetchDashboard()}
            className="rounded-full bg-[#EFF4FA] p-2 text-slate-500 transition-all hover:bg-[#006B5D]/10 hover:text-[#006B5D]"
            title="تحديث البيانات"
          >
            <span className="material-symbols-outlined text-xl">refresh</span>
          </button>
          {/* Pickup toggle */}
          <div className="flex items-center gap-3 rounded-full bg-[#EFF4FA] px-4 py-2">
            <span className="text-sm text-slate-500">حالة الاستلام:</span>
            <button
              onClick={() => {
                setPickupEnabled(!pickupEnabled)
                showToast(
                  pickupEnabled
                    ? "تم إيقاف استقبال الطلبات"
                    : "تم تفعيل استقبال الطلبات"
                )
              }}
              className={`relative h-6 w-11 rounded-full shadow-inner transition-all ${pickupEnabled ? "bg-[#006B5D]" : "bg-slate-200"}`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${pickupEnabled ? "left-1" : "right-1"}`}
              />
            </button>
            <span
              className={`text-xs font-bold ${pickupEnabled ? "text-[#006B5D]" : "text-slate-400"}`}
            >
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
            className={`flex items-center justify-between rounded-xl border-b-4 bg-white p-6 ${k.color} w-full text-right shadow-sm transition-all hover:shadow-md`}
          >
            <div>
              <p className="mb-1 text-sm text-slate-500">{k.label}</p>
              <h3
                className="text-3xl font-bold text-[#0D1F3C]"
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                {k.value}
              </h3>
            </div>
            <div
              className={`h-14 w-14 rounded-full ${k.bg} flex items-center justify-center`}
            >
              <span
                className={`material-symbols-outlined ${k.iconColor} text-3xl`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {k.icon}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          {/* Urgent Orders — max 2 */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2
                className="text-xl font-bold text-[#0D1F3C]"
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                الطلبات العاجلة
                {totalUrgent > 0 && (
                  <span className="mr-2 rounded-full bg-red-50 px-2 py-0.5 text-sm font-bold text-red-500">
                    {totalUrgent}
                  </span>
                )}
              </h2>
              <button
                onClick={() => goToOrders("new")}
                className="text-sm font-bold text-[#006B5D] hover:underline"
              >
                عرض الكل
              </button>
            </div>
            {urgentOrders.length === 0 ? (
              <div className="rounded-xl border border-[#C5C6CE]/20 bg-white p-8 text-center">
                <span className="material-symbols-outlined mb-2 block text-4xl text-slate-300">
                  check_circle
                </span>
                <p className="text-sm text-slate-500">
                  لا توجد طلبات عاجلة حالياً
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  {urgentOrders.map((o: any) => (
                    <div
                      key={o._id}
                      className="flex flex-col gap-4 rounded-xl border border-[#C5C6CE]/20 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E9EEF4]">
                            <span
                              className="material-symbols-outlined text-[#0D1F3C]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              person
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-bold">
                              {o.client?.name ?? "عميل"}
                            </p>
                            <p className="text-xs text-slate-500">
                              {o.address?.address ?? ""}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-red-600">
                          <span className="material-symbols-outlined text-sm">
                            timer
                          </span>
                          <span className="text-xs font-bold">مستعجل</span>
                        </div>
                      </div>
                      <div className="space-y-2 border-y border-[#E9EEF4] py-2">
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
                          <span className="font-medium">
                            {o.total_price?.toLocaleString("ar-EG")} ج.م
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleAccept(o._id)}
                          className="flex-1 rounded-full bg-[#006B5D] py-2 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
                        >
                          قبول الطلب
                        </button>
                        <button
                          onClick={() => handleReject(o._id)}
                          className="flex-1 rounded-full bg-[#E9EEF4] py-2 text-sm font-bold text-slate-500 transition-all hover:bg-red-50 hover:text-red-600 active:scale-95"
                        >
                          رفض
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {totalUrgent > 2 && (
                  <button
                    onClick={() => goToOrders("new")}
                    className="mt-3 w-full rounded-xl bg-[#EFF4FA] py-2.5 text-sm font-bold text-[#006B5D] transition-all hover:bg-[#006B5D] hover:text-white"
                  >
                    عرض {totalUrgent - 2} طلبات إضافية
                  </button>
                )}
              </>
            )}
          </div>

          {/* Revenue Chart */}
          <div className="rounded-2xl border border-[#C5C6CE]/20 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2
                  className="text-xl font-bold text-[#0D1F3C]"
                  style={{ fontFamily: "Cairo, sans-serif" }}
                >
                  تحليلات الإيرادات
                </h2>
                <div className="mt-2 flex items-center gap-4">
                  <span className="text-2xl font-bold text-[#0D1F3C]">
                    {totalCurr.toLocaleString("ar-EG")}{" "}
                    <span className="text-sm text-slate-400">ج.م</span>
                  </span>
                </div>
              </div>
              <span className="text-xs text-slate-400">آخر ٧ أيام</span>
            </div>

            <div className="relative flex h-52 items-end justify-between gap-3 px-2">
              {chartData.length === 0 ? (
                <div className="flex w-full items-center justify-center text-sm text-slate-400">
                  لا توجد بيانات
                </div>
              ) : (
                chartData.map((b: { day: string; curr: number }, i: number) => (
                  <div
                    key={i}
                    className="relative flex flex-1 cursor-pointer flex-col items-center gap-2"
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                    onClick={() =>
                      showToast(
                        `${b.day}: ${b.curr.toLocaleString("ar-EG")} ج.م`,
                        "info"
                      )
                    }
                  >
                    {hoveredBar === i && (
                      <div className="absolute -top-12 left-1/2 z-10 -translate-x-1/2 rounded-xl bg-[#0D1F3C] px-3 py-2 text-xs whitespace-nowrap text-white shadow-lg">
                        <p className="font-bold">{b.day}</p>
                        <p>{b.curr.toLocaleString("ar-EG")} ج.م</p>
                      </div>
                    )}
                    <div className="flex h-40 w-full items-end justify-center">
                      <div
                        className={`w-6 rounded-t-md bg-[#006B5D] transition-all ${hoveredBar === i ? "scale-105 bg-[#005046]" : ""}`}
                        style={{
                          height: `${(b.curr / maxVal) * 100}%`,
                          minHeight: b.curr > 0 ? "4px" : "0",
                        }}
                      />
                    </div>
                    <span
                      className={`text-xs transition-colors ${hoveredBar === i ? "font-bold text-[#006B5D]" : "text-slate-500"}`}
                    >
                      {b.day}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#E4E9EF] pt-4">
              <div className="text-center">
                <p className="text-xs text-slate-400">إجمالي الفترة</p>
                <p className="font-bold text-[#0D1F3C]">
                  {totalCurr.toLocaleString("ar-EG")} ج.م
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-400">متوسط يومي</p>
                <p className="font-bold text-[#006B5D]">
                  {chartData.length > 0
                    ? Math.round(totalCurr / chartData.length).toLocaleString(
                        "ar-EG"
                      )
                    : 0}{" "}
                  ج.م
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-[#0D1F3C] p-6 text-white">
            <h3
              className="mb-4 text-lg font-bold"
              style={{ fontFamily: "Cairo, sans-serif" }}
            >
              إجراءات سريعة
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => goToOrders("new")}
                className="flex flex-col items-center gap-2 rounded-xl bg-white/10 p-4 transition-colors hover:bg-white/20"
              >
                <span className="material-symbols-outlined">inbox</span>
                <span className="text-xs">الطلبات الواردة</span>
              </button>
              <button
                onClick={() => setPage("services")}
                className="flex flex-col items-center gap-2 rounded-xl bg-white/10 p-4 transition-colors hover:bg-white/20"
              >
                <span className="material-symbols-outlined">list_alt</span>
                <span className="text-xs">إدارة الخدمات</span>
              </button>
              <button
                onClick={() => setPage("discounts")}
                className="col-span-2 flex flex-col items-center gap-2 rounded-xl bg-white/10 p-4 transition-colors hover:bg-white/20"
              >
                <span className="material-symbols-outlined">payments</span>
                <span className="text-xs">الخصومات والتسعير</span>
              </button>
            </div>
          </div>

          <div className="space-y-6 rounded-2xl border border-[#C5C6CE]/20 bg-white p-6 shadow-sm">
            <h3
              className="text-lg font-bold text-[#0D1F3C]"
              style={{ fontFamily: "Cairo, sans-serif" }}
            >
              حالة التشغيل
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">سعة المغسلة الحالية</span>
                  <span className="font-bold">{capacityPct}٪</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#DEE3E9]">
                  <div
                    className="h-full rounded-full bg-[#006B5D] transition-all"
                    style={{ width: `${capacityPct}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">جاهز للتوصيل</span>
                  <span className="font-bold">
                    {(stats.ready ?? 0) + (stats.delivering ?? 0)} طلب
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#DEE3E9]">
                  <div
                    className="h-full rounded-full bg-orange-400 transition-all"
                    style={{
                      width: `${Math.min(
                        100,
                        (((stats.ready ?? 0) + (stats.delivering ?? 0)) /
                          Math.max(
                            Object.values(stats).reduce(
                              (a: number, b) => a + (b as number),
                              0
                            ),
                            1
                          )) *
                          100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="border-t border-[#E9EEF4] pt-4">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-[#E9EEF4] p-3">
                  <span className="material-symbols-outlined text-[#006B5D]">
                    local_shipping
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold">
                    {stats.delivering > 0
                      ? `${stats.delivering} مندوب`
                      : "لا يوجد مناديب"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {stats.delivering > 0 ? "في الطريق" : "في انتظار الطلبات"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
