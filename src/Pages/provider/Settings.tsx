import { useState } from "react";
import { useProvider } from "./context/ProviderContext";

interface SettingsState {
  businessName: string;
  businessAddress: string;
  phone: string;
  email: string;
  openTime: string;
  closeTime: string;
  acceptOrders: boolean;
  fastServiceDefault: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  orderAlerts: boolean;
  language: "ar" | "en";
}

export default function Settings() {
  const { profile, showToast } = useProvider();
  const [settings, setSettings] = useState<SettingsState>({
    businessName: profile.businessName,
    businessAddress: profile.businessAddress,
    phone: profile.phone,
    email: profile.email,
    openTime: "08:00",
    closeTime: "22:00",
    acceptOrders: true,
    fastServiceDefault: true,
    emailNotifications: true,
    smsNotifications: false,
    orderAlerts: true,
    language: "ar",
  });
  const [saved, setSaved] = useState(false);

  const update = (patch: Partial<SettingsState>) => {
    setSettings((s) => ({ ...s, ...patch }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    showToast("تم حفظ الإعدادات بنجاح");
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8 min-h-[calc(100vh-80px)]">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>الإعدادات</h2>
          <p className="text-slate-500 mt-1">إدارة إعدادات المغسلة والتفضيلات</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-[#006B5D] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-[#005046] shadow-lg shadow-[#006B5D]/20 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-lg">save</span>
          {saved ? "تم الحفظ ✓" : "حفظ التغييرات"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl shadow-sm border border-[#0D1F3C]/5 overflow-hidden">
          <SectionHeader icon="store" title="معلومات المغسلة" />
          <div className="p-6 grid grid-cols-2 gap-5">
            <div className="col-span-2">
              <Field label="اسم المغسلة" value={settings.businessName} onChange={(v) => update({ businessName: v })} />
            </div>
            <div className="col-span-2">
              <Field label="العنوان" value={settings.businessAddress} onChange={(v) => update({ businessAddress: v })} />
            </div>
            <Field label="رقم الهاتف" value={settings.phone} onChange={(v) => update({ phone: v })} />
            <Field label="البريد الإلكتروني" value={settings.email} onChange={(v) => update({ email: v })} dir="ltr" />
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-[#0D1F3C]/5 overflow-hidden">
          <SectionHeader icon="schedule" title="ساعات العمل" />
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <Field label="وقت الفتح" value={settings.openTime} onChange={(v) => update({ openTime: v })} type="time" dir="ltr" />
              <Field label="وقت الإغلاق" value={settings.closeTime} onChange={(v) => update({ closeTime: v })} type="time" dir="ltr" />
            </div>
            <ToggleRow label="استقبال الطلبات" description="السماح للعملاء بتقديم طلبات جديدة" checked={settings.acceptOrders} onChange={(v) => update({ acceptOrders: v })} />
            <ToggleRow label="تفعيل الخدمة السريعة افتراضياً" description="تفعيل خيار الخدمة السريعة على الخدمات الجديدة" checked={settings.fastServiceDefault} onChange={(v) => update({ fastServiceDefault: v })} />
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-[#0D1F3C]/5 overflow-hidden">
          <SectionHeader icon="notifications_active" title="تفضيلات الإشعارات" />
          <div className="p-6 space-y-4">
            <ToggleRow label="تنبيهات الطلبات الجديدة" description="إشعار فوري عند وصول طلب جديد" checked={settings.orderAlerts} onChange={(v) => update({ orderAlerts: v })} />
            <ToggleRow label="إشعارات البريد الإلكتروني" description="تلقي ملخص يومي عبر البريد" checked={settings.emailNotifications} onChange={(v) => update({ emailNotifications: v })} />
            <ToggleRow label="إشعارات SMS" description="رسائل نصية للطلبات العاجلة" checked={settings.smsNotifications} onChange={(v) => update({ smsNotifications: v })} />
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-[#0D1F3C]/5 overflow-hidden">
          <SectionHeader icon="translate" title="اللغة" />
          <div className="p-6">
            <div className="flex gap-3">
              {[
                { id: "ar" as const, label: "العربية", flag: "🇸🇦" },
                { id: "en" as const, label: "English", flag: "🇬🇧" },
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => update({ language: lang.id })}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 transition-all ${
                    settings.language === lang.id
                      ? "border-[#006B5D] bg-[#006B5D]/5 font-bold text-[#006B5D]"
                      : "border-[#E4E9EF] text-slate-600 hover:border-[#006B5D]/30"
                  }`}
                >
                  <span>{lang.flag}</span>
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function SectionHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="px-6 py-4 border-b border-[#E4E9EF] bg-[#EFF4FA]/30 flex items-center gap-3">
      <span className="material-symbols-outlined text-[#00C9B1]" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
      <h3 className="font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>{title}</h3>
    </div>
  );
}

function Field({ label, value, onChange, dir, type = "text" }: { label: string; value: string; onChange: (v: string) => void; dir?: string; type?: string }) {
  return (
    <div>
      <label className="block text-sm font-bold text-[#0D1F3C] mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        dir={dir}
        className={`w-full bg-[#EFF4FA] border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#006B5D]/20 outline-none text-sm ${dir === "ltr" ? "text-left" : ""}`}
      />
    </div>
  );
}

function ToggleRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between p-4 bg-[#EFF4FA] rounded-2xl">
      <div>
        <p className="font-bold text-sm text-[#0D1F3C]">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 rounded-full relative transition-all shadow-inner flex-shrink-0 ${checked ? "bg-[#00C9B1]" : "bg-slate-300"}`}
      >
        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${checked ? "left-1" : "right-1"}`} />
      </button>
    </div>
  );
}
