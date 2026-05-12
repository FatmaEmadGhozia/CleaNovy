import React, { ChangeEvent } from "react";

// لازم الـ Interface ده يكون موجود عشان TypeScript يفهم الـ Props
interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;     // علامة الـ ? معناها إنه اختياري
  error?: string;    
  delay?: string;    
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
  delay,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontWeight: "bold", fontSize: "14px" }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: `1px solid ${error ? "red" : "#ccc"}`,
          outline: "none",
        }}
      />
      {error && <span style={{ color: "red", fontSize: "12px" }}>{error}</span>}
    </div>
  );
};

export default InputField;