
"use client";

import { useEffect, useRef, useState } from "react";
import "./ForgotPassword.css";

/* ── Types ── */
type Status = "idle" | "loading" | "success" | "error";

/* ── Particle config generated once per mount ── */
interface ParticleConfig {
  size: number;
  left: number;
  duration: number;
  delay: number;
}

function generateParticles(count: number): ParticleConfig[] {
  return Array.from({ length: count }, () => ({
    size: 6 + Math.random() * 18,
    left: Math.random() * 100,
    duration: 6 + Math.random() * 10,
    delay: -Math.random() * 12,
  }));
}

/* ── Particles sub-component ── */
function Particles() {
  const particles = useRef<ParticleConfig[]>(generateParticles(18));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.current.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            animation: `floatUp ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Spinning ring sub-component ── */
function SpinningRing() {
  return (
    <div className="spin-ring w-[120px] h-[120px] mx-auto mb-5">
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
        <circle cx="60" cy="60" r="54" stroke="rgba(95,250,224,.15)" strokeWidth="2" />
        <circle cx="60" cy="60" r="54" stroke="#5ffae0" strokeWidth="2"
          strokeDasharray="80 260" strokeLinecap="round" />
        <circle cx="60" cy="60" r="42" stroke="rgba(95,250,224,.08)" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="42" stroke="#5ffae0" strokeWidth="1.5" opacity=".4"
          strokeDasharray="40 224" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* ── Right decorative panel ── */
function RightSide() {
  return (
    <section className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJgS0LlTXWx0SN8ZDHxAAi1GFCfwAsQ4fXMCgZ5Jd_jHXeLwVOdujpWYm521EmhT1aZh2NiRh3Lvc-Z37j-lxqAfmF7npdK6Sjr1qyn9gvrddJo8ug4ppGsZSknk7DQeP9IaTe600lnCsSCa-YI2E4Go8gSGdR1Nsc05ztFwTXISI2cQCFLhThartIcJwnMEpztr-mAyBV0Va5wyinj2GqU-XbJku6NheSsuX2KiI_jKicWWcJtVV3AKkzyzh56soAklvv1BL3WeK9"
        className="absolute inset-0 w-full h-full object-cover slow-zoom"
        alt=""
      />
      <div className="absolute inset-0 bg-gradient-to-l from-[#0d1f3c] via-[#0d1f3c]/80 to-transparent" />
      <Particles />
      <div className="right-content relative z-10 text-center text-white px-10">
        <SpinningRing />
        <div className="glow-pulse text-[64px] font-black text-[#5ffae0] leading-none">
          نظيف
        </div>
        <h2 className="text-3xl font-bold mt-4">نعتني بملابسك كأنها لنا</h2>
        <p className="mt-4 text-gray-300 max-w-md mx-auto leading-relaxed">
          انضم إلى آلاف المستخدمين الذين يثقون في نظيف للحصول على أفضل خدمات الغسيل
        </p>
      </div>
    </section>
  );
}

/* ── Button config per status ── */
const BUTTON_CONFIG: Record<Status, { label: string; icon: string; bg: string; shadow: string }> = {
  idle: {
    label: "إرسال رابط الاستعادة",
    icon: "send",
    bg: "linear-gradient(135deg,#006b5d,#00a896)",
    shadow: "0 6px 24px rgba(0,107,93,.3)",
  },
  loading: {
    label: "جاري الإرسال...",
    icon: "progress_activity",
    bg: "linear-gradient(135deg,#006b5d,#00a896)",
    shadow: "0 6px 24px rgba(0,107,93,.3)",
  },
  success: {
    label: "تم الإرسال بنجاح!",
    icon: "check_circle",
    bg: "linear-gradient(135deg,#059669,#34d399)",
    shadow: "0 6px 24px rgba(5,150,105,.35)",
  },
  error: {
    label: "إرسال رابط الاستعادة",
    icon: "send",
    bg: "linear-gradient(135deg,#006b5d,#00a896)",
    shadow: "0 6px 24px rgba(0,107,93,.3)",
  },
};

/* ── Main component ── */
export default function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Cleanup any pending timer on unmount */
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSubmit = () => {
    if (status === "loading" || status === "success") return;

    if (timerRef.current) clearTimeout(timerRef.current);

    if (!phone.trim()) {
      setStatus("error");
      timerRef.current = setTimeout(() => setStatus("idle"), 1800);
      return;
    }

    setStatus("loading");
    timerRef.current = setTimeout(() => {
      setStatus("success");
      timerRef.current = setTimeout(() => setStatus("idle"), 2800);
    }, 1800);
  };

  const btn = BUTTON_CONFIG[status];
  const isDisabled = status === "loading" || status === "success";

  return (
    <main
      dir="rtl"
      style={{ fontFamily: "'Tajawal', sans-serif" }}
      className="min-h-screen flex flex-row-reverse bg-[#fbf8fc] overflow-hidden"
    >
      <RightSide />

      {/* ── LEFT SIDE ── */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-8 relative overflow-hidden">

        {/* Background blobs */}
        <div
          className="blob-drift-1 absolute w-[280px] h-[280px] rounded-full pointer-events-none opacity-55"
          style={{ background: "#c8faf3", filter: "blur(60px)", top: "-80px", right: "-60px" }}
        />
        <div
          className="blob-drift-2 absolute w-[220px] h-[220px] rounded-full pointer-events-none opacity-55"
          style={{ background: "#d6f0ff", filter: "blur(60px)", bottom: "-60px", left: "-40px" }}
        />

        <div className="w-full max-w-md text-right relative z-10">

          {/* Lock badge */}
          <div
            className="lock-badge-anim w-16 h-16 rounded-[18px] flex items-center justify-center mb-6"
            style={{
              background: "linear-gradient(135deg,#006b5d,#00a896)",
              boxShadow: "0 8px 24px rgba(0,107,93,.3)",
            }}
          >
            <span className="material-symbols-outlined text-white text-4xl">lock_reset</span>
          </div>

          {/* Step dots */}
          <div className="anim-d1 flex gap-2 mb-6">
            <div className="h-2 w-6 rounded-full bg-[#006b5d]" />
            <div className="h-2 w-2 rounded-full bg-gray-200" />
            <div className="h-2 w-2 rounded-full bg-gray-200" />
          </div>

          <h1 className="anim-d2 text-3xl font-extrabold mb-3 text-[#1b1b1e]">
            نسيت كلمة المرور؟
          </h1>

          <p className="anim-d3 text-gray-500 mb-10 text-base leading-relaxed">
            لا تقلق، ادخل رقم هاتفك وسنرسل لك رابطاً لاستعادة حسابك.
          </p>

          {/* Phone input */}
          <div className="anim-d3 mb-6">
            <label className="block mb-2 font-bold text-[#1b1b1e]">رقم الهاتف</label>
            <div className="input-wrapper">
              <input
                type="tel"
                dir="ltr"
                placeholder="015xxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                disabled={isDisabled}
                className={[
                  "w-full p-4 px-5 border rounded-xl text-left text-lg bg-white text-[#1b1b1e]",
                  "transition-all duration-200 outline-none disabled:opacity-60",
                  "focus:-translate-y-0.5 focus:shadow-[0_0_0_4px_rgba(0,107,93,.12)]",
                  status === "error"
                    ? "border-red-400 shadow-[0_0_0_4px_rgba(239,68,68,.12)] input-error"
                    : "border-gray-300 focus:border-[#006b5d]",
                ].join(" ")}
              />
              <div className="input-focus-line" />
            </div>
            {status === "error" && (
              <p className="text-red-500 text-sm mt-1.5 text-right">
                برجاء إدخال رقم الهاتف
              </p>
            )}
          </div>

          {/* Submit button */}
          <div className="anim-d4">
            <button
              onClick={handleSubmit}
              disabled={isDisabled}
              className="btn-shimmer w-full text-white text-lg py-4 rounded-full font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-[.98] disabled:cursor-not-allowed"
              style={{ background: btn.bg, boxShadow: btn.shadow }}
            >
              <span className="flex items-center justify-center gap-2">
                <span className={`material-symbols-outlined text-xl ${status === "loading" ? "spin-icon" : ""}`}>
                  {btn.icon}
                </span>
                {btn.label}
              </span>
            </button>
          </div>

          {/* Footer */}
          <div className="anim-d5 mt-10 text-center flex flex-col gap-4">
            <a
              href="#"
              className="group flex justify-center items-center gap-2 text-[#006b5d] font-bold transition-opacity hover:opacity-75"
            >
              <span className="material-symbols-outlined text-xl transition-transform duration-300 group-hover:translate-x-1">
                arrow_forward
              </span>
              العودة لتسجيل الدخول
            </a>
            <hr className="border-gray-200" />
            <p className="text-sm text-gray-500">
              تواجه مشكلة؟{" "}
              <span className="text-[#006b5d] font-bold cursor-pointer hover:underline">
                اتصل بالدعم الفني
              </span>
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}