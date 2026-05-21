import React from "react";
import SignUpForm from "../../components/Auth/signup/SignUpForm"
import SideBanner from "../../components/Auth/signup/SideBanner"
export default function SignUpPage(): React.ReactElement {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f1f5f9 0%, #e6faf8 100%)",
        padding: 16,
        fontFamily: "'Cairo', sans-serif",
      }}
    >
      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 940,
          background: "#fff",
          borderRadius: 28,
          boxShadow: "0 24px 80px rgba(0,0,0,.1)",
          overflow: "hidden",
          display: "flex",
          minHeight: 640,
        }}
      >
        {/* Form side */}
        <div
          style={{
            flex: "0 0 58%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "48px 52px",
            overflowY: "auto",
          }}
        >
          <SignUpForm />
        </div>

        {/* Banner side */}
        <div style={{ flex: "0 0 42%" }}>
          <SideBanner />
        </div>
      </div>

      {/* Support bubble */}
      <button
        aria-label="دعم العملاء"
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "#0a1f38",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,.25)",
          transition: "all .2s",
          zIndex: 50,
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
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
}