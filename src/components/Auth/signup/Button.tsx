import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  loading?: boolean;
  delay?: string;
};

export default function Button({
  children,
  onClick,
  loading = false,
  delay = "0s",
}: ButtonProps) {
  return (
    <div className="fiu" style={{ animationDelay: delay }}>
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        style={{
          width: "100%",
          padding: "13px",
          borderRadius: 14,
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          background: "linear-gradient(135deg, #14b8a6, #2dd4bf)",
          color: "#fff",
          fontWeight: 700,
          fontSize: 15,
          fontFamily: "'Cairo', sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          boxShadow: "0 4px 14px rgba(20,184,166,.35)",
          opacity: loading ? 0.7 : 1,
          transition: "all .18s",
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow =
              "0 6px 20px rgba(20,184,166,.45)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 4px 14px rgba(20,184,166,.35)";
        }}
      >
        {loading ? (
          <>
            <svg
              className="spin"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="rgba(255,255,255,.25)"
                strokeWidth="4"
              />
              <path
                d="M4 12a8 8 0 018-8"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            جاري الإنشاء...
          </>
        ) : (
          children
        )}
      </button>
    </div>
  );
}