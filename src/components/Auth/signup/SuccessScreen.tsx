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
      className="fiu"
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
        <h2
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: "#0f172a",
            margin: "0 0 8px",
          }}
        >
          تم إنشاء حسابك! 🎉
        </h2>

        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          أهلًا بك{" "}
          <span style={{ color: "#14b8a6", fontWeight: 700 }}>{name}</span>{" "}
          في عائلة نظيف
        </p>
      </div>

      <button
        onClick={onReset}
        style={{
          marginTop: 8,
          padding: "10px 28px",
          background: "#14b8a6",
          color: "#fff",
          border: "none",
          borderRadius: 12,
          fontWeight: 700,
          fontSize: 14,
          cursor: "pointer",
          fontFamily: "'Cairo', sans-serif",
          transition: "all .18s",
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) =>
          (e.currentTarget.style.background = "#0d9488")
        }
        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
          (e.currentTarget.style.background = "#14b8a6")
        }
      >
        العودة للتسجيل
      </button>
    </div>
  );
}