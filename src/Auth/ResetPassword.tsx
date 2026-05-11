
// import { useState, useEffect } from "react";
// import "./ResetPassword.css";

// // ─── Types ────────────────────────────────────────────────────────────────────
// interface PasswordRule {
//   id: string;
//   label: string;
//   test: (value: string) => boolean;
// }

// const PASSWORD_RULES: PasswordRule[] = [
//   {
//     id: "length",
//     label: "على الأقل 8 أحرف",
//     test: (v) => v.length >= 8,
//   },
//   {
//     id: "number",
//     label: "يجب أن تحتوي على رقم واحد على الأقل",
//     test: (v) => /\d/.test(v),
//   },
// ];

// // ─── Eye Toggle ───────────────────────────────────────────────────────────────
// function EyeToggle({ visible, onClick }: { visible: boolean; onClick: () => void }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       tabIndex={-1}
//       aria-label={visible ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
//       className="absolute left-4 top-1/2 -translate-y-1/2 text-[#75777e] hover:text-[#006b5d] transition-colors focus:outline-none"
//     >
//       <span
//         className="material-symbols-outlined select-none text-[22px]"
//         style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}
//       >
//         {visible ? "visibility_off" : "visibility"}
//       </span>
//     </button>
//   );
// }

// // ─── Password Field ───────────────────────────────────────────────────────────
// function PasswordField({
//   id,
//   label,
//   value,
//   onChange,
//   error,
// }: {
//   id: string;
//   label: string;
//   value: string;
//   onChange: (v: string) => void;
//   error?: string;
// }) {
//   const [show, setShow] = useState(false);

//   return (
//     <div className="flex flex-col gap-2">
//       <label
//         htmlFor={id}
//         className="text-right text-[#1b1b1e]"
//         style={{ fontFamily: "Tajawal", fontSize: 14, fontWeight: 700 }}
//       >
//         {label}
//       </label>

//       <div className="relative">
//         <input
//           id={id}
//           name={id}
//           type={show ? "text" : "password"}
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           placeholder="••••••••"
//           dir="rtl"
//           className={[
//             "w-full rounded-xl px-5 py-4 text-right border-none outline-none",
//             "placeholder:tracking-[0.25em] placeholder:text-[#75777e]",
//             "transition-all duration-200",
//             error
//               ? "bg-[#ffdad6]/40 ring-2 ring-[#ba1a1a]/50 focus:ring-[#ba1a1a]/60"
//               : "bg-[#F1F5F9] ring-0 focus:ring-2 focus:ring-[#006b5d]/25 focus:bg-white",
//           ].join(" ")}
//           style={{ fontFamily: "Tajawal", fontSize: 16, paddingLeft: "3rem" }}
//         />
//         <EyeToggle visible={show} onClick={() => setShow((p) => !p)} />
//       </div>

//       {/* Error */}
//       <div
//         style={{
//           maxHeight: error ? "2rem" : "0px",
//           opacity: error ? 1 : 0,
//           overflow: "hidden",
//           transition: "max-height 0.25s ease, opacity 0.25s ease",
//         }}
//       >
//         <p
//           className="flex items-center justify-end gap-1 text-[#ba1a1a]"
//           style={{ fontFamily: "Tajawal", fontSize: 12 }}
//         >
//           {error}
//           <span
//             className="material-symbols-outlined"
//             style={{
//               fontSize: 14,
//               fontVariationSettings: "'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 20",
//             }}
//           >
//             error
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

// // ─── Main Page ────────────────────────────────────────────────────────────────
// export default function ResetPassword() {
//   const [newPassword, setNewPassword]           = useState("");
//   const [confirmPassword, setConfirmPassword]   = useState("");
//   const [errors, setErrors]                     = useState<{ new?: string; confirm?: string }>({});
//   const [submitted, setSubmitted]               = useState(false);
//   const [success, setSuccess]                   = useState(false);
//   const [mounted, setMounted]                   = useState(false);

//   useEffect(() => {
//     const t = setTimeout(() => setMounted(true), 40);
//     return () => clearTimeout(t);
//   }, []);

