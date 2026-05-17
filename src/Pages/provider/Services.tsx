import { useState } from "react";

const categories = [
  { id: "clothes", label: "الملابس", icon: "checkroom", count: 12, active: true },
  { id: "carpet", label: "السجاد والموكيت", icon: "grid_view", count: 4 },
  { id: "curtains", label: "الستائر", icon: "texture", count: 3 },
  { id: "bedding", label: "المفارش والأغطية", icon: "bed", count: 8 },
  { id: "special", label: "خدمات خاصة", icon: "settings_backup_restore", count: 2 },
];

const services = [
  {
    id: 1,
    icon: "dry_cleaning",
    name: "غسيل وكوي (ثوب/قميص)",
    duration: "الوقت المتوقع: 24 ساعة",
    price: "15.00",
    fastService: true,
    multiplier: "x1.5",
    active: true,
  },
  {
    id: 2,
    icon: "iron",
    name: "كوي فقط",
    duration: "الوقت المتوقع: 12 ساعة",
    price: "8.00",
    fastService: true,
    multiplier: "x1.2",
    active: true,
  },
  {
    id: 3,
    icon: "checkroom",
    name: "غسيل جاف (فستان سهرة)",
    duration: "غير متاح مؤقتاً",
    price: "45.00",
    fastService: false,
    multiplier: "--",
    active: false,
  },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("clothes");

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>إدارة قائمة الخدمات</h2>
          <p className="text-slate-500 mt-1">قم بتحديث أسعارك وخدماتك المتاحة لعملائك</p>
        </div>
        <button className="bg-[#006B5D] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-[#005046] shadow-lg shadow-[#006B5D]/20 transition-all active:scale-95">
          <span className="material-symbols-outlined">add_circle</span>
          إضافة خدمة جديدة
        </button>
      </div>

      <div className="flex gap-8">
        {/* Categories Sidebar */}
        <aside className="w-64 flex flex-col gap-4 flex-shrink-0">
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-[#0D1F3C]/5">
            <h3 className="font-bold text-[#0D1F3C] mb-4 flex items-center gap-2" style={{ fontFamily: "Cairo, sans-serif" }}>
              <span className="material-symbols-outlined text-[#00C9B1]">category</span>
              التصنيفات
            </h3>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all ${
                    activeCategory === cat.id
                      ? "bg-[#EFF4FA] text-[#006B5D] font-bold"
                      : "text-slate-500 hover:bg-[#EFF4FA]/50 hover:text-[#0D1F3C]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="material-symbols-outlined"
                      style={activeCategory === cat.id ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      {cat.icon}
                    </span>
                    {cat.label}
                  </span>
                  <span className={`text-xs ${activeCategory === cat.id ? "bg-white px-2 py-0.5 rounded-full shadow-sm" : ""}`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tip Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0D1F3C] to-[#006B5D] text-white shadow-xl overflow-hidden relative group">
            <div className="relative z-10">
              <p className="text-xs text-[#00C9B1] font-bold mb-1">تلميحة العمليات</p>
              <h4 className="text-sm leading-snug" style={{ fontFamily: "Cairo, sans-serif" }}>
                تفعيل "الخدمة السريعة" يزيد من دخل الطلب الواحد بنسبة تصل لـ 40%
              </h4>
            </div>
            <span className="material-symbols-outlined absolute -bottom-4 -left-4 text-white/10 text-8xl rotate-12 group-hover:rotate-0 transition-transform duration-500">
              trending_up
            </span>
          </div>
        </aside>

        {/* Services Table */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#0D1F3C]/5">
            {/* Table Header */}
            <div className="p-6 border-b border-[#E4E9EF] flex justify-between items-center bg-[#EFF4FA]/30">
              <div className="flex items-center gap-4">
                <span className="font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>خدمات الملابس</span>
                <div className="h-4 w-px bg-slate-300"></div>
                <span className="text-sm text-slate-500">عرض 12 خدمة مفعّلة</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-[#0D1F3C] transition-all">
                  <span className="material-symbols-outlined">sort</span>
                </button>
                <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-[#0D1F3C] transition-all">
                  <span className="material-symbols-outlined">filter_list</span>
                </button>
              </div>
            </div>

            {/* Service Rows */}
            <div className="divide-y divide-[#E4E9EF]">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className={`p-5 flex items-center gap-6 transition-colors ${
                    svc.active
                      ? "hover:bg-[#EFF4FA]/20"
                      : "bg-slate-50/50 grayscale opacity-60"
                  }`}
                >
                  {/* Drag Handle */}
                  <div className={`${svc.active ? "cursor-grab text-slate-300 hover:text-slate-500" : "text-slate-300"}`}>
                    <span className="material-symbols-outlined">drag_indicator</span>
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${svc.active ? "bg-[#E9EEF4]" : "bg-slate-200"}`}>
                    <span className={`material-symbols-outlined text-3xl ${svc.active ? "text-[#0D1F3C]" : "text-slate-400"}`}>
                      {svc.icon}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h4 className={`font-bold ${svc.active ? "text-[#0D1F3C]" : "text-slate-500"}`}>{svc.name}</h4>
                    <p className="text-xs text-slate-500">{svc.duration}</p>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-10">
                    {/* Price */}
                    <div className="text-center">
                      <p className="text-xs text-slate-400 mb-1">سعر الوحدة</p>
                      <div className="flex items-center gap-1 font-bold text-[#0D1F3C]">
                        {svc.active ? (
                          <input
                            className="w-16 bg-transparent border-none p-0 text-left focus:ring-0 font-bold outline-none"
                            type="text"
                            defaultValue={svc.price}
                          />
                        ) : (
                          <span>{svc.price}</span>
                        )}
                        <span className="text-xs text-slate-500">ر.س</span>
                      </div>
                    </div>

                    {/* Fast Service Toggle */}
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-xs text-slate-400">خدمة سريعة</p>
                      <button
                        className={`w-10 h-5 rounded-full relative transition-all shadow-inner ${
                          svc.fastService ? "bg-[#00C9B1]" : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                            svc.fastService ? "left-1" : "right-1"
                          }`}
                        ></span>
                      </button>
                    </div>

                    {/* Multiplier */}
                    <div className="text-center">
                      <p className="text-xs text-slate-400 mb-1">مضاعف السعر</p>
                      <div className={`flex items-center gap-1 rounded-lg px-2 py-1 ${svc.active ? "bg-[#E9EEF4]" : "bg-slate-100"}`}>
                        <span className={`text-xs font-bold ${svc.active ? "text-[#765B00]" : "text-slate-400"}`}>
                          {svc.multiplier}
                        </span>
                        {svc.active && (
                          <span className="material-symbols-outlined text-xs text-slate-400">edit</span>
                        )}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-xs text-slate-400">الحالة</p>
                      {svc.active ? (
                        <div className="flex items-center gap-2 bg-[#006B5D]/10 text-[#006B5D] px-3 py-1 rounded-full text-xs font-bold">
                          <span className="w-1.5 h-1.5 bg-[#006B5D] rounded-full animate-pulse"></span>
                          متاح
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 bg-slate-200 text-slate-500 px-3 py-1 rounded-full text-xs font-bold">
                          متوقف
                        </div>
                      )}
                    </div>

                    {/* Action */}
                    <button className={`p-2 transition-colors ${svc.active ? "text-slate-300 hover:text-red-600" : "text-slate-300"}`}>
                      <span className="material-symbols-outlined">{svc.active ? "delete" : "settings"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New */}
            <div className="p-8 border-t border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#00C9B1] flex items-center justify-center text-[#00C9B1] mb-3">
                <span className="material-symbols-outlined">add</span>
              </div>
              <h5 className="font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>أضف خدمة فرعية جديدة لهذا التصنيف</h5>
              <p className="text-sm text-slate-400 mt-1 max-w-xs">يمكنك تحديد الأسعار، مدة التنفيذ، وإضافة خيارات الخدمة السريعة فوراً</p>
              <button className="mt-4 px-6 py-2 bg-[#EFF4FA] text-[#006B5D] rounded-full text-sm font-bold hover:bg-[#006B5D] hover:text-white transition-all">
                بدء الإضافة
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-6">
        {[
          { icon: "list_alt", iconBg: "bg-blue-50", iconColor: "text-blue-600", label: "إجمالي الخدمات", value: "24", sub: "خدمة مفعّلة" },
          { icon: "bolt", iconBg: "bg-amber-50", iconColor: "text-amber-600", label: "استخدام الخدمة السريعة", value: "35%", sub: "من إجمالي الطلبات" },
          { icon: "payments", iconBg: "bg-emerald-50", iconColor: "text-emerald-600", label: "متوسط سعر الطلب", value: "84.20", sub: "ر.س" },
        ].map((s) => (
          <div key={s.label} className="bg-white p-6 rounded-2xl shadow-sm border border-[#0D1F3C]/5 flex items-center gap-5">
            <div className={`w-12 h-12 rounded-full ${s.iconBg} ${s.iconColor} flex items-center justify-center`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
            </div>
            <div>
              <p className="text-sm text-slate-500">{s.label}</p>
              <p className="text-2xl font-bold text-[#0D1F3C]">
                {s.value} <span className="text-xs font-normal text-slate-400">{s.sub}</span>
              </p>
            </div>
          </div>
        ))}
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