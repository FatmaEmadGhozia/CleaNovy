// import { useState } from "react";
// import { useProvider } from "./context/ProviderContext";

// export default function Profile() {
//   const { profile, updateProfile, orderStats } = useProvider();
//   const [form, setForm] = useState({ ...profile });
//   const [saved, setSaved] = useState(false);

//   const update = (patch: Partial<typeof form>) => {
//     setForm((f) => ({ ...f, ...patch }));
//     setSaved(false);
//   };

//   const handleSave = () => {
//     updateProfile(form);
//     setSaved(true);
//     setTimeout(() => setSaved(false), 3000);
//   };

//   return (
//     <div className="p-8">
//       <div className="flex justify-between items-end mb-8">
//         <div>
//           <h2 className="text-3xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>
//             الملف الشخصي
//           </h2>
//           <p className="text-slate-500 mt-1">إدارة بياناتك الشخصية ومعلومات الحساب</p>
//         </div>
//         <button
//           onClick={handleSave}
//           className="bg-[#006B5D] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-[#005046] shadow-lg shadow-[#006B5D]/20 transition-all active:scale-95"
//         >
//           <span className="material-symbols-outlined">save</span>
//           {saved ? "تم الحفظ ✓" : "حفظ التغييرات"}
//         </button>
//       </div>

//       <div className="grid grid-cols-3 gap-8">
//         <div className="col-span-1">
//           <div className="bg-white rounded-2xl shadow-sm border border-[#0D1F3C]/5 p-8 flex flex-col items-center text-center">
//             <div className="relative mb-4">
//               <div className="w-28 h-28 rounded-full border-4 border-[#00C9B1] bg-[#006B5D]/10 flex items-center justify-center">
//                 <span className="material-symbols-outlined text-5xl text-[#006B5D]" style={{ fontVariationSettings: "'FILL' 1" }}>
//                   person
//                 </span>
//               </div>
//               <button className="absolute bottom-0 left-0 w-8 h-8 bg-[#006B5D] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#005046] transition-all">
//                 <span className="material-symbols-outlined text-sm">photo_camera</span>
//               </button>
//             </div>
//             <h3 className="text-xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>
//               {form.name}
//             </h3>
//             <p className="text-sm text-slate-500 mt-1">{form.role}</p>
//             <div className="mt-4 px-4 py-2 bg-[#006B5D]/10 text-[#006B5D] rounded-full text-xs font-bold flex items-center gap-1.5">
//               <span className="w-1.5 h-1.5 bg-[#006B5D] rounded-full animate-pulse" />
//               حساب نشط
//             </div>

//             <div className="w-full mt-8 pt-6 border-t border-[#E4E9EF] space-y-3">
//               <StatRow icon="local_laundry_service" label="طلبات مُدارة" value={String(orderStats.done + orderStats.processing)} />
//               <StatRow icon="star" label="تقييم المغسلة" value="٤.٨" />
//               <StatRow icon="calendar_month" label="عضو منذ" value="يناير ٢٠٢٤" />
//             </div>
//           </div>
//         </div>

//         <div className="col-span-2 space-y-6">
//           <section className="bg-white rounded-2xl shadow-sm border border-[#0D1F3C]/5 overflow-hidden">
//             <div className="px-6 py-4 border-b border-[#E4E9EF] bg-[#EFF4FA]/30 flex items-center gap-3">
//               <span className="material-symbols-outlined text-[#00C9B1]" style={{ fontVariationSettings: "'FILL' 1" }}>badge</span>
//               <h3 className="font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>المعلومات الشخصية</h3>
//             </div>
//             <div className="p-6 grid grid-cols-2 gap-5">
//               <Field label="الاسم الكامل" value={form.name} onChange={(v) => update({ name: v })} />
//               <Field label="المسمى الوظيفي" value={form.role} onChange={(v) => update({ role: v })} />
//               <Field label="البريد الإلكتروني" value={form.email} onChange={(v) => update({ email: v })} dir="ltr" />
//               <Field label="رقم الجوال" value={form.phone} onChange={(v) => update({ phone: v })} />
//             </div>
//           </section>

