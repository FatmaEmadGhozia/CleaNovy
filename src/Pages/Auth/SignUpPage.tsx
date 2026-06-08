import React from "react";
import SignUpForm from "../../components/Auth/signup/SignUpForm";
import SideBanner from "../../components/Auth/signup/SideBanner";

export default function SignUpPage(): React.ReactElement {
  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      fontFamily: "'Cairo', sans-serif",
      overflow: "hidden",
    }}>
      {/* Form side - يسار */}
      <div style={{
        flex: "0 0 55%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #e6faf8 100%)",
        padding: "48px 60px",
        overflowY: "auto",
        minHeight: "100vh",
      }}>
        {/* Logo top */}
        <div style={{
          width: "100%", maxWidth: 480,
          display: "flex", justifyContent: "flex-end",
          marginBottom: 32,
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 16px", borderRadius: 12,
            background: "#fff",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            border: "1px solid rgba(20,184,166,0.15)",
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
              clean<span style={{ color: "#14b8a6" }}>novy</span>
            </span>
          </div>
        </div>

        {/* Form */}
        <div style={{ width: "100%", maxWidth: 480 }}>
          <SignUpForm />
        </div>

        {/* Login link */}
        <p style={{
          marginTop: 24, fontSize: 13,
          color: "#64748b", textAlign: "center",
          fontFamily: "'Cairo', sans-serif",
        }}>
          عندك حساب بالفعل؟{" "}
          <a href="/login" style={{
            color: "#14b8a6", fontWeight: 700, textDecoration: "none",
          }}>
            سجل دخول
          </a>
        </p>
      </div>

      {/* Banner side - يمين - full height */}
      <div style={{ flex: "0 0 45%", position: "sticky", top: 0, height: "100vh" }}>
        <SideBanner />
      </div>

      {/* Support bubble */}
      <button
        aria-label="دعم العملاء"
        style={{
          position: "fixed", bottom: 20, left: 20,
          width: 48, height: 48, borderRadius: "50%",
          background: "#0a1f38", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,.25)",
          transition: "all .2s", zIndex: 50,
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.currentTarget.style.background = "#14b8a6";
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.currentTarget.style.background = "#0a1f38";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" fill="white"/>
        </svg>
      </button>
    </div>
  );
}