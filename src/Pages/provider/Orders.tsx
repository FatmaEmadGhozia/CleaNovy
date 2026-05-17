import { useState } from "react";

type Tab = "all" | "new" | "processing" | "ready" | "delivering" | "done" | "cancelled";

const tabs: { id: Tab; label: string; count?: number; countColor?: string }[] = [
  { id: "all", label: "الكل" },
  { id: "new", label: "جديد", count: 5, countColor: "bg-[#00C9B1]" },
  { id: "processing", label: "قيد المعالجة", count: 12, countColor: "bg-[#765B00]" },
  { id: "ready", label: "جاهز" },
  { id: "delivering", label: "خارج للتوصيل" },
  { id: "done", label: "مكتمل" },
  { id: "cancelled", label: "ملغي" },
];

const orders = [
  {
    id: "ORD-8821",
    name: "عبدالله العتيبي",
    tag: "محول من مغسلة الفجر",
    items: "15 قطعة (غسيل وكوي)",
    time: "الاستلام: اليوم، 4:00 م",
    price: "145.00 ر.س",
    status: "طلب جديد",
    statusBg: "bg-[#00C9B1]/10",
    statusColor: "text-[#006B5D]",
    border: "border-[#00C9B1]",
    location: "يبعد 3.2 كم • حي النرجس، الرياض",
    showAccept: true,
  },
  {
    id: "ORD-8820",
    name: "سارة الغامدي",
    tag: null,
    items: "8 قطع (تنظيف جاف)",
    time: "الاستلام: 22 مايو، 11:00 ص",
    price: "89.00 ر.س",
    status: "قيد المعالجة",
    statusBg: "bg-[#765B00]/10",
    statusColor: "text-[#765B00]",
    border: "border-[#765B00]",
    location: "يبعد 1.5 كم • حي الملقا، الرياض",
    showAccept: false,
  },
  {
    id: "ORD-8819",
    name: "خالد الشمري",
    tag: null,
    items: "22 قطعة (شامل)",
    time: "الاستلام: أمس",
    price: "210.00 ر.س",
    status: "جاهز للتسليم",
    statusBg: "bg-[#E9EEF4]",
    statusColor: "text-slate-500",
    border: "border-slate-300",
    location: "يبعد 5.8 كم • حي الياسمين، الرياض",
    showAccept: false,
  },
];

