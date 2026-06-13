import React, { useState, type ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
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
  // delay,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontWeight: "bold", fontSize: "14px" }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: `1px solid ${error ? "red" : hovered ? "#0d9488" : "#ccc"}`,
          outline: "none",
          boxShadow: hovered ? "0 0 0 3px rgba(13, 148, 136, 0.1)" : "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
      />
      {error && <span style={{ color: "red", fontSize: "12px" }}>{error}</span>}
    </div>
  );
};

export default InputField;