//   const ruleResults = PASSWORD_RULES.map((r) => ({ ...r, passed: r.test(newPassword) }));

//   function validate(): boolean {
//     const e: typeof errors = {};
//     if (!newPassword)                        e.new = "كلمة المرور مطلوبة";
//     else if (newPassword.length < 8)         e.new = "يجب أن تكون 8 أحرف على الأقل";
//     else if (!/\d/.test(newPassword))        e.new = "يجب أن تحتوي على رقم واحد على الأقل";

//     if (!confirmPassword)                    e.confirm = "تأكيد كلمة المرور مطلوب";
//     else if (newPassword !== confirmPassword) e.confirm = "كلمتا المرور غير متطابقتين";

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   }

//   function handleSubmit(ev: React.FormEvent) {
//     ev.preventDefault();
//     setSubmitted(true);
//     if (validate()) setTimeout(() => setSuccess(true), 350);
//   }

//   useEffect(() => {
//     if (submitted) validate();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [newPassword, confirmPassword]);

//   return (
//     <>
//       <link
//         href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&family=Tajawal:wght@400;500;700&display=swap"
//         rel="stylesheet"
//       />
//       <link
//         href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
//         rel="stylesheet"
//       />
// {/* 
//       <style>{`
//         .material-symbols-outlined {
//           font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
//           vertical-align: middle;
//           font-family: 'Material Symbols Outlined';
//         }
//         @keyframes fadeSlideUp {
//           from { opacity: 0; transform: translateY(16px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; } to { opacity: 1; }
//         }
//         @keyframes scaleIn {
//           from { opacity: 0; transform: scale(0.9); }
//           to   { opacity: 1; transform: scale(1); }
//         }
//         @keyframes successPop {
//           0%   { opacity: 0; transform: scale(0.8); }
//           60%  { transform: scale(1.06); }
//           100% { opacity: 1; transform: scale(1); }
//         }
//         .anim-fsu { animation: fadeSlideUp 0.45s ease both; }
//         .anim-fi  { animation: fadeIn 0.5s ease both; }
//         .anim-si  { animation: scaleIn 0.5s cubic-bezier(.22,1,.36,1) both; }
//         .anim-sp  { animation: successPop 0.55s cubic-bezier(.22,1,.36,1) both; }
//         .d1 { animation-delay: 0.05s; }
//         .d2 { animation-delay: 0.13s; }
//         .d3 { animation-delay: 0.21s; }
//         .d4 { animation-delay: 0.29s; }
//         .d5 { animation-delay: 0.37s; }
//         .d6 { animation-delay: 0.45s; }
//       `}</style> */}

    
//       <div
//         dir="rtl"
//         className="flex min-h-screen overflow-x-hidden"
//         style={{ backgroundColor: "#fbf8fc", fontFamily: "Tajawal" }}
//       >

//         {/* ── RIGHT: Form ─────────────────────────────────────────────── */}
//         <section className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-10">
//           <div
//             className="w-full flex flex-col"
//             style={{
//               maxWidth: 480,
//               opacity: mounted ? 1 : 0,
//               transition: "opacity 0.4s ease",
//             }}
//           >
//             {/* Mobile logo */}
//             <div className="lg:hidden flex justify-center mb-8 anim-fsu d1">
//               <span style={{ fontFamily: "Cairo", fontSize: 32, fontWeight: 700, color: "#006b5d" }}>
//                 نظيف
//               </span>
//             </div>

//             {/* Back button */}
//             <div className="mb-10 anim-fsu d1">
//               <button
//                 type="button"
//                 className="flex items-center gap-2 group"
//                 style={{ color: "#44474d", background: "none", border: "none", cursor: "pointer" }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#006b5d")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#44474d")}
//               >
//                 {/* arrow_back points LEFT which = "back" in RTL reading direction */}
//                 <span
//                   className="material-symbols-outlined transition-transform duration-200 group-hover:-translate-x-1"
//                   style={{ fontSize: 22 }}
//                 >
//                   arrow_back
//                 </span>
//                 <span style={{ fontFamily: "Tajawal", fontSize: 16 }}>
//                   العودة لتسجيل الدخول
//                 </span>
//               </button>
//             </div>

