import { useState } from "react";

const tiers = [
  { name: "Standard", range: "0 - 10 قطع", discount: "0%", color: "bg-slate-300", active: true },
  { name: "Bronze", range: "11 - 30 قطعة", discount: "10%", color: "bg-orange-400", active: true },
  { name: "Silver", range: "31 - 60 قطعة", discount: "15%", color: "bg-slate-400", active: true },
  { name: "Gold", range: "61 - 100 قطعة", discount: "20%", color: "bg-yellow-500", active: true },
  { name: "Platinum", range: "100+ قطعة", discount: "25%", color: "bg-cyan-400", active: false },
];

const specialEntities = [
  { icon: "mosque", label: "المساجد", sub: "خصم ثابت للخدمات", value: "50", bg: "bg-emerald-100", color: "text-emerald-700", enabled: true },
  { icon: "school", label: "المدارس", sub: "خصم الزي المدرسي", value: "30", bg: "bg-blue-100", color: "text-blue-700", enabled: true },
  { icon: "medical_services", label: "المستشفيات", sub: "خصم التعقيم الخاص", value: "40", bg: "bg-red-100", color: "text-red-700", enabled: false },
];

function getDiscountLevel(qty: number) {
  if (qty <= 10) return { level: "Standard", pct: 0 };
  if (qty <= 30) return { level: "Bronze", pct: 10 };
  if (qty <= 60) return { level: "Silver", pct: 15 };
  if (qty <= 100) return { level: "Gold", pct: 20 };
  return { level: "Platinum", pct: 25 };
}

