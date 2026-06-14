
import { useState } from "react";
import { useProvider } from "./context/ProviderContext";
import type { DiscountTier } from "./types";

function formatRange(tier: DiscountTier) {
  if (tier.maxQty === null) return `${tier.minQty}+ قطعة`;
  return `${tier.minQty} - ${tier.maxQty} قطعة`;
}

function getDiscountLevel(tiers: DiscountTier[], qty: number) {
  const active = tiers.filter((t) => t.active).sort((a, b) => b.discount - a.discount);
  for (const tier of active) {
    if (qty >= tier.minQty && (tier.maxQty === null || qty <= tier.maxQty)) {
      return { level: tier.name, pct: tier.discount };
    }
  }
  return { level: "Standard", pct: 0 };
}

const TIER_COLORS = ["bg-slate-300", "bg-orange-400", "bg-slate-400", "bg-yellow-500", "bg-cyan-400", "bg-purple-400", "bg-pink-400"];

export default function Discounts() {
  const {
    discountTiers, specialEntities,
    addDiscountTier, updateDiscountTier, toggleDiscountTier, deleteDiscountTier,
    updateSpecialEntity, saveSpecialEntities, showToast,
  } = useProvider();

  const [qty, setQty] = useState(35);
  const [showAddTier, setShowAddTier] = useState(false);
  const [newTier, setNewTier] = useState({ name: "", minQty: 0, maxQty: 10, discount: 5, color: TIER_COLORS[0] });

  // edit modal state
  const [editTier, setEditTier] = useState<DiscountTier | null>(null);
  const [editForm, setEditForm] = useState<Partial<DiscountTier>>({});

  const basePrice = qty * 15;
  const { level, pct } = getDiscountLevel(discountTiers, qty);
  const saving = (basePrice * pct) / 100;

  const handleAddTier = () => {
    if (!newTier.name.trim()) return;
    addDiscountTier({
      name: newTier.name,
      minQty: newTier.minQty,
      maxQty: newTier.maxQty || null,
      discount: newTier.discount,
      color: newTier.color,
      active: true,
    });
    setNewTier({ name: "", minQty: 0, maxQty: 10, discount: 5, color: TIER_COLORS[0] });
    setShowAddTier(false);
  };

  const openEdit = (tier: DiscountTier, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    setEditTier(tier);
    setEditForm({
      name: tier.name,
      minQty: tier.minQty,
      maxQty: tier.maxQty,
      discount: tier.discount,
      color: tier.color,
      active: tier.active,
    });
  };

  const handleEditSave = () => {
    if (!editTier) return;
    updateDiscountTier(editTier.id, editForm);
    setEditTier(null);
  };

  const handleDelete = (id: string) => {
    deleteDiscountTier(id);
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
        {/* Tiers Table */}
        <section className="col-span-8 bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col border border-[#0D1F3C]/5">
          <div className="p-6 border-b border-[#E9EEF4] flex justify-between items-center">
            <h3 className="text-xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>مستويات الاشتراك العام</h3>
            <button onClick={() => setShowAddTier(true)} className="text-[#006B5D] font-bold text-sm flex items-center gap-1 hover:underline">
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
                  <tr
                    key={tier.id}
                    onClick={(e) => openEdit(tier, e)}
                    className="hover:bg-[#EFF4FA]/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-8 rounded-full ${tier.color}`} />
                        <span className="font-bold">{tier.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{formatRange(tier)}</td>
                    <td className="px-6 py-4 font-bold">{tier.discount}%</td>
                    <td className="px-6 py-4">
                      <button onClick={() => toggleDiscountTier(tier.id)}>
                        {tier.active ? (
                          <span className="px-3 py-1 bg-[#006B5D]/10 text-[#006B5D] rounded-full text-xs font-bold">نشط</span>
                        ) : (
                          <span className="px-3 py-1 bg-slate-200 text-slate-500 rounded-full text-xs font-bold">غير نشط</span>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); openEdit(tier, e); }}
                          className="p-2 hover:bg-[#E4E9EF] rounded-lg text-slate-400 hover:text-[#006B5D] transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(tier.id); }}
                          className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Right Column */}
        <section className="col-span-4 flex flex-col gap-6">
          {/* Simulator */}
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
                    <span className="text-white">{basePrice.toFixed(2)} ج.م</span>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                    <span className="text-slate-200">إجمالي التوفير:</span>
                    <span className="text-2xl font-bold text-[#38DDC4]">{saving.toFixed(2)} ج.م</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#006B5D]/10 rounded-full blur-3xl" />
          </div>

          {/* Special Entities */}
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

      {/* Add Tier Modal */}
      {showAddTier && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0D1F3C]/60 backdrop-blur-sm" onClick={() => setShowAddTier(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>إضافة مستوى خصم</h3>
              <button onClick={() => setShowAddTier(false)} className="text-slate-400 hover:text-[#0D1F3C]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#0D1F3C] mb-2">اسم المستوى</label>
                <input value={newTier.name} onChange={(e) => setNewTier({ ...newTier, name: e.target.value })} placeholder="مثال: Diamond" className="w-full bg-[#EFF4FA] rounded-xl py-3 px-4 outline-none text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold text-[#0D1F3C] mb-2">من (قطعة)</label>
                  <input type="number" value={newTier.minQty} onChange={(e) => setNewTier({ ...newTier, minQty: Number(e.target.value) })} className="w-full bg-[#EFF4FA] rounded-xl py-3 px-4 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0D1F3C] mb-2">إلى (قطعة)</label>
                  <input type="number" value={newTier.maxQty ?? ""} onChange={(e) => setNewTier({ ...newTier, maxQty: Number(e.target.value) })} placeholder="فارغ = بلا حد" className="w-full bg-[#EFF4FA] rounded-xl py-3 px-4 outline-none text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0D1F3C] mb-2">نسبة الخصم %</label>
                <input type="number" value={newTier.discount} onChange={(e) => setNewTier({ ...newTier, discount: Number(e.target.value) })} className="w-full bg-[#EFF4FA] rounded-xl py-3 px-4 outline-none text-sm" min={0} max={100} />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0D1F3C] mb-2">اللون</label>
                <div className="flex flex-wrap gap-2">
                  {TIER_COLORS.map((c) => (
                    <button key={c} onClick={() => setNewTier({ ...newTier, color: c })}
                      className={`w-8 h-8 rounded-full ${c} border-2 transition-all ${newTier.color === c ? "border-[#006B5D] scale-110" : "border-transparent"}`} />
                  ))}
                </div>
              </div>
              <button onClick={handleAddTier} className="w-full py-3 bg-[#006B5D] text-white rounded-full font-bold text-sm hover:bg-[#005046]">إضافة</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Tier Modal */}
      {editTier && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0D1F3C]/60 backdrop-blur-sm" onClick={() => setEditTier(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>تعديل مستوى الخصم</h3>
              <button onClick={() => setEditTier(null)} className="text-slate-400 hover:text-[#0D1F3C]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#0D1F3C] mb-2">اسم المستوى</label>
                <input value={editForm.name ?? ""} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-[#EFF4FA] rounded-xl py-3 px-4 outline-none text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold text-[#0D1F3C] mb-2">من (قطعة)</label>
                  <input type="number" value={editForm.minQty ?? 0} onChange={(e) => setEditForm({ ...editForm, minQty: Number(e.target.value) })}
                    className="w-full bg-[#EFF4FA] rounded-xl py-3 px-4 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0D1F3C] mb-2">إلى (قطعة)</label>
                  <input type="number" value={editForm.maxQty ?? ""} onChange={(e) => setEditForm({ ...editForm, maxQty: e.target.value ? Number(e.target.value) : null })}
                    placeholder="فارغ = بلا حد" className="w-full bg-[#EFF4FA] rounded-xl py-3 px-4 outline-none text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0D1F3C] mb-2">نسبة الخصم %</label>
                <input type="number" value={editForm.discount ?? 0} onChange={(e) => setEditForm({ ...editForm, discount: Number(e.target.value) })}
                  className="w-full bg-[#EFF4FA] rounded-xl py-3 px-4 outline-none text-sm" min={0} max={100} />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0D1F3C] mb-2">اللون</label>
                <div className="flex flex-wrap gap-2">
                  {TIER_COLORS.map((c) => (
                    <button key={c} onClick={() => setEditForm({ ...editForm, color: c })}
                      className={`w-8 h-8 rounded-full ${c} border-2 transition-all ${editForm.color === c ? "border-[#006B5D] scale-110" : "border-transparent"}`} />
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setEditTier(null)} className="flex-1 py-3 bg-[#EFF4FA] text-[#0D1F3C] rounded-full font-bold text-sm">إلغاء</button>
                <button onClick={handleEditSave} className="flex-1 py-3 bg-[#006B5D] text-white rounded-full font-bold text-sm hover:bg-[#005046]">حفظ التعديلات</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}