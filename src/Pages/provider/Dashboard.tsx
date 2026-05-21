const kpis = [
  { label: "طلبات جديدة", value: "١٢", icon: "add_shopping_cart", color: "border-[#006B5D]", bg: "bg-[#5BF7DD]/30", iconColor: "text-[#006B5D]" },
  { label: "قيد التنفيذ", value: "٠٨", icon: "sync", color: "border-orange-400", bg: "bg-orange-100", iconColor: "text-orange-500" },
  { label: "مكتملة اليوم", value: "٤٥", icon: "task_alt", color: "border-teal-500", bg: "bg-teal-100", iconColor: "text-teal-600" },
  { label: "إيرادات اليوم", value: "٢,٤٥٠ ر.س", icon: "payments", color: "border-[#765B00]", bg: "bg-[#FFDF94]/50", iconColor: "text-[#765B00]" },
];

const bars = [
  { day: "الأحد", prev: 40, curr: 60 },
  { day: "الاثنين", prev: 55, curr: 75 },
  { day: "الثلاثاء", prev: 30, curr: 85 },
  { day: "الأربعاء", prev: 60, curr: 50 },
  { day: "الخميس", prev: 45, curr: 90 },
  { day: "الجمعة", prev: 70, curr: 65 },
  { day: "السبت", prev: 20, curr: 40 },
];

