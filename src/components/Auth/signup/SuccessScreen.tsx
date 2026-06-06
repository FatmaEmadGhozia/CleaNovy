import React from "react";

type SuccessScreenProps = {
  name: string;
  onReset: () => void;
};

export default function SuccessScreen({
  name,
  onReset,
}: SuccessScreenProps): React.ReactElement {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 0",
        gap: 20,
        textAlign: "center",
      }}
    >
      {/* Animated check circle */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "#f0fdfa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px solid #14b8a6",
            animation: "pulse-ring 1.5s ease-out infinite",
          }}
        />
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#14b8a6" />
          <path
            d="M7 12l4 4 6-6"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
          تم إنشاء حسابك!  
        </h2>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
         Cleanovy في عائلة {" "}
          <span style={{ color: "#14b8a6", fontWeight: 700 }}>{name}</span>{" "}
          أهلًا بك
        </p> 
      </div>

      {/* رسالة تأكيد الإيميل */}
      <div
        style={{
          background: "#f0fdfa",
          border: "1px solid #99f6e4",
          borderRadius: 12,
          padding: "16px 20px",
          maxWidth: 320,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              stroke="#0d9488" strokeWidth="1.8" />
            <polyline points="22,6 12,13 2,6" stroke="#0d9488" strokeWidth="1.8" />
          </svg>
          <span style={{ fontWeight: 700, color: "#0d9488", fontSize: 14 }}>
            تحقق من بريدك الإلكتروني
          </span>
        </div>
        <p style={{ fontSize: 13, color: "#475569", margin: 0, lineHeight: 1.6 }}>
          أرسلنا لك رابط تأكيد على بريدك الإلكتروني، يرجى تفعيل حسابك قبل تسجيل الدخول.
        </p>
      </div>

      {/* <button
        onClick={onReset}
        style={{
          marginTop: 4,
          padding: "10px 28px",
          background: "transparent",
          color: "#64748b",
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          fontWeight: 600,
          fontSize: 13,
          cursor: "pointer",
          fontFamily: "'Cairo', sans-serif",
          transition: "all .18s",
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.currentTarget.style.borderColor = "#14b8a6";
          e.currentTarget.style.color = "#14b8a6";
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.currentTarget.style.borderColor = "#e2e8f0";
          e.currentTarget.style.color = "#64748b";
        }}
      >
        
      </button> */}
    </div>
  );
}