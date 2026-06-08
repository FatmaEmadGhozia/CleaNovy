import { useState } from "react";
import { useProvider } from "./context/ProviderContext";
import type { DiscountTier } from "./types";

function getDiscountLevel(tiers: DiscountTier[], qty: number) {
  const active = tiers.filter((t) => t.active).sort((a, b) => b.discount - a.discount);
  for (const tier of active) {
    if (qty >= tier.minQty && (tier.maxQty === null || qty <= tier.maxQty)) {
      return { level: tier.name, pct: tier.discount };
    }
  }
  return { level: "Standard", pct: 0 };
}

function formatRange(tier: DiscountTier) {
  if (tier.maxQty === null) return `${tier.minQty}+ قطعة`;
  return `${tier.minQty} - ${tier.maxQty} قطعة`;
}

const TIER_COLORS = ["bg-slate-300", "bg-orange-400", "bg-slate-400", "bg-yellow-500", "bg-cyan-400", "bg-purple-400", "bg-pink-400"];

export default function Discounts() {
  const {
    discountTiers, specialEntities,
    addDiscountTier, updateDiscountTier, toggleDiscountTier,
    updateSpecialEntity, saveSpecialEntities, showToast,
  } = useProvider();

  const [qty, setQty] = useState(35);
  const [showAddTier, setShowAddTier] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newTier, setNewTier] = useState({ name: "", minQty: 0, maxQty: 10, discount: 5 });
  const [editDiscount, setEditDiscount] = useState(0);

  const basePrice = qty * 15;
  const { level, pct } = getDiscountLevel(discountTiers, qty);
  const saving = (basePrice * pct) / 100;

  const handleAddTier = () => {
    if (!newTier.name.trim()) return;
    addDiscountTier({
      name: newTier.name,
      minQty: newTier.minQty,
      maxQty: newTier.maxQty,
      discount: newTier.discount,
      color: TIER_COLORS[discountTiers.length % TIER_COLORS.length],
      active: true,
    });
    setNewTier({ name: "", minQty: 0, maxQty: 10, discount: 5 });
    setShowAddTier(false);
  };

  const startEdit = (tier: DiscountTier) => {
    setEditingId(tier.id);
    setEditDiscount(tier.discount);
  };

  const saveEdit = (id: number) => {
    updateDiscountTier(id, { discount: editDiscount });
    setEditingId(null);
  };

  return (
    <div className="p-8">
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
        <section className="col-span-8 bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col border border-[#0D1F3C]/5">
          <div className="p-6 border-b border-[#E9EEF4] flex justify-between items-center">
            <h3 className="text-xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>مستويات الاشتراك العام</h3>
            <button
              onClick={() => setShowAddTier(true)}
              className="text-[#006B5D] font-bold text-sm flex items-center gap-1 hover:underline"
            >
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
                {discountTiers.map((tier) => (
                  <tr key={tier.id} className="hover:bg-[#EFF4FA]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-8 rounded-full ${tier.color}`} />
                        <span className="font-bold">{tier.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{formatRange(tier)}</td>
                    <td className="px-6 py-4 font-bold">
                      {editingId === tier.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={editDiscount}
                            onChange={(e) => setEditDiscount(Number(e.target.value))}
                            className="w-16 bg-[#EFF4FA] rounded-lg px-2 py-1 text-sm outline-none"
                            min={0}
                            max={100}
                          />
                          <span>%</span>
                          <button onClick={() => saveEdit(tier.id)} className="text-[#006B5D] text-xs font-bold">حفظ</button>
                        </div>
                      ) : (
                        `${tier.discount}%`
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => toggleDiscountTier(tier.id)}>
                        {tier.active ? (
                          <span className="px-3 py-1 bg-[#006B5D]/10 text-[#006B5D] rounded-full text-xs font-bold cursor-pointer">نشط</span>
                        ) : (
                          <span className="px-3 py-1 bg-slate-200 text-slate-500 rounded-full text-xs font-bold cursor-pointer">غير نشط</span>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => startEdit(tier)}
                        className="p-2 hover:bg-[#E4E9EF] rounded-lg text-slate-400 hover:text-[#006B5D] transition-colors"
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="col-span-4 flex flex-col gap-6">
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
                    onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
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
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">السعر قبل الخصم:</span>
                    <span className="text-white">{basePrice.toFixed(2)} ر.س</span>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                    <span className="text-slate-200">إجمالي التوفير:</span>
                    <span className="text-2xl font-bold text-[#38DDC4]">{saving.toFixed(2)} ر.س</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#006B5D]/10 rounded-full blur-3xl" />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#C5C6CE]/20">
            <h3 className="text-xl font-bold text-[#0D1F3C] mb-6" style={{ fontFamily: "Cairo, sans-serif" }}>خصومات الجهات الخاصة</h3>
            <div className="space-y-4">
              {specialEntities.map((e) => (
                <div key={e.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#EFF4FA] transition-colors">
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
                        type="number"
                        value={e.value}
                        onChange={(ev) => updateSpecialEntity(e.id, { value: Number(ev.target.value) })}
                        min={0}
                        max={100}
                      />
                      <span className="absolute left-2 top-1 text-xs font-bold text-slate-400">%</span>
                      <div className="absolute bottom-0 right-0 left-0 h-0.5 bg-[#006B5D]/30" />
                    </div>
                    <button
                      onClick={() => updateSpecialEntity(e.id, { enabled: !e.enabled })}
                      className={`w-11 h-6 rounded-full relative transition-all shadow-inner ${e.enabled ? "bg-[#006B5D]" : "bg-slate-200"}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${e.enabled ? "left-1" : "right-1"}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={saveSpecialEntities}
              className="w-full mt-6 py-2.5 text-[#006B5D] font-bold border border-[#006B5D]/20 rounded-xl hover:bg-[#006B5D]/5 transition-colors text-sm"
            >
              حفظ تغييرات الجهات
            </button>
          </div>
        </section>
      </div>

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
            <button
              onClick={() => showToast(`تم فتح: ${c.action}`)}
              className="text-xs font-bold text-[#0D1F3C] flex items-center gap-1 hover:text-[#006B5D] transition-colors"
            >
              {c.action} <span className="material-symbols-outlined text-xs">arrow_back</span>
            </button>
          </div>
        ))}
      </div>

      {showAddTier && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0D1F3C]/60 backdrop-blur-sm" onClick={() => setShowAddTier(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-[#0D1F3C] mb-6" style={{ fontFamily: "Cairo, sans-serif" }}>إضافة مستوى خصم</h3>
            <div className="space-y-4">
              <input value={newTier.name} onChange={(e) => setNewTier({ ...newTier, name: e.target.value })} placeholder="اسم المستوى" className="w-full bg-[#EFF4FA] rounded-xl py-3 px-4 outline-none text-sm" />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" value={newTier.minQty} onChange={(e) => setNewTier({ ...newTier, minQty: Number(e.target.value) })} placeholder="من" className="bg-[#EFF4FA] rounded-xl py-3 px-4 outline-none text-sm" />
                <input type="number" value={newTier.maxQty} onChange={(e) => setNewTier({ ...newTier, maxQty: Number(e.target.value) })} placeholder="إلى" className="bg-[#EFF4FA] rounded-xl py-3 px-4 outline-none text-sm" />
              </div>
              <input type="number" value={newTier.discount} onChange={(e) => setNewTier({ ...newTier, discount: Number(e.target.value) })} placeholder="نسبة الخصم %" className="w-full bg-[#EFF4FA] rounded-xl py-3 px-4 outline-none text-sm" />
              <button onClick={handleAddTier} className="w-full py-3 bg-[#006B5D] text-white rounded-full font-bold text-sm">إضافة</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