//             {/* Heading */}
//             <div className="mb-7 anim-fsu d2" style={{ textAlign: "right" }}>
//               <h1
//                 className="mb-2"
//                 style={{
//                   fontFamily: "Cairo",
//                   fontSize: 32,
//                   fontWeight: 700,
//                   color: "#000719",
//                   lineHeight: 1.3,
//                 }}
//               >
//                 إعادة تعيين كلمة المرور
//               </h1>
//               <p style={{ fontFamily: "Tajawal", fontSize: 16, color: "#44474d", lineHeight: 1.6 }}>
//                 أدخل كلمة المرور الجديدة الخاصة بك أدناه.
//               </p>
//             </div>

//             {/* ── Success ──────────────────────────────────────── */}
//             {success ? (
//               <div className="flex flex-col items-center gap-5 py-10 anim-sp">
//                 <div
//                   className="w-20 h-20 rounded-full flex items-center justify-center"
//                   style={{ backgroundColor: "rgba(0,107,93,0.1)" }}
//                 >
//                   <span
//                     className="material-symbols-outlined"
//                     style={{
//                       fontSize: 48,
//                       color: "#006b5d",
//                       fontVariationSettings: "'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 48",
//                     }}
//                   >
//                     check_circle
//                   </span>
//                 </div>
//                 <h2 style={{ fontFamily: "Cairo", fontSize: 24, fontWeight: 700, color: "#000719", textAlign: "center" }}>
//                   تم تحديث كلمة المرور!
//                 </h2>
//                 <p style={{ fontFamily: "Tajawal", fontSize: 16, color: "#44474d", textAlign: "center" }}>
//                   يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.
//                 </p>
//                 <button
//                   style={{
//                     fontFamily: "Cairo", fontSize: 18, fontWeight: 700,
//                     backgroundColor: "#006b5d", color: "#fff",
//                     borderRadius: 9999, padding: "12px 40px", marginTop: 16,
//                     border: "none", cursor: "pointer", transition: "background 0.2s, transform 0.1s",
//                   }}
//                   onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#005046")}
//                   onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#006b5d")}
//                   onMouseDown={(e)  => (e.currentTarget.style.transform = "scale(0.98)")}
//                   onMouseUp={(e)    => (e.currentTarget.style.transform = "scale(1)")}
//                 >
//                   تسجيل الدخول
//                 </button>
//               </div>

//             ) : (
//               /* ── Form ──────────────────────────────────────────── */
//               <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

//                 <div className="anim-fsu d3">
//                   <PasswordField
//                     id="new_password"
//                     label="كلمة المرور الجديدة"
//                     value={newPassword}
//                     onChange={setNewPassword}
//                     error={errors.new}
//                   />
//                 </div>

//                 <div className="anim-fsu d4">
//                   <PasswordField
//                     id="confirm_password"
//                     label="تأكيد كلمة المرور الجديدة"
//                     value={confirmPassword}
//                     onChange={setConfirmPassword}
//                     error={errors.confirm}
//                   />
//                 </div>

