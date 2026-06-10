import { useState } from "react";
import { useProvider } from "./context/ProviderContext";
import { SERVICE_ICONS } from "./types";

export default function Services() {
  const { categories, services, setAddServiceOpen, deleteService, updateService, addServiceCategory, deleteServiceCategory } = useProvider();
  const [activeCategory, setActiveCategory] = useState("clothes");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCatLabel, setNewCatLabel] = useState("");
  const [newCatIcon, setNewCatIcon] = useState<string>(SERVICE_ICONS[0]);

  const handleAddCategory = () => {
    if (!newCatLabel.trim()) return;
    const newId = addServiceCategory(newCatLabel.trim(), newCatIcon);
    setActiveCategory(newId);
    setNewCatLabel("");
    setShowAddCategory(false);
  };

  const handleDeleteCategory = (id: string) => {
    if (!deleteServiceCategory(id)) return;
    if (activeCategory === id) {
      const remaining = categories.filter((c) => c.id !== id);
      setActiveCategory(remaining[0]?.id ?? "");
    }
  };

  const filteredServices = services.filter((s) => s.categoryId === activeCategory);
  const activeCategoryData = categories.find((c) => c.id === activeCategory);
  const activeCount = filteredServices.filter((s) => s.active).length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>إدارة قائمة الخدمات</h2>
          <p className="text-slate-500 mt-1">قم بتحديث أسعارك وخدماتك المتاحة لعملائك</p>
        </div>
        <button
          onClick={() => setAddServiceOpen(true)}
          className="bg-[#006B5D] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-[#005046] shadow-lg shadow-[#006B5D]/20 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined">add_circle</span>
          إضافة خدمة جديدة
        </button>
      </div>

      <div className="flex gap-8">
        {/* Categories Sidebar */}
        <aside className="w-64 flex flex-col gap-4 flex-shrink-0">
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-[#0D1F3C]/5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[#0D1F3C] flex items-center gap-2" style={{ fontFamily: "Cairo, sans-serif" }}>
                <span className="material-symbols-outlined text-[#00C9B1]">category</span>
                التصنيفات
              </h3>
              <button
                onClick={() => setShowAddCategory(true)}
                className="p-1.5 rounded-lg text-[#006B5D] hover:bg-[#EFF4FA] transition-all"
                title="إضافة تصنيف"
              >
                <span className="material-symbols-outlined text-lg">add_circle</span>
              </button>
            </div>
            <div className="space-y-1">
              {categories.map((cat) => (
                <div key={cat.id} className="group flex items-center gap-1">
                  <button
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex-1 flex items-center justify-between px-3 py-3 rounded-xl transition-all ${
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
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                    title="حذف التصنيف"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
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
                <span className="font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>
                  {activeCategoryData?.label ?? "الخدمات"}
                </span>
                <div className="h-4 w-px bg-slate-300"></div>
                <span className="text-sm text-slate-500">
                  عرض {activeCount} خدمة مفعّلة من {filteredServices.length}
                </span>
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
              {filteredServices.length === 0 ? (
                <div className="p-12 text-center">
                  <span className="material-symbols-outlined text-5xl text-slate-300 mb-3 block">inventory_2</span>
                  <p className="font-bold text-[#0D1F3C]">لا توجد خدمات في هذا التصنيف</p>
                  <p className="text-sm text-slate-400 mt-1">أضف خدمة جديدة للبدء</p>
                </div>
              ) : (
                filteredServices.map((svc) => (
                  <div
                    key={svc.id}
                    className={`p-5 flex items-center gap-6 transition-colors ${
                      svc.active
                        ? "hover:bg-[#EFF4FA]/20"
                        : "bg-slate-50/50 grayscale opacity-60"
                    }`}
                  >
                    <div className={`${svc.active ? "cursor-grab text-slate-300 hover:text-slate-500" : "text-slate-300"}`}>
                      <span className="material-symbols-outlined">drag_indicator</span>
                    </div>

                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${svc.active ? "bg-[#E9EEF4]" : "bg-slate-200"}`}>
                      <span className={`material-symbols-outlined text-3xl ${svc.active ? "text-[#0D1F3C]" : "text-slate-400"}`}>
                        {svc.icon}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h4 className={`font-bold ${svc.active ? "text-[#0D1F3C]" : "text-slate-500"}`}>{svc.name}</h4>
                      <p className="text-xs text-slate-500">{svc.duration}</p>
                    </div>

                    <div className="flex items-center gap-10">
                      <div className="text-center">
                        <p className="text-xs text-slate-400 mb-1">سعر الوحدة</p>
                        <div className="flex items-center gap-1 font-bold text-[#0D1F3C]">
                          {svc.active ? (
                            <input
                              className="w-16 bg-transparent border-none p-0 text-left focus:ring-0 font-bold outline-none"
                              type="text"
                              value={svc.price}
                              onChange={(e) => updateService(svc.id, { price: e.target.value })}
                            />
                          ) : (
                            <span>{svc.price}</span>
                          )}
                          <span className="text-xs text-slate-500">ر.س</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-1">
                        <p className="text-xs text-slate-400">خدمة سريعة</p>
                        <button
                          onClick={() => updateService(svc.id, { fastService: !svc.fastService })}
                          className={`w-10 h-5 rounded-full relative transition-all shadow-inner ${
                            svc.fastService ? "bg-[#00C9B1]" : "bg-slate-300"
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                              svc.fastService ? "left-1" : "right-1"
                            }`}
                          />
                        </button>
                      </div>

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

                      <button
                        onClick={() => deleteService(svc.id)}
                        className={`p-2 transition-colors ${svc.active ? "text-slate-300 hover:text-red-600" : "text-slate-300"}`}
                      >
                        <span className="material-symbols-outlined">{svc.active ? "delete" : "settings"}</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add New */}
            <div className="p-8 border-t border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#00C9B1] flex items-center justify-center text-[#00C9B1] mb-3">
                <span className="material-symbols-outlined">add</span>
              </div>
              <h5 className="font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>أضف خدمة فرعية جديدة لهذا التصنيف</h5>
              <p className="text-sm text-slate-400 mt-1 max-w-xs">يمكنك تحديد الأسعار، مدة التنفيذ، وإضافة خيارات الخدمة السريعة فوراً</p>
              <button
                onClick={() => setAddServiceOpen(true)}
                className="mt-4 px-6 py-2 bg-[#EFF4FA] text-[#006B5D] rounded-full text-sm font-bold hover:bg-[#006B5D] hover:text-white transition-all"
              >
                بدء الإضافة
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-6">
        {[
          { icon: "list_alt", iconBg: "bg-blue-50", iconColor: "text-blue-600", label: "إجمالي الخدمات", value: String(services.length), sub: "خدمة" },
          { icon: "bolt", iconBg: "bg-amber-50", iconColor: "text-amber-600", label: "استخدام الخدمة السريعة", value: `${Math.round((services.filter((s) => s.fastService).length / Math.max(services.length, 1)) * 100)}%`, sub: "من إجمالي الخدمات" },
          { icon: "payments", iconBg: "bg-emerald-50", iconColor: "text-emerald-600", label: "متوسط سعر الخدمة", value: services.length ? (services.reduce((a, s) => a + parseFloat(s.price), 0) / services.length).toFixed(2) : "0.00", sub: "ر.س" },
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

      {showAddCategory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0D1F3C]/60 backdrop-blur-sm" onClick={() => setShowAddCategory(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>إضافة تصنيف جديد</h3>
              <button onClick={() => setShowAddCategory(false)} className="text-slate-400 hover:text-[#0D1F3C]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#0D1F3C] mb-2">اسم التصنيف</label>
                <input
                  value={newCatLabel}
                  onChange={(e) => setNewCatLabel(e.target.value)}
                  placeholder="مثال: أزياء رسمية"
                  className="w-full bg-[#EFF4FA] rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-[#006B5D]/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0D1F3C] mb-2">الأيقونة</label>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_ICONS.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setNewCatIcon(icon)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        newCatIcon === icon ? "bg-[#006B5D] text-white" : "bg-[#EFF4FA] text-[#0D1F3C]"
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">{icon}</span>
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={handleAddCategory} className="w-full py-3 bg-[#006B5D] text-white rounded-full font-bold text-sm hover:bg-[#005046]">
                إضافة التصنيف
              </button>
            </div>
          </div>
        </div>
      )}

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
