import React from "react";

type CheckboxProps = {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: React.ReactNode;
  error?: string;
  delay?: string;
};

export default function Checkbox({
  checked,
  onChange,
  label,
  error,
  delay = "0s",
}: CheckboxProps) {
  return (
    <div style={{ animationDelay: delay }}>
      <label>
        <input type="checkbox" checked={checked} onChange={onChange} />
        {label}
      </label>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}