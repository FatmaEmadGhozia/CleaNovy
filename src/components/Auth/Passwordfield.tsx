import { useState } from "react";
// import EyeToggle from "../components/Auth/EyeToggle.tsx";
import EyeToggle from "./Eyetoggle.tsx";

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}

export default function PasswordField({
  id,
  label,
  value,
  onChange,
  error,
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-right text-[#1b1b1e]"
        style={{ fontFamily: "Tajawal", fontSize: 14, fontWeight: 700 }}
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          name={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          dir="rtl"
          className={[
            "w-full rounded-xl px-5 py-4 text-right border-none outline-none",
            "placeholder:tracking-[0.25em] placeholder:text-[#75777e]",
            "transition-all duration-200",
            error
              ? "bg-[#ffdad6]/40 ring-2 ring-[#ba1a1a]/50 focus:ring-[#ba1a1a]/60"
              : "bg-[#F1F5F9] ring-0 focus:ring-2 focus:ring-[#006b5d]/25 focus:bg-white",
          ].join(" ")}
          style={{ fontFamily: "Tajawal", fontSize: 16, paddingLeft: "3rem" }}
        />
        <EyeToggle visible={show} onClick={() => setShow((p) => !p)} />
      </div>

      {/* Animated error message */}
      <div
        style={{
          maxHeight: error ? "2rem" : "0px",
          opacity: error ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.25s ease, opacity 0.25s ease",
        }}
      >
        <p
          className="flex items-center justify-end gap-1 text-[#ba1a1a]"
          style={{ fontFamily: "Tajawal", fontSize: 12 }}
        >
          {error}
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: 14,
              fontVariationSettings: "'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 20",
            }}
          >
            error
          </span>
        </p>
      </div>
    </div>
  );
}