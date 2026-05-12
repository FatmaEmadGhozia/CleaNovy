import React from "react";
import { WashingMachineIcon } from "./Icons.js";

type Feature = {
  icon: string;
  label: string;
};

const FEATURES: Feature[] = [
  { icon: "⚡", label: "سرعة في التنفيذ" },
  { icon: "✓", label: "جودة مضمونة" },
];

export default function SideBanner(): React.ReactElement {
  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        minHeight: 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(145deg, #0a1f38 0%, #0d4a4a 55%, #0a2a3a 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(45,212,191,.18) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -70,
          left: -70,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(20,184,166,.15) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 32px",
          textAlign: "center",
        }}
      >
        {/* Logo card */}
        <div
          className="glass fiu"
          style={{
            animationDelay: ".2s",
            width: 88,
            height: 88,
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 28,
          }}
        >
          <WashingMachineIcon />
        </div>

        <h1
          className="fiu"
          style={{
            animationDelay: ".32s",
            fontSize: 48,
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 12px",
            letterSpacing: "-.02em",
          }}
        >
          cleannovy
        </h1>

        <p
          className="fiu"
          style={{
            animationDelay: ".44s",
            fontSize: 14,
            color: "#94a3b8",
            lineHeight: 1.8,
            maxWidth: 240,
            margin: "0 0 32px",
          }}
        >
          نعتني بملابسك كما تعتني بها أنت. انضم إلى أكبر شبكة لخدمات الغسيل
          والكي في المنطقة.
        </p>

        {/* Feature pills */}
        <div
          className="fiu"
          style={{
            animationDelay: ".58s",
            display: "flex",
            gap: 12,
            width: "100%",
            maxWidth: 260,
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="glass"
              style={{
                flex: 1,
                borderRadius: 16,
                padding: "14px 8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 22 }}>{f.icon}</span>
              <span style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>
                {f.label}
              </span>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div
          className="fiu"
          style={{
            animationDelay: ".7s",
            display: "flex",
            gap: 8,
            marginTop: 28,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#2dd4bf",
            }}
          />
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "rgba(255,255,255,.25)",
            }}
          />
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "rgba(255,255,255,.25)",
            }}
          />
        </div>
      </div>
    </div>
  );
}