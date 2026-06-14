import { useState, useEffect, type ReactNode } from "react"
import { useProvider } from "./context/ProviderContext"
import type { Order, OrderStatus } from "./types"
import { ORDER_STATUS_LABELS } from "./types"

type Tab = "all" | OrderStatus

const STATUS_STYLE: Record<
  OrderStatus,
  { bg: string; color: string; border: string }
> = {
  new: {
    bg: "bg-[#00C9B1]/10",
    color: "text-[#006B5D]",
    border: "border-[#00C9B1]",
  },
  processing: {
    bg: "bg-[#765B00]/10",
    color: "text-[#765B00]",
    border: "border-[#765B00]",
  },
  ready: {
    bg: "bg-[#E9EEF4]",
    color: "text-slate-500",
    border: "border-slate-300",
  },
  delivering: {
    bg: "bg-blue-50",
    color: "text-blue-600",
    border: "border-blue-400",
  },
  done: {
    bg: "bg-emerald-50",
    color: "text-emerald-600",
    border: "border-emerald-400",
  },
  cancelled: {
    bg: "bg-red-50",
    color: "text-red-500",
    border: "border-red-300",
  },
}

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus[]>> = {
  processing: ["ready", "cancelled"],
  ready: ["delivering", "done"],
  delivering: ["done"],
}

