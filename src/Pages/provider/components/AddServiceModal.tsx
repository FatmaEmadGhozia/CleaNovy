import { useState } from "react";
import { useProvider } from "../context/ProviderContext";
import type { NewServiceForm } from "../types";
import { SERVICE_ICONS, MULTIPLIER_OPTIONS } from "../types";

const STEPS = [
  { num: 1, label: "التصنيف والأيقونة" },
  { num: 2, label: "تفاصيل الخدمة" },
  { num: 3, label: "التسعير والمعاينة" },
];

const DURATION_OPTIONS = [
  { value: 6, label: "٦ ساعات" },
  { value: 12, label: "١٢ ساعة" },
  { value: 24, label: "٢٤ ساعة" },
  { value: 48, label: "٤٨ ساعة (يومان)" },
  { value: 72, label: "٧٢ ساعة (٣ أيام)" },
];

const emptyForm: NewServiceForm = {
  categoryId: "clothes",
  icon: "dry_cleaning",
  name: "",
  description: "",
  durationHours: 24,
  active: true,
  price: "",
  fastService: false,
  multiplier: "x1.5",
};

export default function AddServiceModal() {
  const { addServiceOpen, setAddServiceOpen, addService, categories } = useProvider();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<NewServiceForm>(emptyForm);

  if (!addServiceOpen) return null;

  const update = (patch: Partial<NewServiceForm>) => setForm((f) => ({ ...f, ...patch }));

  const canProceed = () => {
    if (step === 1) return !!form.categoryId && !!form.icon;
    if (step === 2) return form.name.trim().length >= 2;
    if (step === 3) return parseFloat(form.price) > 0;
    return false;
  };

  const handleSave = () => {
    addService({ ...form, price: parseFloat(form.price).toFixed(2) });
    setForm(emptyForm);
    setStep(1);
    setAddServiceOpen(false);
  };

  const handleClose = () => {
    setForm(emptyForm);
    setStep(1);
    setAddServiceOpen(false);
  };

  const selectedCategory = categories.find((c) => c.id === form.categoryId);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0D1F3C]/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-[#0D1F3C]/10">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-[#E4E9EF] bg-gradient-to-l from-[#EFF4FA] to-white">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>
                إضافة خدمة جديدة
              </h2>
              <p className="text-sm text-slate-500 mt-1">أكمل الخطوات الثلاث لإضافة الخدمة للجدول</p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-xl text-slate-400 hover:text-[#0D1F3C] hover:bg-[#EFF4FA] transition-all"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex items-center gap-2 flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      step > s.num
                        ? "bg-[#006B5D] text-white"
                        : step === s.num
                        ? "bg-[#006B5D] text-white ring-4 ring-[#006B5D]/20"
                        : "bg-[#E9EEF4] text-slate-400"
                    }`}
                  >
                    {step > s.num ? (
                      <span className="material-symbols-outlined text-sm">check</span>
                    ) : (
                      s.num
                    )}
                  </div>
                  <span
                    className={`text-xs font-bold hidden sm:block ${
                      step >= s.num ? "text-[#0D1F3C]" : "text-slate-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-2 rounded ${step > s.num ? "bg-[#006B5D]" : "bg-[#E4E9EF]"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#0D1F3C] mb-3" style={{ fontFamily: "Cairo, sans-serif" }}>
                  اختر التصنيف
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => update({ categoryId: cat.id })}
                      className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-right ${
                        form.categoryId === cat.id
                          ? "border-[#006B5D] bg-[#006B5D]/5"
                          : "border-[#E4E9EF] hover:border-[#006B5D]/30 hover:bg-[#EFF4FA]/50"
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-2xl ${
                          form.categoryId === cat.id ? "text-[#006B5D]" : "text-slate-400"
                        }`}
                        style={form.categoryId === cat.id ? { fontVariationSettings: "'FILL' 1" } : {}}
                      >
                        {cat.icon}
                      </span>
                      <div>
                        <p className="font-bold text-sm text-[#0D1F3C]">{cat.label}</p>
                        <p className="text-xs text-slate-400">{cat.count} خدمة</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0D1F3C] mb-3" style={{ fontFamily: "Cairo, sans-serif" }}>
                  اختر الأيقونة
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {SERVICE_ICONS.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => update({ icon })}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        form.icon === icon
                          ? "bg-[#006B5D] text-white shadow-lg shadow-[#006B5D]/30"
                          : "bg-[#EFF4FA] text-[#0D1F3C] hover:bg-[#E9EEF4]"
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-xl"
                        style={form.icon === icon ? { fontVariationSettings: "'FILL' 1" } : {}}
                      >
                        {icon}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[#0D1F3C] mb-2">اسم الخدمة *</label>
                <input
                  value={form.name}
                  onChange={(e) => update({ name: e.target.value })}
                  placeholder="مثال: غسيل وكوي (ثوب/قميص)"
                  className="w-full bg-[#EFF4FA] border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#006B5D]/20 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0D1F3C] mb-2">وصف الخدمة</label>
                <textarea
                  value={form.description}
                  onChange={(e) => update({ description: e.target.value })}
                  placeholder="وصف مختصر للخدمة يظهر للعملاء..."
                  rows={3}
                  className="w-full bg-[#EFF4FA] border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#006B5D]/20 outline-none text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0D1F3C] mb-2">مدة التنفيذ</label>
                <div className="grid grid-cols-3 gap-2">
                  {DURATION_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => update({ durationHours: opt.value })}
                      className={`py-2.5 px-3 rounded-xl text-sm font-bold transition-all ${
                        form.durationHours === opt.value
                          ? "bg-[#006B5D] text-white"
                          : "bg-[#EFF4FA] text-slate-600 hover:bg-[#E9EEF4]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#EFF4FA] rounded-2xl">
                <div>
                  <p className="font-bold text-sm text-[#0D1F3C]">حالة الخدمة</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {form.active ? "الخدمة متاحة للعملاء" : "الخدمة متوقفة مؤقتاً"}
                  </p>
                </div>
                <button
                  onClick={() => update({ active: !form.active })}
                  className={`w-12 h-6 rounded-full relative transition-all shadow-inner ${
                    form.active ? "bg-[#00C9B1]" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${
                      form.active ? "left-1" : "right-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#0D1F3C] mb-2">سعر الوحدة (ر.س) *</label>
                  <div className="relative">
                    <input
                      value={form.price}
                      onChange={(e) => update({ price: e.target.value.replace(/[^0-9.]/g, "") })}
                      placeholder="0.00"
                      dir="ltr"
                      className="w-full bg-[#EFF4FA] border-none rounded-xl py-3 px-4 pl-12 focus:ring-2 focus:ring-[#006B5D]/20 outline-none text-sm font-bold text-left"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">ر.س</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#0D1F3C] mb-2">مضاعف السعر السريع</label>
                  <select
                    value={form.multiplier}
                    onChange={(e) => update({ multiplier: e.target.value })}
                    disabled={!form.fastService}
                    className="w-full bg-[#EFF4FA] border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#006B5D]/20 outline-none text-sm disabled:opacity-50"
                  >
                    {MULTIPLIER_OPTIONS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#EFF4FA] rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-amber-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                      bolt
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#0D1F3C]">الخدمة السريعة</p>
                    <p className="text-xs text-slate-500">تطبيق مضاعف السعر على الطلبات المستعجلة</p>
                  </div>
                </div>
                <button
                  onClick={() => update({ fastService: !form.fastService })}
                  className={`w-12 h-6 rounded-full relative transition-all shadow-inner ${
                    form.fastService ? "bg-[#00C9B1]" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${
                      form.fastService ? "left-1" : "right-1"
                    }`}
                  />
                </button>
              </div>

              {/* Live Preview */}
              <div>
                <p className="text-sm font-bold text-[#0D1F3C] mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00C9B1] text-lg">visibility</span>
                  معاينة مباشرة
                </p>
                <div
                  className={`p-5 rounded-2xl border-2 border-dashed border-[#006B5D]/20 bg-[#EFF4FA]/50 flex items-center gap-5 ${
                    !form.active ? "grayscale opacity-60" : ""
                  }`}
                >
                  <div className="w-14 h-14 rounded-xl bg-[#E9EEF4] flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl text-[#0D1F3C]">{form.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#0D1F3C]">{form.name || "اسم الخدمة"}</h4>
                    <p className="text-xs text-slate-500">
                      {form.active
                        ? form.durationHours < 24
                          ? `الوقت المتوقع: ${form.durationHours} ساعة`
                          : `الوقت المتوقع: ${Math.floor(form.durationHours / 24)} ${Math.floor(form.durationHours / 24) === 1 ? "يوم" : "أيام"}`
                        : "غير متاح مؤقتاً"}
                    </p>
                    {selectedCategory && (
                      <span className="inline-block mt-1 text-[10px] bg-[#006B5D]/10 text-[#006B5D] px-2 py-0.5 rounded-full font-bold">
                        {selectedCategory.label}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-xs text-slate-400 mb-1">السعر</p>
                      <p className="font-bold text-[#0D1F3C]">
                        {form.price ? parseFloat(form.price).toFixed(2) : "0.00"}{" "}
                        <span className="text-xs text-slate-500">ر.س</span>
                      </p>
                    </div>
                    {form.fastService && (
                      <div className="text-center">
                        <p className="text-xs text-slate-400 mb-1">سريع</p>
                        <span className="text-xs font-bold text-[#765B00] bg-[#FFDF94]/50 px-2 py-1 rounded-lg">
                          {form.multiplier}
                        </span>
                      </div>
                    )}
                    <div>
                      {form.active ? (
                        <div className="flex items-center gap-1.5 bg-[#006B5D]/10 text-[#006B5D] px-3 py-1 rounded-full text-xs font-bold">
                          <span className="w-1.5 h-1.5 bg-[#006B5D] rounded-full animate-pulse" />
                          متاح
                        </div>
                      ) : (
                        <div className="bg-slate-200 text-slate-500 px-3 py-1 rounded-full text-xs font-bold">متوقف</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-[#E4E9EF] flex justify-between items-center bg-[#EFF4FA]/30">
          <button
            onClick={() => (step > 1 ? setStep(step - 1) : handleClose())}
            className="px-6 py-2.5 rounded-full text-sm font-bold text-slate-500 hover:text-[#0D1F3C] hover:bg-[#EFF4FA] transition-all"
          >
            {step > 1 ? "السابق" : "إلغاء"}
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="px-8 py-2.5 bg-[#006B5D] text-white rounded-full text-sm font-bold flex items-center gap-2 hover:bg-[#005046] transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#006B5D]/20"
            >
              التالي
              <span className="material-symbols-outlined text-sm">arrow_back</span>
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={!canProceed()}
              className="px-8 py-2.5 bg-[#006B5D] text-white rounded-full text-sm font-bold flex items-center gap-2 hover:bg-[#005046] transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#006B5D]/20"
            >
              <span className="material-symbols-outlined text-sm">save</span>
              حفظ وإضافة للجدول
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