const urgentOrders = [
  { name: "أحمد العتيبي", dist: "٢.٤ كم", service: "غسيل وكي مستعجل", qty: "١٢ قطعة", timer: "٠٤:٢٠", timerBg: "bg-red-50", timerColor: "text-red-600" },
  { name: "سارة محمد", dist: "٠.٨ كم", service: "تنظيف جاف", qty: "٤ قطع", timer: "٠٨:٤٥", timerBg: "bg-orange-50", timerColor: "text-orange-600" },
];

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>لوحة تحكم مغسلة اللؤلؤة</h2>
          <p className="text-slate-500 mt-1">مرحباً، هناك ١٢ طلب جديد ينتظر مراجعتك</p>
        </div>
        <div className="flex items-center gap-3 bg-[#EFF4FA] px-4 py-2 rounded-full">
          <span className="text-sm text-slate-500">حالة الاستلام:</span>
          <div className="relative inline-flex items-center cursor-pointer">
            <input defaultChecked type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-[#006B5D] after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:-translate-x-5"></div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-6">
        {kpis.map((k) => (
          <div key={k.label} className={`bg-white p-6 rounded-xl flex items-center justify-between border-b-4 ${k.color} shadow-sm`}>
            <div>
              <p className="text-sm text-slate-500 mb-1">{k.label}</p>
              <h3 className="text-3xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>{k.value}</h3>
            </div>
            <div className={`w-14 h-14 rounded-full ${k.bg} flex items-center justify-center`}>
              <span className={`material-symbols-outlined ${k.iconColor} text-3xl`} style={{ fontVariationSettings: "'FILL' 1" }}>{k.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left: Urgent Orders + Chart */}
        <div className="col-span-2 space-y-6">
          {/* Urgent Orders */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>الطلبات العاجلة</h2>
              <button className="text-[#006B5D] text-sm hover:underline">عرض الكل</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {urgentOrders.map((o) => (
                <div key={o.name} className="bg-white p-5 rounded-xl shadow-sm border border-[#C5C6CE]/20 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E9EEF4] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#0D1F3C]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm">{o.name}</p>
                        <p className="text-xs text-slate-500">يبعد {o.dist}</p>
                      </div>
                    </div>
                    <div className={`${o.timerBg} ${o.timerColor} px-3 py-1 rounded-full flex items-center gap-1`}>
                      <span className="material-symbols-outlined text-sm">timer</span>
                      <span className="text-xs font-bold">{o.timer} متبقي</span>
                    </div>
                  </div>
                  <div className="space-y-2 py-2 border-y border-[#E9EEF4]">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">الخدمة:</span>
                      <span className="font-medium">{o.service}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">القطع:</span>
                      <span className="font-medium">{o.qty}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-[#006B5D] text-white py-2 rounded-full text-sm font-bold hover:opacity-90 active:scale-95 transition-all">قبول الطلب</button>
                    <button className="flex-1 bg-[#E9EEF4] text-slate-500 py-2 rounded-full text-sm font-bold hover:bg-red-50 hover:text-red-600 active:scale-95 transition-all">رفض</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#C5C6CE]/20">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>تحليلات الإيرادات الأسبوعية</h2>
              <div className="flex gap-4">
                <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded-sm bg-[#006B5D] inline-block"></span> الأسبوع الحالي</span>
                <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded-sm bg-[#E4E9EF] inline-block"></span> الأسبوع الماضي</span>
              </div>
            </div>
            <div className="flex items-end justify-between h-48 gap-4 px-4">
              {bars.map((b) => (
                <div key={b.day} className="flex flex-col items-center flex-1 gap-2">
                  <div className="w-full flex justify-center items-end gap-1 h-full">
                    <div className="bg-[#E4E9EF] w-3 rounded-t-sm" style={{ height: `${b.prev}%` }}></div>
                    <div className="bg-[#006B5D] w-3 rounded-t-sm" style={{ height: `${b.curr}%` }}></div>
                  </div>
                  <span className="text-xs text-slate-500">{b.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Quick Actions + Status */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-[#0D1F3C] p-6 rounded-2xl text-white">
            <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "Cairo, sans-serif" }}>إجراءات سريعة</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "add_box", label: "إضافة طلب" },
                { icon: "print", label: "طباعة ملصق" },
                { icon: "inventory_2", label: "المخزون" },
                { icon: "support_agent", label: "الدعم" },
              ].map((a) => (
                <button key={a.label} className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex flex-col items-center gap-2 transition-colors">
                  <span className="material-symbols-outlined">{a.icon}</span>
                  <span className="text-xs">{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Operational Status */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#C5C6CE]/20 space-y-6">
            <h3 className="text-lg font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>حالة التشغيل</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">سعة المغسلة الحالية</span>
                  <span className="font-bold">٧٥٪</span>
                </div>
                <div className="h-2 w-full bg-[#DEE3E9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#006B5D] rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">جاهز للتوصيل</span>
                  <span className="font-bold">١٤ طلب</span>
                </div>
                <div className="h-2 w-full bg-[#DEE3E9] rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400 rounded-full" style={{ width: "40%" }}></div>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-[#E9EEF4]">
              <div className="flex items-center gap-4">
                <div className="bg-[#E9EEF4] p-3 rounded-xl">
                  <span className="material-symbols-outlined text-[#006B5D]">local_shipping</span>
                </div>
                <div>
                  <p className="text-sm font-bold">٢ مندوب توصيل</p>
                  <p className="text-xs text-slate-500">في انتظار الطلبات</p>
                </div>
              </div>
            </div>
          </div>

          {/* Area Activity */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#C5C6CE]/20">
            <h3 className="text-lg font-bold text-[#0D1F3C] mb-4" style={{ fontFamily: "Cairo, sans-serif" }}>نشاط المنطقة</h3>
            <div className="relative h-40 rounded-xl overflow-hidden mb-4 bg-slate-200">
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-20">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="border border-slate-400"></div>
                ))}
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-[#006B5D] rounded-full animate-ping opacity-75 absolute"></div>
                <div className="w-4 h-4 bg-[#006B5D] rounded-full relative z-10"></div>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded text-[10px] font-bold">مباشر</div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">هناك زيادة في طلبات منطقتك حالياً. ينصح بزيادة سرعة المعالجة.</p>
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div className="fixed bottom-8 left-8">
        <div className="bg-[#0D1F3C] text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10">
          <div className="w-10 h-10 rounded-full bg-[#00C9B1] flex items-center justify-center text-[#0D1F3C]">
            <span className="material-symbols-outlined text-xl">rocket_launch</span>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">معدل التنفيذ الحالي</p>
            <p className="text-lg font-bold">مرتفع (أداء ممتاز)</p>
          </div>
        </div>
      </div>
    </div>
  );
}