//           <section className="bg-white rounded-2xl shadow-sm border border-[#0D1F3C]/5 overflow-hidden">
//             <div className="px-6 py-4 border-b border-[#E4E9EF] bg-[#EFF4FA]/30 flex items-center gap-3">
//               <span className="material-symbols-outlined text-[#00C9B1]" style={{ fontVariationSettings: "'FILL' 1" }}>store</span>
//               <h3 className="font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>معلومات المغسلة</h3>
//             </div>
//             <div className="p-6 space-y-5">
//               <Field label="اسم المغسلة" value={form.businessName} onChange={(v) => update({ businessName: v })} full />
//               <Field label="العنوان" value={form.businessAddress} onChange={(v) => update({ businessAddress: v })} full />
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Field({ label, value, onChange, dir, full }: { label: string; value: string; onChange: (v: string) => void; dir?: string; full?: boolean }) {
//   return (
//     <div className={full ? "col-span-2" : ""}>
//       <label className="block text-sm font-bold text-[#0D1F3C] mb-2">{label}</label>
//       <input
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         dir={dir}
//         className={`w-full bg-[#EFF4FA] border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#006B5D]/20 outline-none text-sm ${dir === "ltr" ? "text-left" : ""}`}
//       />
//     </div>
//   );
// }

// function StatRow({ icon, label, value }: { icon: string; label: string; value: string }) {
//   return (
//     <div className="flex items-center justify-between">
//       <div className="flex items-center gap-2 text-slate-500">
//         <span className="material-symbols-outlined text-sm">{icon}</span>
//         <span className="text-xs">{label}</span>
//       </div>
//       <span className="text-sm font-bold text-[#0D1F3C]">{value}</span>
//     </div>
//   );
// }




// import { useState } from "react";
// import { useProvider } from "./context/ProviderContext";

// type Tab = "personal" | "laundry" | "preferences";

// interface PreferencesState {
//   openTime: string;
//   closeTime: string;
//   acceptOrders: boolean;
//   fastServiceDefault: boolean;
//   emailNotifications: boolean;
//   smsNotifications: boolean;
//   orderAlerts: boolean;
//   language: "ar" | "en";
// }

// export default function Profile() {
//   const { profile, updateProfile, orderStats, showToast } = useProvider();
//   const [activeTab, setActiveTab] = useState<Tab>("personal");
//   const [form, setForm] = useState({ ...profile });
//   const [prefs, setPrefs] = useState<PreferencesState>({
//     openTime: "08:00",
//     closeTime: "22:00",
//     acceptOrders: true,
//     fastServiceDefault: true,
//     emailNotifications: true,
//     smsNotifications: false,
//     orderAlerts: true,
//     language: "ar",
//   });

//   const updateForm = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));
//   const updatePrefs = (patch: Partial<PreferencesState>) => setPrefs((p) => ({ ...p, ...patch }));

//   const handleSave = () => {
//     updateProfile(form);
//     showToast("تم حفظ التغييرات بنجاح");
//   };

//   const tabs: { id: Tab; label: string; icon: string }[] = [
//     { id: "personal", label: "معلوماتي", icon: "badge" },
//     { id: "laundry", label: "المغسلة", icon: "store" },
//     { id: "preferences", label: "التفضيلات", icon: "tune" },
//   ];

//   return (
//     <div className="p-8 min-h-[calc(100vh-80px)]">
//       {/* Header */}
//       <div className="flex justify-between items-end mb-8">
//         <div>
//           <h2
//             className="text-3xl font-bold text-[#0D1F3C]"
//             style={{ fontFamily: "Cairo, sans-serif" }}
//           >
//             الملف الشخصي
//           </h2>
//           <p className="text-slate-500 mt-1">إدارة بياناتك الشخصية وإعدادات المغسلة</p>
//         </div>
//         <button
//           onClick={handleSave}
//           className="bg-[#006B5D] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-[#005046] shadow-lg shadow-[#006B5D]/20 transition-all active:scale-95"
//         >
//           <span className="material-symbols-outlined">save</span>
//           حفظ التغييرات
//         </button>
//       </div>

//       <div className="grid grid-cols-12 gap-6">
//         {/* ── Left card: Avatar + stats ── */}
//         <div className="col-span-3">
//           <div className="bg-white rounded-2xl shadow-sm border border-[#0D1F3C]/5 p-6 flex flex-col items-center text-center sticky top-24">
//             {/* Avatar */}
//             <div className="relative mb-4">
//               <div className="w-24 h-24 rounded-full border-4 border-[#00C9B1] bg-[#006B5D]/10 flex items-center justify-center">
//                 <span
//                   className="material-symbols-outlined text-5xl text-[#006B5D]"
//                   style={{ fontVariationSettings: "'FILL' 1" }}
//                 >
//                   person
//                 </span>
//               </div>
//               <button className="absolute bottom-0 left-0 w-7 h-7 bg-[#006B5D] text-white rounded-full flex items-center justify-center shadow hover:bg-[#005046] transition-all">
//                 <span className="material-symbols-outlined text-xs">photo_camera</span>
//               </button>
//             </div>

//             <h3
//               className="text-lg font-bold text-[#0D1F3C] leading-snug"
//               style={{ fontFamily: "Cairo, sans-serif" }}
//             >
//               {form.name}
//             </h3>
//             <p className="text-xs text-slate-500 mt-0.5">{form.role}</p>
//             <p className="text-xs text-[#006B5D] font-bold mt-1">{form.businessName}</p>

//             <div className="mt-3 px-3 py-1.5 bg-[#006B5D]/10 text-[#006B5D] rounded-full text-xs font-bold flex items-center gap-1.5">
//               <span className="w-1.5 h-1.5 bg-[#006B5D] rounded-full animate-pulse" />
//               حساب نشط
//             </div>

//             {/* Stats */}
//             <div className="w-full mt-6 pt-5 border-t border-[#E4E9EF] space-y-3">
//               <StatRow
//                 icon="local_laundry_service"
//                 label="طلبات مُنجزة"
//                 value={String(orderStats.done + orderStats.processing)}
//               />
//               <StatRow icon="star" label="تقييم المغسلة" value="٤.٨" />
//               <StatRow icon="calendar_month" label="عضو منذ" value="يناير ٢٠٢٤" />
//             </div>

//             {/* Tab nav inside card */}
//             <div className="w-full mt-6 pt-5 border-t border-[#E4E9EF] space-y-1">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-right transition-all text-sm font-medium ${
//                     activeTab === tab.id
//                       ? "bg-[#006B5D]/10 text-[#006B5D] font-bold"
//                       : "text-slate-500 hover:bg-[#EFF4FA] hover:text-[#0D1F3C]"
//                   }`}
//                 >
//                   <span
//                     className="material-symbols-outlined text-base"
//                     style={
//                       activeTab === tab.id
//                         ? { fontVariationSettings: "'FILL' 1" }
//                         : {}
//                     }
//                   >
//                     {tab.icon}
//                   </span>
//                   {tab.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ── Right: Tab content ── */}
//         <div className="col-span-9 space-y-5">
//           {/* ── TAB: Personal ── */}
//           {activeTab === "personal" && (
//             <>
//               <Section icon="badge" title="المعلومات الشخصية">
//                 <div className="grid grid-cols-2 gap-5">
//                   <Field label="الاسم الكامل" value={form.name} onChange={(v) => updateForm({ name: v })} />
//                   <Field label="المسمى الوظيفي" value={form.role} onChange={(v) => updateForm({ role: v })} />
//                   <Field
//                     label="البريد الإلكتروني"
//                     value={form.email}
//                     onChange={(v) => updateForm({ email: v })}
//                     dir="ltr"
//                     type="email"
//                   />
//                   <Field
//                     label="رقم الجوال"
//                     value={form.phone}
//                     onChange={(v) => updateForm({ phone: v })}
//                   />
//                 </div>
//               </Section>

//               <Section icon="lock" title="الأمان وكلمة المرور">
//                 <div className="grid grid-cols-2 gap-5">
//                   <Field label="كلمة المرور الحالية" value="" onChange={() => {}} type="password" placeholder="••••••••" />
//                   <Field label="كلمة المرور الجديدة" value="" onChange={() => {}} type="password" placeholder="••••••••" />
//                 </div>
//                 <p className="text-xs text-slate-400 mt-3">
//                   اترك الحقول فارغة إذا لم ترد تغيير كلمة المرور
//                 </p>
//               </Section>
//             </>
//           )}

//           {/* ── TAB: Laundry ── */}
//           {activeTab === "laundry" && (
//             <>
//               <Section icon="store" title="معلومات المغسلة">
//                 <div className="grid grid-cols-2 gap-5">
//                   <div className="col-span-2">
//                     <Field
//                       label="اسم المغسلة"
//                       value={form.businessName}
//                       onChange={(v) => updateForm({ businessName: v })}
//                     />
//                   </div>
//                   <div className="col-span-2">
//                     <Field
//                       label="العنوان التفصيلي"
//                       value={form.businessAddress}
//                       onChange={(v) => updateForm({ businessAddress: v })}
//                     />
//                   </div>
//                   <Field
//                     label="رقم هاتف المغسلة"
//                     value={form.phone}
//                     onChange={(v) => updateForm({ phone: v })}
//                   />
//                   <Field
//                     label="البريد الإلكتروني للمغسلة"
//                     value={form.email}
//                     onChange={(v) => updateForm({ email: v })}
//                     dir="ltr"
//                     type="email"
//                   />
//                 </div>
//               </Section>

//               <Section icon="schedule" title="ساعات العمل">
//                 <div className="grid grid-cols-2 gap-5">
//                   <Field
//                     label="وقت الفتح"
//                     value={prefs.openTime}
//                     onChange={(v) => updatePrefs({ openTime: v })}
//                     type="time"
//                     dir="ltr"
//                   />
//                   <Field
//                     label="وقت الإغلاق"
//                     value={prefs.closeTime}
//                     onChange={(v) => updatePrefs({ closeTime: v })}
//                     type="time"
//                     dir="ltr"
//                   />
//                 </div>
//                 <div className="mt-4 space-y-3">
//                   <ToggleRow
//                     label="استقبال الطلبات"
//                     description="السماح للعملاء بتقديم طلبات جديدة"
//                     checked={prefs.acceptOrders}
//                     onChange={(v) => updatePrefs({ acceptOrders: v })}
//                   />
//                   <ToggleRow
//                     label="تفعيل الخدمة السريعة افتراضياً"
//                     description="تفعيل خيار الخدمة السريعة على الخدمات الجديدة"
//                     checked={prefs.fastServiceDefault}
//                     onChange={(v) => updatePrefs({ fastServiceDefault: v })}
//                   />
//                 </div>
//               </Section>
//             </>
//           )}

//           {/* ── TAB: Preferences ── */}
//           {activeTab === "preferences" && (
//             <>
//               <Section icon="notifications_active" title="تفضيلات الإشعارات">
//                 <div className="space-y-3">
//                   <ToggleRow
//                     label="تنبيهات الطلبات الجديدة"
//                     description="إشعار فوري عند وصول طلب جديد"
//                     checked={prefs.orderAlerts}
//                     onChange={(v) => updatePrefs({ orderAlerts: v })}
//                   />
//                   <ToggleRow
//                     label="إشعارات البريد الإلكتروني"
//                     description="تلقي ملخص يومي عبر البريد"
//                     checked={prefs.emailNotifications}
//                     onChange={(v) => updatePrefs({ emailNotifications: v })}
//                   />
//                   <ToggleRow
//                     label="إشعارات SMS"
//                     description="رسائل نصية للطلبات العاجلة"
//                     checked={prefs.smsNotifications}
//                     onChange={(v) => updatePrefs({ smsNotifications: v })}
//                   />
//                 </div>
//               </Section>

//               <Section icon="translate" title="اللغة">
//                 <div className="flex gap-3">
//                   {[
//                     { id: "ar" as const, label: "العربية", flag: "🇸🇦" },
//                     { id: "en" as const, label: "English", flag: "🇬🇧" },
//                   ].map((lang) => (
//                     <button
//                       key={lang.id}
//                       onClick={() => updatePrefs({ language: lang.id })}
//                       className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 transition-all ${
//                         prefs.language === lang.id
//                           ? "border-[#006B5D] bg-[#006B5D]/5 font-bold text-[#006B5D]"
//                           : "border-[#E4E9EF] text-slate-600 hover:border-[#006B5D]/30"
//                       }`}
//                     >
//                       <span>{lang.flag}</span>
//                       {lang.label}
//                     </button>
//                   ))}
//                 </div>
//               </Section>

//               <Section icon="security" title="منطقة الخطر">
//                 <div className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-100">
//                   <div>
//                     <p className="font-bold text-sm text-red-700">حذف الحساب</p>
//                     <p className="text-xs text-red-500 mt-0.5">هذا الإجراء لا يمكن التراجع عنه</p>
//                   </div>
//                   <button className="px-4 py-2 text-sm font-bold text-red-600 border-2 border-red-200 rounded-xl hover:bg-red-100 transition-all">
//                     حذف الحساب
//                   </button>
//                 </div>
//               </Section>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ── Sub-components ── */

// function Section({
//   icon,
//   title,
//   children,
// }: {
//   icon: string;
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <section className="bg-white rounded-2xl shadow-sm border border-[#0D1F3C]/5 overflow-hidden">
//       <div className="px-6 py-4 border-b border-[#E4E9EF] bg-[#EFF4FA]/30 flex items-center gap-3">
//         <span
//           className="material-symbols-outlined text-[#00C9B1]"
//           style={{ fontVariationSettings: "'FILL' 1" }}
//         >
//           {icon}
//         </span>
//         <h3
//           className="font-bold text-[#0D1F3C]"
//           style={{ fontFamily: "Cairo, sans-serif" }}
//         >
//           {title}
//         </h3>
//       </div>
//       <div className="p-6">{children}</div>
//     </section>
//   );
// }

// function Field({
//   label,
//   value,
//   onChange,
//   dir,
//   type = "text",
//   placeholder,
// }: {
//   label: string;
//   value: string;
//   onChange: (v: string) => void;
//   dir?: string;
//   type?: string;
//   placeholder?: string;
// }) {
//   return (
//     <div>
//       <label className="block text-sm font-bold text-[#0D1F3C] mb-2">{label}</label>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         dir={dir}
//         placeholder={placeholder}
//         className={`w-full bg-[#EFF4FA] border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#006B5D]/20 outline-none text-sm ${
//           dir === "ltr" ? "text-left" : ""
//         }`}
//       />
//     </div>
//   );
// }

// function ToggleRow({
//   label,
//   description,
//   checked,
//   onChange,
// }: {
//   label: string;
//   description: string;
//   checked: boolean;
//   onChange: (v: boolean) => void;
// }) {
//   return (
//     <div className="flex items-center justify-between p-4 bg-[#EFF4FA] rounded-2xl">
//       <div>
//         <p className="font-bold text-sm text-[#0D1F3C]">{label}</p>
//         <p className="text-xs text-slate-500 mt-0.5">{description}</p>
//       </div>
//       <button
//         onClick={() => onChange(!checked)}
//         className={`w-12 h-6 rounded-full relative transition-all shadow-inner flex-shrink-0 ${
//           checked ? "bg-[#00C9B1]" : "bg-slate-300"
//         }`}
//       >
//         <span
//           className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${
//             checked ? "left-1" : "right-1"
//           }`}
//         />
//       </button>
//     </div>
//   );
// }

// function StatRow({
//   icon,
//   label,
//   value,
// }: {
//   icon: string;
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="flex items-center justify-between">
//       <div className="flex items-center gap-2 text-slate-500">
//         <span className="material-symbols-outlined text-sm">{icon}</span>
//         <span className="text-xs">{label}</span>
//       </div>
//       <span className="text-sm font-bold text-[#0D1F3C]">{value}</span>
//     </div>
//   );
// }






import { useState } from "react";
import { useProvider } from "./context/ProviderContext";

type Tab = "personal" | "laundry";

interface WorkHours {
  openTime: string;
  closeTime: string;
  acceptOrders: boolean;
  fastServiceDefault: boolean;
}

export default function Profile() {
  const { profile, updateProfile, orderStats, showToast } = useProvider();
  const [activeTab, setActiveTab] = useState<Tab>("personal");
  const [form, setForm] = useState({ ...profile });
  const [workHours, setWorkHours] = useState<WorkHours>({
    openTime: "08:00",
    closeTime: "22:00",
    acceptOrders: true,
    fastServiceDefault: true,
  });

  const updateForm = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));
  const updateWorkHours = (patch: Partial<WorkHours>) => setWorkHours((w) => ({ ...w, ...patch }));

  const handleSave = () => {
    updateProfile(form);
    showToast("تم حفظ التغييرات بنجاح");
  };

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "personal", label: "معلوماتي", icon: "badge" },
    { id: "laundry", label: "المغسلة", icon: "store" },
  ];

  return (
    <div className="p-8 min-h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2
            className="text-3xl font-bold text-[#0D1F3C]"
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            الملف الشخصي
          </h2>
          <p className="text-slate-500 mt-1">إدارة بياناتك الشخصية وإعدادات المغسلة</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-[#006B5D] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-[#005046] shadow-lg shadow-[#006B5D]/20 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined">save</span>
          حفظ التغييرات
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* ── Left card: Avatar + stats + nav ── */}
        <div className="col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-[#0D1F3C]/5 p-6 flex flex-col items-center text-center sticky top-24">
            {/* Avatar */}
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full border-4 border-[#00C9B1] bg-[#006B5D]/10 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-5xl text-[#006B5D]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  person
                </span>
              </div>
              <button className="absolute bottom-0 left-0 w-7 h-7 bg-[#006B5D] text-white rounded-full flex items-center justify-center shadow hover:bg-[#005046] transition-all">
                <span className="material-symbols-outlined text-xs">photo_camera</span>
              </button>
            </div>

            <h3
              className="text-lg font-bold text-[#0D1F3C] leading-snug"
              style={{ fontFamily: "Cairo, sans-serif" }}
            >
              {form.name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">صاحب المغسلة</p>
            <p className="text-xs text-[#006B5D] font-bold mt-1">{form.businessName}</p>

            <div className="mt-3 px-3 py-1.5 bg-[#006B5D]/10 text-[#006B5D] rounded-full text-xs font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#006B5D] rounded-full animate-pulse" />
              حساب نشط
            </div>

            {/* Stats */}
            <div className="w-full mt-6 pt-5 border-t border-[#E4E9EF] space-y-3">
              <StatRow
                icon="local_laundry_service"
                label="طلبات مُنجزة"
                value={String(orderStats.done + orderStats.processing)}
              />
              <StatRow icon="star" label="تقييم المغسلة" value="٤.٨" />
              <StatRow icon="calendar_month" label="عضو منذ" value="يناير ٢٠٢٤" />
            </div>

            {/* Tab nav */}
            <div className="w-full mt-6 pt-5 border-t border-[#E4E9EF] space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-right transition-all text-sm font-medium ${
                    activeTab === tab.id
                      ? "bg-[#006B5D]/10 text-[#006B5D] font-bold"
                      : "text-slate-500 hover:bg-[#EFF4FA] hover:text-[#0D1F3C]"
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-base"
                    style={activeTab === tab.id ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Tab content ── */}
        <div className="col-span-9 space-y-5">
          {/* ── TAB: Personal ── */}
          {activeTab === "personal" && (
            <>
              <Section icon="badge" title="المعلومات الشخصية">
                <div className="grid grid-cols-2 gap-5">
                  <Field
                    label="الاسم الكامل"
                    value={form.name}
                    onChange={(v) => updateForm({ name: v })}
                  />
                  <ReadOnlyField label="المسمى الوظيفي" value="صاحب المغسلة" />
                  <Field
                    label="البريد الإلكتروني"
                    value={form.email}
                    onChange={(v) => updateForm({ email: v })}
                    dir="ltr"
                    type="email"
                  />
                  <Field
                    label="رقم الجوال"
                    value={form.phone}
                    onChange={(v) => updateForm({ phone: v })}
                  />
                </div>
              </Section>

              <Section icon="lock" title="الأمان وكلمة المرور">
                <div className="grid grid-cols-2 gap-5">
                  <Field
                    label="كلمة المرور الحالية"
                    value=""
                    onChange={() => {}}
                    type="password"
                    placeholder="••••••••"
                  />
                  <Field
                    label="كلمة المرور الجديدة"
                    value=""
                    onChange={() => {}}
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-3">
                  اترك الحقول فارغة إذا لم ترد تغيير كلمة المرور
                </p>
              </Section>
            </>
          )}

          {/* ── TAB: Laundry ── */}
          {activeTab === "laundry" && (
            <>
              <Section icon="store" title="معلومات المغسلة">
                <div className="grid grid-cols-2 gap-5">
                  <div className="col-span-2">
                    <ReadOnlyField label="اسم المغسلة" value={form.businessName} />
                  </div>
                  <div className="col-span-2">
                    <Field
                      label="العنوان التفصيلي"
                      value={form.businessAddress}
                      onChange={(v) => updateForm({ businessAddress: v })}
                    />
                  </div>
                  <Field
                    label="رقم هاتف المغسلة"
                    value={form.phone}
                    onChange={(v) => updateForm({ phone: v })}
                  />
                  <Field
                    label="البريد الإلكتروني للمغسلة"
                    value={form.email}
                    onChange={(v) => updateForm({ email: v })}
                    dir="ltr"
                    type="email"
                  />
                </div>
              </Section>

              <Section icon="schedule" title="ساعات العمل">
                <div className="grid grid-cols-2 gap-5">
                  <Field
                    label="وقت الفتح"
                    value={workHours.openTime}
                    onChange={(v) => updateWorkHours({ openTime: v })}
                    type="time"
                    dir="ltr"
                  />
                  <Field
                    label="وقت الإغلاق"
                    value={workHours.closeTime}
                    onChange={(v) => updateWorkHours({ closeTime: v })}
                    type="time"
                    dir="ltr"
                  />
                </div>
                <div className="mt-4 space-y-3">
                  <ToggleRow
                    label="استقبال الطلبات"
                    description="السماح للعملاء بتقديم طلبات جديدة"
                    checked={workHours.acceptOrders}
                    onChange={(v) => updateWorkHours({ acceptOrders: v })}
                  />
                  <ToggleRow
                    label="تفعيل الخدمة السريعة افتراضياً"
                    description="تفعيل خيار الخدمة السريعة على الخدمات الجديدة"
                    checked={workHours.fastServiceDefault}
                    onChange={(v) => updateWorkHours({ fastServiceDefault: v })}
                  />
                </div>
              </Section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function Section({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-[#0D1F3C]/5 overflow-hidden">
      <div className="px-6 py-4 border-b border-[#E4E9EF] bg-[#EFF4FA]/30 flex items-center gap-3">
        <span
          className="material-symbols-outlined text-[#00C9B1]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
        <h3
          className="font-bold text-[#0D1F3C]"
          style={{ fontFamily: "Cairo, sans-serif" }}
        >
          {title}
        </h3>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  dir,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  dir?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-[#0D1F3C] mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        dir={dir}
        placeholder={placeholder}
        className={`w-full bg-[#EFF4FA] border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#006B5D]/20 outline-none text-sm ${
          dir === "ltr" ? "text-left" : ""
        }`}
      />
    </div>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-sm font-bold text-[#0D1F3C] mb-2">
        {label}
        <span className="mr-2 text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
          غير قابل للتعديل
        </span>
      </label>
      <div className="w-full bg-[#F6FAFF] border border-dashed border-[#0D1F3C]/10 rounded-xl py-3 px-4 text-sm text-slate-500 cursor-not-allowed select-none">
        {value}
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-[#EFF4FA] rounded-2xl">
      <div>
        <p className="font-bold text-sm text-[#0D1F3C]">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 rounded-full relative transition-all shadow-inner flex-shrink-0 ${
          checked ? "bg-[#00C9B1]" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${
            checked ? "left-1" : "right-1"
          }`}
        />
      </button>
    </div>
  );
}

function StatRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
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