export default function Orders() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [selectedOrder, setSelectedOrder] = useState(orders[0]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>إدارة طلبات المغسلة</h2>
          <p className="text-slate-500 mt-1">لديك 5 طلبات جديدة تحتاج للمراجعة اليوم</p>
        </div>
        <div className="flex gap-2">
          <button className="px-6 py-2 rounded-full border border-[#C5C6CE]/40 text-[#0D1F3C] font-medium text-sm flex items-center gap-2 hover:bg-[#E9EEF4] transition-colors">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            تصفية متقدمة
          </button>
          <button className="px-6 py-2 rounded-full bg-[#0D1F3C] text-white font-medium text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-lg">download</span>
            تقرير اليوم
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-8 bg-[#EFF4FA] p-1 rounded-full w-max">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-5 py-2 rounded-full text-sm flex items-center gap-2 transition-all ${
              activeTab === t.id
                ? "bg-white text-[#006B5D] font-bold shadow-sm"
                : "text-slate-500 hover:text-[#006B5D] font-medium"
            }`}
          >
            {t.label}
            {t.count && (
              <span className={`${t.countColor} text-white text-[10px] px-1.5 py-0.5 rounded-full`}>{t.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Orders List */}
        <div className="col-span-8 space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className={`bg-white p-6 rounded-xl shadow-sm border-r-4 ${order.border} hover:shadow-md transition-shadow cursor-pointer`}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#E9EEF4] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#0D1F3C]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>{order.name}</h3>
                      {order.tag && (
                        <span className="bg-[#765B00]/10 text-[#765B00] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#765B00]/20">
                          <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>handshake</span>
                          {order.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">inventory_2</span>
                        {order.items}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {order.time}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="text-left">
                  <span className={`${order.statusBg} ${order.statusColor} text-xs font-bold px-3 py-1 rounded-full`}>{order.status}</span>
                  <p className="text-lg font-bold text-[#0D1F3C] mt-2">{order.price}</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-[#E9EEF4] flex justify-between items-center">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {order.location}
                </div>
                <div className="flex gap-3">
                  {order.showAccept ? (
                    <>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="px-6 py-2 rounded-full border border-red-200 text-red-600 text-sm font-bold hover:bg-red-50 transition-colors"
                      >
                        رفض الطلب
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="px-6 py-2 rounded-full bg-[#006B5D] text-white text-sm font-bold hover:bg-[#0D1F3C] transition-all"
                      >
                        قبول الطلب
                      </button>
                    </>
                  ) : order.status === "قيد المعالجة" ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">تغيير الحالة:</span>
                      <select
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#EFF4FA] border-none rounded-full text-xs font-bold text-[#0D1F3C] px-4 py-2 focus:ring-2 focus:ring-[#0D1F3C]/10 outline-none"
                      >
                        <option>قيد المعالجة</option>
                        <option>جاهز للتوصيل</option>
                        <option>مكتمل</option>
                      </select>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="px-6 py-2 rounded-full border border-[#0D1F3C]/20 text-[#0D1F3C] text-sm font-bold hover:bg-[#0D1F3C] hover:text-white transition-all"
                    >
                      تحديد موعد التوصيل
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Detail Panel */}
        <div className="col-span-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-28 border border-[#E9EEF4]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>
                تفاصيل الطلب #{selectedOrder.id}
              </h3>
              <button className="text-slate-400 hover:text-[#0D1F3C] transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Customer */}
            <div className="flex items-center gap-4 mb-8 bg-[#EFF4FA] p-4 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-[#E9EEF4] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#0D1F3C]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
              </div>
              <div>
                <h4 className="font-bold text-[#0D1F3C]">{selectedOrder.name}</h4>
                <div className="flex gap-3 mt-1">
                  <button className="text-[#006B5D] hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-lg">call</span>
                  </button>
                  <button className="text-[#006B5D] hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-lg">chat</span>
                  </button>
                  <button className="text-[#006B5D] hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-lg">map</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-4 mb-8">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">قائمة الأصناف</h5>
              {[
                { name: "ثوب سعودي (غسيل وكوي)", qty: "× 10" },
                { name: "شماغ (كوي بخار)", qty: "× 2" },
                { name: "بدلة رسمية (تنظيف جاف)", qty: "× 3" },
              ].map((item) => (
                <div key={item.name} className="flex justify-between items-center text-sm">
                  <span className="text-[#0D1F3C]">{item.name}</span>
                  <span className="font-bold">{item.qty}</span>
                </div>
              ))}
            </div>

            {/* Notes */}
            <div className="mb-8">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">ملاحظات العميل</h5>
              <p className="text-sm text-[#0D1F3C] bg-[#765B00]/5 p-3 rounded-lg border-r-2 border-[#765B00]">
                يرجى الانتباه للأزرار في البدلة الرمادية، واستخدام نشاء خفيف للثياب.
              </p>
            </div>

            {/* Address */}
            <div className="mb-8">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">العنوان</h5>
              <p className="text-sm text-[#0D1F3C] flex items-start gap-2">
                <span className="material-symbols-outlined text-[#006B5D] text-lg mt-0.5">location_on</span>
                الرياض، حي النرجس، شارع رقم 12، فيلا رقم 4، بجانب مسجد عمر بن الخطاب.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-6 border-t border-[#E9EEF4]">
              <button className="w-full py-3 rounded-full bg-[#E9EEF4] text-[#0D1F3C] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#E4E9EF] transition-colors">
                <span className="material-symbols-outlined text-lg">download</span>
                تحميل الفاتورة (PDF)
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 rounded-full border border-red-200 text-red-600 font-bold text-sm hover:bg-red-50">رفض</button>
                <button className="py-3 rounded-full bg-[#006B5D] text-white font-bold text-sm hover:opacity-90">قبول الآن</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAB */}
      <div className="fixed bottom-8 left-8 z-50">
        <button className="w-14 h-14 rounded-full bg-[#00C9B1] text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
          <span className="material-symbols-outlined">support_agent</span>
        </button>
      </div>
    </div>
  );
}