//                 {/* Password rules */}
//                 <div
//                   className="rounded-xl anim-fsu d5"
//                   style={{ backgroundColor: "#f5f3f6", padding: 16 }}
//                 >
//                   <ul className="flex flex-col gap-2">
//                     {ruleResults.map((rule) => (
//                       <li
//                         key={rule.id}
//                         className="flex items-center gap-2"
//                         style={{
//                           // Items go right-to-left: icon on the right, text on the left of icon
//                           flexDirection: "row-reverse",
//                           justifyContent: "flex-start",
//                           color: rule.passed ? "#006b5d" : "#44474d",
//                           transition: "color 0.3s",
//                         }}
//                       >
//                         <span
//                           className="material-symbols-outlined"
//                           style={{
//                             fontSize: 16,
//                             fontVariationSettings: rule.passed
//                               ? "'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 20"
//                               : "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 20",
//                             transition: "font-variation-settings 0.3s",
//                           }}
//                         >
//                           {rule.passed ? "check_circle" : "circle"}
//                         </span>
//                         <span style={{ fontFamily: "Tajawal", fontSize: 12 }}>
//                           {rule.label}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 {/* Submit */}
//                 <div className="anim-fsu d6">
//                   <button
//                     type="submit"
//                     style={{
//                       width: "100%",
//                       backgroundColor: "#006b5d",
//                       color: "#fff",
//                       fontFamily: "Cairo",
//                       fontSize: 20,
//                       fontWeight: 700,
//                       padding: "16px 0",
//                       borderRadius: 9999,
//                       border: "none",
//                       cursor: "pointer",
//                       boxShadow: "0 8px 24px rgba(0,107,93,0.2)",
//                       transition: "background 0.2s, transform 0.1s",
//                     }}
//                     onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#005046")}
//                     onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#006b5d")}
//                     onMouseDown={(e)  => (e.currentTarget.style.transform = "scale(0.98)")}
//                     onMouseUp={(e)    => (e.currentTarget.style.transform = "scale(1)")}
//                   >
//                     تحديث كلمة المرور
//                   </button>
//                 </div>
//               </form>
//             )}

//             {/* Footer */}
//             {!success && (
//               <div
//                 className="anim-fi d6"
//                 style={{
//                   marginTop: 40,
//                   paddingTop: 24,
//                   borderTop: "1px solid #c5c6ce",
//                   textAlign: "center",
//                 }}
//               >
//                 <p style={{ fontFamily: "Tajawal", fontSize: 14, color: "#44474d" }}>
//                   هل تواجه مشكلة؟{" "}
//                   <a
//                     href="#"
//                     style={{ color: "#006b5d", fontWeight: 700, textDecoration: "none" }}
//                     onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "underline")}
//                     onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "none")}
//                   >
//                     تواصل مع الدعم الفني
//                   </a>
//                 </p>
//               </div>
//             )}
//           </div>
//         </section>

//         {/* ── LEFT: Branded panel ─────────────────────────────────────── */}
//         <aside
//           className="hidden lg:flex w-1/2 relative overflow-hidden"
//           style={{ backgroundColor: "#0d1f3c" }}
//         >
//           {/* BG image */}
//           <div className="absolute inset-0 z-0">
//             <img
//               src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwXQi0L8icod3p_r2oR-dii3EFFYhy4i8i956d_ql9xhB40BZM5Zf_5ZjbP2iOrJE445u4jAIuEgCn0IPUK8bQN3xNvv882DygdF0D68BaiLwg8-R1aJ9RAWekTq4pivKell8F-KH-1aYFGfBzLZmuVSS58QhFtiE2dXZnhen-5kctDKRO1kp-yI36rkOY2HfjQZ08UP3XYH6-59MznKre_vS0LCQwTrcR_RpdY6M13fAAEL2ebPwIfFunurS8awwI2trF3YdeMPaQ"
//               alt="Laundry Background"
//               className="w-full h-full object-cover"
//               style={{ opacity: 0.3, mixBlendMode: "luminosity" }}
//             />
//             <div
//               className="absolute inset-0"
//               style={{
//                 background:
//                   "linear-gradient(to top, #0d1f3c 0%, transparent 50%, rgba(13,31,60,0.4) 100%)",
//               }}
//             />
//           </div>

//           {/* Blobs */}
//           <div
//             className="absolute pointer-events-none rounded-full"
//             style={{
//               bottom: "-10%", left: "-10%",
//               width: 500, height: 500,
//               background: "rgba(0,107,93,0.1)",
//               filter: "blur(100px)",
//             }}
//           />
//           <div
//             className="absolute pointer-events-none rounded-full"
//             style={{
//               top: "-10%", right: "-10%",
//               width: 300, height: 300,
//               background: "rgba(95,250,224,0.05)",
//               filter: "blur(80px)",
//             }}
//           />

