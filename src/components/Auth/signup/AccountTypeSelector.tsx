import React from "react";
import { CustomerIcon, LaundryIcon, CheckCircleIcon } from "./Icons.jsx";

// 💡 1. تعديل الأنواع لتطابق قيم الباك اند الجديدة
type AccountType = "client" | "laundry_owner";

type AccountOption = {
  id: AccountType;
  label: string;
  icon: React.ReactNode;
};

// 💡 2. تحديث الـ id داخل المصفوفة لتطابق الأنواع الجديدة
const ACCOUNT_TYPES: AccountOption[] = [
  { id: "client", label: "عميل", icon: <CustomerIcon /> },
  { id: "laundry_owner", label: "صاحب مغسلة", icon: <LaundryIcon /> },
];

type Props = {
  value: AccountType;
  onChange: (value: AccountType) => void;
  delay?: string;
};

export default function AccountTypeSelector({
  value,
  onChange,
  delay = "0s",
}: Props) {
  return (
    <div
      className="fiu"
      style={{
        animationDelay: delay,
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <label
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#374151",
          textAlign: "right",
        }}
      >
        نوع الحساب
      </label>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
        }}
      >
        {ACCOUNT_TYPES.map((t) => {
          const sel = value === t.id;

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "14px 10px",
                borderRadius: 12,
                border: `2px solid ${sel ? "#14b8a6" : "#e2e8f0"}`,
                background: sel ? "#f0fdfa" : "#f8fafc",
                color: sel ? "#0d7a72" : "#64748b",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "'Cairo', sans-serif",
                transition: "all .2s",
                boxShadow: sel
                  ? "0 2px 8px rgba(20,184,166,.15)"
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (!sel) {
                  e.currentTarget.style.borderColor = "#cbd5e1";
                  e.currentTarget.style.background = "#fff";
                }
              }}
              onMouseLeave={(e) => {
                if (!sel) {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.background = "#f8fafc";
                }
              }}
            >
              {sel && (
                <span style={{ position: "absolute", top: 8, left: 8 }}>
                  <CheckCircleIcon />
                </span>
              )}

              <span style={{ color: sel ? "#14b8a6" : "#94a3b8" }}>
                {t.icon}
              </span>
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}