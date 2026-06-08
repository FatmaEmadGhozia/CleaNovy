import { useState } from "react";
import { useProvider } from "./context/ProviderContext";

export default function Profile() {
  const { profile, updateProfile, orderStats } = useProvider();
  const [form, setForm] = useState({ ...profile });
  const [saved, setSaved] = useState(false);

  const update = (patch: Partial<typeof form>) => {
    setForm((f) => ({ ...f, ...patch }));
    setSaved(false);
  };

  const handleSave = () => {
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>
            الملف الشخصي
          </h2>
          <p className="text-slate-500 mt-1">إدارة بياناتك الشخصية ومعلومات الحساب</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-[#006B5D] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-[#005046] shadow-lg shadow-[#006B5D]/20 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined">save</span>
          {saved ? "تم الحفظ ✓" : "حفظ التغييرات"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-[#0D1F3C]/5 p-8 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-28 h-28 rounded-full border-4 border-[#00C9B1] bg-[#006B5D]/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-5xl text-[#006B5D]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  person
                </span>
              </div>
              <button className="absolute bottom-0 left-0 w-8 h-8 bg-[#006B5D] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#005046] transition-all">
                <span className="material-symbols-outlined text-sm">photo_camera</span>
              </button>
            </div>
            <h3 className="text-xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>
              {form.name}
            </h3>
            <p className="text-sm text-slate-500 mt-1">{form.role}</p>
            <div className="mt-4 px-4 py-2 bg-[#006B5D]/10 text-[#006B5D] rounded-full text-xs font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#006B5D] rounded-full animate-pulse" />
              حساب نشط
            </div>

            <div className="w-full mt-8 pt-6 border-t border-[#E4E9EF] space-y-3">
              <StatRow icon="local_laundry_service" label="طلبات مُدارة" value={String(orderStats.done + orderStats.processing)} />
              <StatRow icon="star" label="تقييم المغسلة" value="٤.٨" />
              <StatRow icon="calendar_month" label="عضو منذ" value="يناير ٢٠٢٤" />
            </div>
          </div>
        </div>

        <div className="col-span-2 space-y-6">
          <section className="bg-white rounded-2xl shadow-sm border border-[#0D1F3C]/5 overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E4E9EF] bg-[#EFF4FA]/30 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#00C9B1]" style={{ fontVariationSettings: "'FILL' 1" }}>badge</span>
              <h3 className="font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>المعلومات الشخصية</h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-5">
              <Field label="الاسم الكامل" value={form.name} onChange={(v) => update({ name: v })} />
              <Field label="المسمى الوظيفي" value={form.role} onChange={(v) => update({ role: v })} />
              <Field label="البريد الإلكتروني" value={form.email} onChange={(v) => update({ email: v })} dir="ltr" />
              <Field label="رقم الجوال" value={form.phone} onChange={(v) => update({ phone: v })} />
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-[#0D1F3C]/5 overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E4E9EF] bg-[#EFF4FA]/30 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#00C9B1]" style={{ fontVariationSettings: "'FILL' 1" }}>store</span>
              <h3 className="font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>معلومات المغسلة</h3>
            </div>
            <div className="p-6 space-y-5">
              <Field label="اسم المغسلة" value={form.businessName} onChange={(v) => update({ businessName: v })} full />
              <Field label="العنوان" value={form.businessAddress} onChange={(v) => update({ businessAddress: v })} full />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, dir, full }: { label: string; value: string; onChange: (v: string) => void; dir?: string; full?: boolean }) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <label className="block text-sm font-bold text-[#0D1F3C] mb-2">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        dir={dir}
        className={`w-full bg-[#EFF4FA] border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#006B5D]/20 outline-none text-sm ${dir === "ltr" ? "text-left" : ""}`}
      />
    </div>
  );
}

function StatRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-slate-500">
        <span className="material-symbols-outlined text-sm">{icon}</span>
        <span className="text-xs">{label}</span>
      </div>
      <span className="text-sm font-bold text-[#0D1F3C]">{value}</span>
    </div>
  );
}