//           {/* Panel content */}
//           <div
//             className="relative z-10 w-full h-full flex flex-col items-center justify-center"
//             style={{ padding: "0 48px", textAlign: "center" }}
//           >
//             <div
//               className="mb-8 anim-si"
//               style={{
//                 padding: 24,
//                 background: "rgba(255,255,255,0.05)",
//                 backdropFilter: "blur(12px)",
//                 borderRadius: 24,
//                 border: "1px solid rgba(255,255,255,0.1)",
//               }}
//             >
//               <span
//                 style={{
//                   fontFamily: "Cairo",
//                   fontSize: 64,
//                   fontWeight: 700,
//                   color: "#5ffae0",
//                   lineHeight: 1,
//                 }}
//               >
//                 نظيف
//               </span>
//             </div>

//             <h2
//               className="mb-5 anim-fsu d2"
//               style={{ fontFamily: "Cairo", fontSize: 24, fontWeight: 700, color: "#ffffff" }}
//             >
//               الرفيق الموثوق لملابسك
//             </h2>

//             <p
//               className="anim-fsu d3"
//               style={{
//                 fontFamily: "Tajawal",
//                 fontSize: 18,
//                 lineHeight: 1.6,
//                 color: "#7787aa",
//                 maxWidth: 400,
//               }}
//             >
//               نحن نضمن لك جودة استثنائية وعناية فائقة لكل قطعة ملابس، لأننا نؤمن أن النظافة هي مفتاح الثقة.
//             </p>
//           </div>
//         </aside>
//       </div>
//     </>
//   );
// }






import { useState, useEffect } from "react";
import "./ResetPassword.css";

import BackButton    from "../components/Auth/Backbutton";
import PasswordField from "../components/Auth/Passwordfield";
import PasswordRules from "../components/Auth/Passwordrules";
import BrandPanel    from "../components/Auth/Brandpanel";