export default function Orders() {
  const {
    orders,
    orderStats,
    acceptOrder,
    rejectOrder,
    updateOrderStatus,
    showToast,
    fetchOrderDetails,
    defaultOrderTab,
    setDefaultOrderTab,
  } = useProvider()

  const [activeTab, setActiveTab] = useState<Tab>(
    (defaultOrderTab as Tab) || "all"
  )
  const [activeCategory, setActiveCategory] = useState<string | "all">("all")
  const [selectedId, setSelectedId] = useState("")
  const [showFilter, setShowFilter] = useState(false)

  // auto-select first order and fetch its details when orders load
  useEffect(() => {
    if (orders.length > 0 && !selectedId) {
      const firstId = orders[0].id
      setSelectedId(firstId)
      fetchOrderDetails(firstId)
    }
  }, [orders.length])

  // reset defaultOrderTab after using it
  useEffect(() => {
    return () => setDefaultOrderTab("all")
  }, [])

  const handleSelectOrder = (id: string) => {
    setSelectedId(id)
    fetchOrderDetails(id)
  }

  const tabs: {
    id: Tab
    label: string
    count?: number
    countColor?: string
  }[] = [
    { id: "all", label: "الكل" },
    {
      id: "new",
      label: "جديد",
      count: orderStats.new,
      countColor: "bg-[#00C9B1]",
    },
    {
      id: "processing",
      label: "قيد المعالجة",
      count: orderStats.processing,
      countColor: "bg-[#765B00]",
    },
    { id: "ready", label: "جاهز" },
    { id: "delivering", label: "خارج للتوصيل" },
    { id: "done", label: "مكتمل" },
    { id: "cancelled", label: "ملغي" },
  ]

  // derive unique service names from all loaded order items
  const allServiceNames = [
    ...new Set(orders.flatMap((o) => o.itemsList.map((i) => i.name))),
  ].filter(Boolean)

  const filtered = orders.filter((o) => {
    const tabMatch = activeTab === "all" || o.status === activeTab
    const catMatch =
      activeCategory === "all" ||
      o.itemsList.some((i) => i.name === activeCategory)
    return tabMatch && catMatch
  })

  const selectedOrder = orders.find((o) => o.id === selectedId) ?? filtered[0]

  const downloadReport = () => {
    const report = orders
      .map(
        (o) =>
          `${o.id} | ${o.customerName} | ${ORDER_STATUS_LABELS[o.status]} | ${o.price} ر.س`
      )
      .join("\n")
    const blob = new Blob([report], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "تقرير-الطلبات.txt"
    a.click()
    showToast("تم تحميل تقرير اليوم")
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2
            className="text-3xl font-bold text-[#0D1F3C]"
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            إدارة طلبات المغسلة
          </h2>
          <p className="mt-1 text-slate-500">
            لديك {orderStats.new} طلبات جديدة تحتاج للمراجعة اليوم
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`flex items-center gap-2 rounded-full border px-6 py-2 text-sm font-medium transition-colors ${
              showFilter
                ? "border-[#006B5D] bg-[#006B5D] text-white"
                : "border-[#C5C6CE]/40 text-[#0D1F3C] hover:bg-[#E9EEF4]"
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              filter_list
            </span>
            تصفية متقدمة
          </button>
          <button
            onClick={downloadReport}
            className="flex items-center gap-2 rounded-full bg-[#0D1F3C] px-6 py-2 text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">download</span>
            تقرير اليوم
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Category Sidebar */}
        <aside className="w-56 flex-shrink-0 space-y-2">
          <div className="rounded-2xl border border-[#0D1F3C]/5 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0D1F3C]">التصنيفات</h3>
            </div>
            {/* الكل */}
            <button
              onClick={() => setActiveCategory("all")}
              className={`mb-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-all ${
                activeCategory === "all"
                  ? "bg-[#EFF4FA] font-bold text-[#006B5D]"
                  : "text-slate-500 hover:bg-[#EFF4FA]/50"
              }`}
            >
              <span className="material-symbols-outlined text-lg">apps</span>
              الكل
              <span className="mr-auto text-xs">{orders.length}</span>
            </button>
            {/* dynamic service names */}
            {allServiceNames.map((name) => (
              <button
                key={name}
                onClick={() => setActiveCategory(name)}
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-all ${
                  activeCategory === name
                    ? "bg-[#EFF4FA] font-bold text-[#006B5D]"
                    : "text-slate-500 hover:bg-[#EFF4FA]/50"
                }`}
              >
                <span className="material-symbols-outlined text-lg">
                  dry_cleaning
                </span>
                {name}
                <span className="mr-auto text-xs">
                  {
                    orders.filter((o) =>
                      o.itemsList.some((i) => i.name === name)
                    ).length
                  }
                </span>
              </button>
            ))}
            {allServiceNames.length === 0 && (
              <p className="py-2 text-center text-xs text-slate-400">
                اضغط على طلب لتحميل التصنيفات
              </p>
            )}
          </div>
        </aside>

        <div className="flex-1">
          {/* Tabs */}
          <div className="mb-6 flex w-max flex-wrap items-center gap-1 rounded-full bg-[#EFF4FA] p-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm transition-all ${
                  activeTab === t.id
                    ? "bg-white font-bold text-[#006B5D] shadow-sm"
                    : "font-medium text-slate-500 hover:text-[#006B5D]"
                }`}
              >
                {t.label}
                {t.count !== undefined && t.count > 0 && (
                  <span
                    className={`${t.countColor} rounded-full px-1.5 py-0.5 text-[10px] text-white`}
                  >
                    {t.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {showFilter && (
            <div className="mb-6 flex items-center gap-4 rounded-xl border border-[#E4E9EF] bg-white p-4">
              <span className="text-sm text-slate-500">تصفية حسب:</span>
              <select className="rounded-full bg-[#EFF4FA] px-4 py-2 text-sm outline-none">
                <option>كل الحالات</option>
                {Object.entries(ORDER_STATUS_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowFilter(false)}
                className="mr-auto text-xs font-bold text-[#006B5D]"
              >
                إغلاق
              </button>
            </div>
          )}

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8 space-y-4">
              {filtered.length === 0 ? (
                <div className="rounded-xl bg-white p-12 text-center">
                  <span className="material-symbols-outlined mb-3 block text-5xl text-slate-300">
                    inbox
                  </span>
                  <p className="font-bold text-[#0D1F3C]">لا توجد طلبات</p>
                  <p className="mt-1 text-sm text-slate-400">
                    جرب تغيير التصفية أو أضف طلباً جديداً
                  </p>
                </div>
              ) : (
                filtered.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    selected={selectedOrder?.id === order.id}
                    onSelect={() => handleSelectOrder(order.id)}
                    onAccept={() => acceptOrder(order.id)}
                    onReject={() => rejectOrder(order.id)}
                    onStatusChange={(s) => updateOrderStatus(order.id, s)}
                  />
                ))
              )}
            </div>

            {selectedOrder && (
              <div className="col-span-4">
                <OrderDetail
                  order={selectedOrder}
                  onClose={() => setSelectedId("")}
                  onAccept={() => acceptOrder(selectedOrder.id)}
                  onReject={() => rejectOrder(selectedOrder.id)}
                  onStatusChange={(s) => updateOrderStatus(selectedOrder.id, s)}
                  showToast={showToast}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderCard({
  order,
  selected,
  onSelect,
  onAccept,
  onReject,
  onStatusChange,
}: {
  order: Order
  selected: boolean
  onSelect: () => void
  onAccept: () => void
  onReject: () => void
  onStatusChange: (s: OrderStatus) => void
}) {
  const style = STATUS_STYLE[order.status]
  const nextOptions = NEXT_STATUS[order.status] ?? []

  return (
    <div
      onClick={onSelect}
      className={`rounded-xl border-r-4 bg-white p-6 shadow-sm ${style.border} cursor-pointer transition-shadow hover:shadow-md ${
        selected ? "ring-2 ring-[#006B5D]/30" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E9EEF4]">
            <span
              className="material-symbols-outlined text-[#0D1F3C]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              person
            </span>
          </div>
          <div>
            <div className="mb-1 flex items-center gap-2">
              <h3
                className="text-lg font-bold text-[#0D1F3C]"
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                {order.customerName}
              </h3>
              {order.tag && (
                <span className="flex items-center gap-1 rounded-full border border-[#765B00]/20 bg-[#765B00]/10 px-2 py-0.5 text-[10px] font-bold text-[#765B00]">
                  <span
                    className="material-symbols-outlined text-xs"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    handshake
                  </span>
                  {order.tag}
                </span>
              )}
              {order.urgent && (
                <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600">
                  مستعجل
                </span>
              )}
            </div>
            <p className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">
                  inventory_2
                </span>
                {order.items}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">
                  schedule
                </span>
                {order.time}
              </span>
            </p>
          </div>
        </div>
        <div className="text-left">
          <span
            className={`${style.bg} ${style.color} rounded-full px-3 py-1 text-xs font-bold`}
          >
            {ORDER_STATUS_LABELS[order.status]}
          </span>
          <p className="mt-2 text-lg font-bold text-[#0D1F3C]">
            {order.price.toFixed(2)} ر.س
          </p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-[#E9EEF4] pt-6">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="material-symbols-outlined text-sm">location_on</span>
          {order.location}
        </div>
        <div className="flex gap-3">
          {order.status === "new" && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onReject()
                }}
                className="rounded-full border border-red-200 px-6 py-2 text-sm font-bold text-red-600 hover:bg-red-50"
              >
                رفض الطلب
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onAccept()
                }}
                className="rounded-full bg-[#006B5D] px-6 py-2 text-sm font-bold text-white hover:bg-[#0D1F3C]"
              >
                قبول الطلب
              </button>
            </>
          )}
          {nextOptions.length > 0 && (
            <select
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => onStatusChange(e.target.value as OrderStatus)}
              defaultValue=""
              className="rounded-full border-none bg-[#EFF4FA] px-4 py-2 text-xs font-bold text-[#0D1F3C] outline-none"
            >
              <option value="" disabled>
                تغيير الحالة
              </option>
              {nextOptions.map((s) => (
                <option key={s} value={s}>
                  {ORDER_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          )}
          {order.status === "ready" && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onStatusChange("delivering")
              }}
              className="rounded-full border border-[#0D1F3C]/20 px-6 py-2 text-sm font-bold text-[#0D1F3C] hover:bg-[#0D1F3C] hover:text-white"
            >
              تحديد موعد التوصيل
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function OrderDetail({
  order,
  onClose,
  onAccept,
  onReject,
  onStatusChange,
  showToast,
}: {
  order: Order
  onClose: () => void
  onAccept: () => void
  onReject: () => void
  onStatusChange: (s: OrderStatus) => void
  showToast: (msg: string) => void
}) {
  return (
    <div className="sticky top-28 rounded-2xl border border-[#E9EEF4] bg-white p-8 shadow-xl">
      <div className="mb-6 flex items-center justify-between">
        <h3
          className="text-xl font-bold text-[#0D1F3C]"
          style={{ fontFamily: "Cairo, sans-serif" }}
        >
          تفاصيل الطلب #{order.id}
        </h3>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-[#0D1F3C]"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="mb-8 flex items-center gap-4 rounded-xl bg-[#EFF4FA] p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E9EEF4]">
          <span
            className="material-symbols-outlined text-[#0D1F3C]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            person
          </span>
        </div>
        <div>
          <h4 className="font-bold text-[#0D1F3C]">{order.customerName}</h4>
          <p className="text-xs text-slate-500">{order.phone}</p>
          <div className="mt-1 flex gap-3">
            <button
              onClick={() => showToast(`جاري الاتصال بـ ${order.phone}`)}
              className="text-[#006B5D] transition-transform hover:scale-110"
            >
              <span className="material-symbols-outlined text-lg">call</span>
            </button>
            <button
              onClick={() => showToast("فتح المحادثة")}
              className="text-[#006B5D] transition-transform hover:scale-110"
            >
              <span className="material-symbols-outlined text-lg">chat</span>
            </button>
            <button
              onClick={() => showToast("فتح الخريطة")}
              className="text-[#006B5D] transition-transform hover:scale-110"
            >
              <span className="material-symbols-outlined text-lg">map</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8 space-y-4">
        <h5 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
          قائمة الأصناف
        </h5>
        {order.itemsList.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-[#0D1F3C]">{item.name}</span>
            <span className="font-bold">{item.qty}</span>
          </div>
        ))}
      </div>

      {order.notes && (
        <div className="mb-8">
          <h5 className="mb-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
            ملاحظات العميل
          </h5>
          <p className="rounded-lg border-r-2 border-[#765B00] bg-[#765B00]/5 p-3 text-sm text-[#0D1F3C]">
            {order.notes}
          </p>
        </div>
      )}

      <div className="mb-8">
        <h5 className="mb-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
          العنوان
        </h5>
        <p className="flex items-start gap-2 text-sm text-[#0D1F3C]">
          <span className="material-symbols-outlined mt-0.5 text-lg text-[#006B5D]">
            location_on
          </span>
          {order.address}
        </p>
      </div>

      <div className="space-y-3 border-t border-[#E9EEF4] pt-6">
        <button
          onClick={() => showToast("جاري تحميل الفاتورة...")}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#E9EEF4] py-3 text-sm font-bold text-[#0D1F3C] hover:bg-[#E4E9EF]"
        >
          <span className="material-symbols-outlined text-lg">download</span>
          تحميل الفاتورة (PDF)
        </button>
        {order.status === "new" && (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onReject}
              className="rounded-full border border-red-200 py-3 text-sm font-bold text-red-600 hover:bg-red-50"
            >
              رفض
            </button>
            <button
              onClick={onAccept}
              className="rounded-full bg-[#006B5D] py-3 text-sm font-bold text-white hover:opacity-90"
            >
              قبول الآن
            </button>
          </div>
        )}
        {order.status === "processing" && (
          <button
            onClick={() => onStatusChange("ready")}
            className="w-full rounded-full bg-[#006B5D] py-3 text-sm font-bold text-white"
          >
            تحديد كـ جاهز
          </button>
        )}
        {order.status === "ready" && (
          <button
            onClick={() => onStatusChange("delivering")}
            className="w-full rounded-full bg-[#006B5D] py-3 text-sm font-bold text-white"
          >
            إرسال للتوصيل
          </button>
        )}
      </div>
    </div>
  )
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: ReactNode
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#0D1F3C]/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h3
            className="text-lg font-bold text-[#0D1F3C]"
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-[#0D1F3C]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
