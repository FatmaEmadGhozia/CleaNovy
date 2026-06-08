import React from "react";

// ─── Bubble particles
const Bubbles = () => {
  const bubbles = [
    { size: 6, left: "15%", delay: "0s", duration: "4s" },
    { size: 10, left: "30%", delay: "1s", duration: "5s" },
    { size: 5, left: "55%", delay: "0.5s", duration: "3.5s" },
    { size: 8, left: "70%", delay: "1.5s", duration: "4.5s" },
    { size: 4, left: "85%", delay: "0.8s", duration: "3s" },
    { size: 7, left: "45%", delay: "2s", duration: "5.5s" },
  ];

  return (
    <>
      {bubbles.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: "-20px",
            left: b.left,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            border: "1.5px solid rgba(45,212,191,0.5)",
            background: "rgba(45,212,191,0.1)",
            animation: `bubbleFloat ${b.duration} ${b.delay} ease-in infinite`,
          }}
        />
      ))}
    </>
  );
};

export default function SideBanner(): React.ReactElement {
  const stats = [
    { value: "500+", label: "مغسلة" },
    { value: "50K+", label: "عميل" },
    { value: "4.9", label: "تقييم" },
  ];

  return (
    <>
      <style>{`
        @keyframes bubbleFloat {
          0%   { transform: translateY(0) scale(1); opacity: 0.7; }
          50%  { transform: translateY(-120px) scale(1.1); opacity: 0.4; }
          100% { transform: translateY(-260px) scale(0.8); opacity: 0; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes orb-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.08); }
        }
        .banner-slide-up {
          animation: slideUp 0.6s ease both;
        }
      `}</style>

      <div style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
      }}>

        {/* ── Background image — same as LoginPage ── */}
        <img
          src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=900&q=85"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* ── Gradient overlay ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(6,28,46,0.3) 0%, rgba(6,28,46,0.6) 40%, rgba(6,28,46,0.92) 100%)",
          zIndex: 1,
        }} />

        {/* ── Glow orb ── */}
        <div style={{
          position: "absolute",
          top: 36,
          right: 36,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(45,212,191,0.55) 0%, rgba(45,212,191,0.15) 60%, transparent 100%)",
          zIndex: 2,
          animation: "orb-pulse 4s ease-in-out infinite",
        }} />

        {/* ── Bubbles ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2, overflow: "hidden" }}>
          <Bubbles />
        </div>

        {/* ── Content ── */}
        <div style={{
          position: "relative",
          zIndex: 3,
          padding: "48px 40px",
          color: "#ffffff",
        }}>
          {/* Brand */}
          <h2 style={{
            fontSize: 52,
            fontWeight: 900,
            color: "#fff",
            margin: "0 0 14px",
            letterSpacing: "-0.03em",
            fontFamily: "'Cairo', sans-serif",
            textShadow: "0 0 40px rgba(45,212,191,0.3)",
            animation: "slideUp 0.5s 0.1s ease both",
          }}>
            Clea<span style={{ color: "#2dd4bf" }}>novy</span>
          </h2>

          {/* Title */}
          <p style={{
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 1.5,
            marginBottom: 14,
            color: "#ffffff",
            fontFamily: "'Cairo', sans-serif",
            animation: "slideUp 0.5s 0.2s ease both",
          }}>
            نعتني بملابسك كما تعتني بها أنت
          </p>

          {/* Description */}
          <p style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.78)",
            lineHeight: 1.9,
            maxWidth: 340,
            marginBottom: 28,
            fontFamily: "'Cairo', sans-serif",
            animation: "slideUp 0.5s 0.3s ease both",
          }}>
            انضم إلى آلاف المستخدمين وأصحاب المغاسل في أكبر شبكة
            لخدمات الغسيل الرقمية في المنطقة.
          </p>

          {/* Stats */}
          <div style={{
            display: "flex",
            gap: 12,
            marginBottom: 28,
            animation: "slideUp 0.5s 0.4s ease both",
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                padding: "12px 18px",
                borderRadius: 16,
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(45,212,191,0.3)",
                backdropFilter: "blur(8px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}>
                <span style={{
                  fontSize: 18, fontWeight: 800,
                  color: "#2dd4bf",
                  fontFamily: "'Cairo', sans-serif",
                }}>
                  {s.value}
                </span>
                <span style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "'Cairo', sans-serif",
                }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Features */}
          <div style={{
            display: "flex",
            gap: 10,
            maxWidth: 300,
            animation: "slideUp 0.5s 0.5s ease both",
          }}>
            {[
              { icon: "⚡", label: "سرعة في التنفيذ" },
              { icon: "✓", label: "جودة مضمونة" },
            ].map((f, i) => (
              <div key={i} style={{
                flex: 1,
                padding: "12px 8px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}>
                <span style={{ fontSize: 20 }}>{f.icon}</span>
                <span style={{
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "'Cairo', sans-serif",
                }}>
                  {f.label}
                </span>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <p style={{
            marginTop: 28,
            fontSize: 12,
            color: "rgba(255,255,255,0.4)",
            fontFamily: "'Cairo', sans-serif",
            animation: "slideUp 0.5s 0.6s ease both",
          }}>
            © 2024 · نظام Cleanovy الذكي · جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </>
  );
}