export default function Discounts() {
  const [qty, setQty] = useState(35);
  const basePrice = qty * 15; // assume 15 SAR per item
  const { level, pct } = getDiscountLevel(qty);
  const saving = (basePrice * pct) / 100;

  return (
    <div className="p-8">
      {/* Breadcrumb + Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
          <span>الرئيسية</span>
          <span className="material-symbols-outlined text-xs">chevron_left</span>
          <span>الإعدادات المالية</span>
          <span className="material-symbols-outlined text-xs">chevron_left</span>
          <span className="text-[#006B5D] font-bold">إدارة مستويات الخصم</span>
        </div>
        <h2 className="text-3xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>مستويات الخصم الكمي</h2>
        <p className="text-slate-500 mt-1">إدارة هيكل التسعير التراكمي بناءً على حجم الطلبات.</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Tiers Table */}
        <section className="col-span-8 bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col border border-[#0D1F3C]/5">
          <div className="p-6 border-b border-[#E9EEF4] flex justify-between items-center">
            <h3 className="text-xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>مستويات الاشتراك العام</h3>
            <button className="text-[#006B5D] font-bold text-sm flex items-center gap-1 hover:underline">
              <span className="material-symbols-outlined text-sm">add</span>
              إضافة مستوى جديد
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-[#EFF4FA] text-slate-500 text-sm">
                  <th className="px-6 py-4 font-medium">اسم المستوى</th>
                  <th className="px-6 py-4 font-medium">نطاق القطع</th>
                  <th className="px-6 py-4 font-medium">نسبة الخصم</th>
                  <th className="px-6 py-4 font-medium">الحالة</th>
                  <th className="px-6 py-4 font-medium">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9EEF4]">
                {tiers.map((tier) => (
                  <tr key={tier.name} className="hover:bg-[#EFF4FA]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-8 rounded-full ${tier.color}`}></div>
                        <span className="font-bold">{tier.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{tier.range}</td>
                    <td className="px-6 py-4 font-bold">{tier.discount}</td>
                    <td className="px-6 py-4">
                      {tier.active ? (
                        <span className="px-3 py-1 bg-[#006B5D]/10 text-[#006B5D] rounded-full text-xs font-bold">نشط</span>
                      ) : (
                        <span className="px-3 py-1 bg-slate-200 text-slate-500 rounded-full text-xs font-bold">غير نشط</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-[#E4E9EF] rounded-lg text-slate-400 transition-colors">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Right Column */}
        <section className="col-span-4 flex flex-col gap-6">
          {/* Discount Simulator */}
          <div className="bg-[#0D1F3C] p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-[#38DDC4]">calculate</span>
                <h3 className="text-xl font-bold" style={{ fontFamily: "Cairo, sans-serif" }}>محاكي الخصومات</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-2">كمية القطع في الطلب</label>
                  <input
                    className="w-full bg-white/10 border-white/20 rounded-xl py-3 px-4 text-white text-lg font-bold outline-none focus:ring-2 focus:ring-[#00C9B1]/50"
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    min={1}
                  />
                </div>
                <div className="bg-white/5 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">المستوى المطبق:</span>
                    <span className="text-[#38DDC4] font-bold">{level}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">نسبة الخصم:</span>
                    <span className="text-white font-bold">{pct}%</span>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                    <span className="text-slate-200">إجمالي التوفير:</span>
                    <span className="text-2xl font-bold text-[#38DDC4]">{saving.toFixed(2)} ر.س</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#006B5D]/10 rounded-full blur-3xl"></div>
          </div>

          {/* Special Entities */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#C5C6CE]/20">
            <h3 className="text-xl font-bold text-[#0D1F3C] mb-6" style={{ fontFamily: "Cairo, sans-serif" }}>خصومات الجهات الخاصة</h3>
            <div className="space-y-4">
              {specialEntities.map((e) => (
                <div key={e.label} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#EFF4FA] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${e.bg} flex items-center justify-center ${e.color}`}>
                      <span className="material-symbols-outlined">{e.icon}</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm">{e.label}</p>
                      <p className="text-xs text-slate-500">{e.sub}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative w-16">
                      <input
                        className="w-full text-left py-1 pr-1 pl-6 text-sm font-bold border-none bg-transparent focus:ring-0 outline-none"
                        type="text"
                        defaultValue={e.value}
                      />
                      <span className="absolute left-2 top-1 text-xs font-bold text-slate-400">%</span>
                      <div className="absolute bottom-0 right-0 left-0 h-0.5 bg-[#006B5D]/30"></div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked={e.enabled} type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-[#006B5D] after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:-translate-x-5"></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 text-[#006B5D] font-bold border border-[#006B5D]/20 rounded-xl hover:bg-[#006B5D]/5 transition-colors text-sm">
              حفظ تغييرات الجهات
            </button>
          </div>
        </section>
      </div>

      {/* Bottom Cards */}
      <div className="mt-8 grid grid-cols-3 gap-6">
        {[
          { icon: "update", iconColor: "text-[#006B5D]", title: "تحديث مجدول", desc: "تغيير مستويات الخصم تلقائياً في تواريخ محددة (مواسم، أعياد).", action: "إعداد الجدولة" },
          { icon: "verified", iconColor: "text-[#765B00]", title: "خصم النخبة", desc: "إدارة الخصومات الخاصة بكبار الشركاء التجاريين ذوي العقود الدائمة.", action: "عرض الشركاء" },
          { icon: "analytics", iconColor: "text-[#7787AA]", title: "تحليلات الأداء", desc: "تقرير تأثير مستويات الخصم على حجم المبيعات الإجمالي.", action: "فتح التقارير" },
        ].map((c) => (
          <div key={c.title} className="bg-[#E9EEF4]/40 p-6 rounded-2xl border border-white/50">
            <div className={`w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center ${c.iconColor} mb-4`}>
              <span className="material-symbols-outlined">{c.icon}</span>
            </div>
            <h4 className="font-bold mb-2" style={{ fontFamily: "Cairo, sans-serif" }}>{c.title}</h4>
            <p className="text-sm text-slate-500 mb-4">{c.desc}</p>
            <button className="text-xs font-bold text-[#0D1F3C] flex items-center gap-1 hover:text-[#006B5D] transition-colors">
              {c.action} <span className="material-symbols-outlined text-xs">arrow_back</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}