// ─── Password rule definitions ────────────────────────────────────────────────
const PASSWORD_RULES = [
  { id: "length", label: "على الأقل 8 أحرف",                  test: (v: string) => v.length >= 8    },
  { id: "number", label: "يجب أن تحتوي على رقم واحد على الأقل", test: (v: string) => /\d/.test(v) },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ResetPassword() {
  const [newPassword,     setNewPassword]     = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors,          setErrors]          = useState<{ new?: string; confirm?: string }>({});
  const [submitted,       setSubmitted]       = useState(false);
  const [success,         setSuccess]         = useState(false);
  const [mounted,         setMounted]         = useState(false);

  // Fade-in on mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  // Evaluate each rule against current password value
  const ruleResults = PASSWORD_RULES.map((r) => ({
    ...r,
    passed: r.test(newPassword),
  }));

  // ── Validation ──────────────────────────────────────────────────────────────
  function validate(): boolean {
    const e: typeof errors = {};

    if (!newPassword)                         e.new = "كلمة المرور مطلوبة";
    else if (newPassword.length < 8)          e.new = "يجب أن تكون 8 أحرف على الأقل";
    else if (!/\d/.test(newPassword))         e.new = "يجب أن تحتوي على رقم واحد على الأقل";

    if (!confirmPassword)                     e.confirm = "تأكيد كلمة المرور مطلوب";
    else if (newPassword !== confirmPassword)  e.confirm = "كلمتا المرور غير متطابقتين";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // Re-validate live after first submit attempt
  useEffect(() => {
    if (submitted) validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPassword, confirmPassword]);

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setSubmitted(true);
    if (validate()) setTimeout(() => setSuccess(true), 350);
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div
      dir="rtl"
      className="flex min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "#fbf8fc", fontFamily: "Tajawal" }}
    >

      {/* ── RIGHT: Form section ───────────────────────────────────────────── */}
      <section className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-10">
        <div
          className="w-full flex flex-col"
          style={{ maxWidth: 480, opacity: mounted ? 1 : 0, transition: "opacity 0.4s ease" }}
        >

          {/* Mobile-only logo */}
          <div className="lg:hidden flex justify-center mb-8 anim-fsu d1">
            <span style={{ fontFamily: "Cairo", fontSize: 32, fontWeight: 700, color: "#006b5d" }}>
              نظيف
            </span>
          </div>

          {/* ① Back button */}
          <div className="mb-10">
            <BackButton />
          </div>

          {/* ② Page heading */}
          <div className="mb-7 anim-fsu d2" style={{ textAlign: "right" }}>
            <h1
              className="mb-2"
              style={{ fontFamily: "Cairo", fontSize: 32, fontWeight: 700, color: "#000719", lineHeight: 1.3 }}
            >
              إعادة تعيين كلمة المرور
            </h1>
            <p style={{ fontFamily: "Tajawal", fontSize: 16, color: "#44474d", lineHeight: 1.6 }}>
              أدخل كلمة المرور الجديدة الخاصة بك أدناه.
            </p>
          </div>

          {/* ── Success state ─────────────────────────────────────────────── */}
          {success ? (
            <div className="flex flex-col items-center gap-5 py-10 anim-sp">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(0,107,93,0.1)" }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: 48, color: "#006b5d",
                    fontVariationSettings: "'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 48",
                  }}
                >
                  check_circle
                </span>
              </div>

              <h2 style={{ fontFamily: "Cairo", fontSize: 24, fontWeight: 700, color: "#000719", textAlign: "center" }}>
                تم تحديث كلمة المرور!
              </h2>
              <p style={{ fontFamily: "Tajawal", fontSize: 16, color: "#44474d", textAlign: "center" }}>
                يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.
              </p>

              <button
                style={{
                  fontFamily: "Cairo", fontSize: 18, fontWeight: 700,
                  backgroundColor: "#006b5d", color: "#fff",
                  borderRadius: 9999, padding: "12px 40px", marginTop: 16,
                  border: "none", cursor: "pointer", transition: "background 0.2s, transform 0.1s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#005046")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#006b5d")}
                onMouseDown={(e)  => (e.currentTarget.style.transform = "scale(0.98)")}
                onMouseUp={(e)    => (e.currentTarget.style.transform = "scale(1)")}
              >
                تسجيل الدخول
              </button>
            </div>

          ) : (
            /* ── Form ──────────────────────────────────────────────────────── */
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

              {/* ③ New password field */}
              <div className="anim-fsu d3">
                <PasswordField
                  id="new_password"
                  label="كلمة المرور الجديدة"
                  value={newPassword}
                  onChange={setNewPassword}
                  error={errors.new}
                />
              </div>

              {/* ④ Confirm password field */}
              <div className="anim-fsu d4">
                <PasswordField
                  id="confirm_password"
                  label="تأكيد كلمة المرور الجديدة"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  error={errors.confirm}
                />
              </div>

              {/* ⑤ Password rules checklist */}
              <PasswordRules rules={ruleResults} />

              {/* ⑥ Submit button */}
              <div className="anim-fsu d6">
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#006b5d", color: "#fff",
                    fontFamily: "Cairo", fontSize: 20, fontWeight: 700,
                    padding: "16px 0", borderRadius: 9999,
                    border: "none", cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(0,107,93,0.2)",
                    transition: "background 0.2s, transform 0.1s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#005046")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#006b5d")}
                  onMouseDown={(e)  => (e.currentTarget.style.transform = "scale(0.98)")}
                  onMouseUp={(e)    => (e.currentTarget.style.transform = "scale(1)")}
                >
                  تحديث كلمة المرور
                </button>
              </div>
            </form>
          )}

          {/* Footer link */}
          {!success && (
            <div
              className="anim-fi d6"
              style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid #c5c6ce", textAlign: "center" }}
            >
              <p style={{ fontFamily: "Tajawal", fontSize: 14, color: "#44474d" }}>
                هل تواجه مشكلة؟{" "}
                <a
                  href="#"
                  style={{ color: "#006b5d", fontWeight: 700, textDecoration: "none" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "underline")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "none")}
                >
                  تواصل مع الدعم الفني
                </a>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── LEFT: Branded panel ⑦ ─────────────────────────────────────────── */}
      <BrandPanel />
    </div>
  );
}