import React, { useState } from "react";
import type { ChangeEvent } from "react";
import InputField from "./InputField";
import AccountTypeSelector from "./AccountTypeSelector";
import Checkbox from "./Checkbox";
import Button from "./Button";
import SuccessScreen from "./SuccessScreen";

type AccountType = "customer" | "owner";

interface FormState {
  accountType: AccountType;
  fullName: string;
  phone: string;
  email: string;
  password: string;
  agreed: boolean;
}

type Errors = Partial<Record<keyof FormState, string>>;

const INITIAL_FORM: FormState = {
  accountType: "customer",
  fullName: "",
  phone: "",
  email: "",
  password: "",
  agreed: false,
};

// Password rules - must match backend: min 8 chars + at least one digit
interface PasswordRule {
  id: string;
  label: string;
  test: (pw: string) => boolean;
}

const PASSWORD_RULES: PasswordRule[] = [
  { id: "length", label: "على الأقل 8 أحرف", test: (pw) => pw.length >= 8 },
  { id: "digit", label: "يحتوي على رقم واحد على الأقل", test: (pw) => /\d/.test(pw) },
  { id: "letter", label: "يحتوي على حرف واحد على الأقل", test: (pw) => /[a-zA-Z]/.test(pw) },
];

function validate(form: FormState): Errors {
  const e: Errors = {};

  if (!form.fullName.trim() || form.fullName.trim().length < 3)
    e.fullName = "الاسم يجب أن يكون 3 أحرف على الأقل";

  if (!form.phone.trim())
    e.phone = "رقم الهاتف مطلوب";
  else if (!/^01[0125]\d{8}$/.test(form.phone.trim()))
    e.phone = "رقم الهاتف يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015 ويتكون من 11 رقم";

  if (!form.email.trim())
    e.email = "البريد الإلكتروني مطلوب";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    e.email = "البريد الإلكتروني غير صالح";

  if (!form.password)
    e.password = "كلمة المرور مطلوبة";
  else if (form.password.length < 8)
    e.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
  else if (!/\d/.test(form.password))
    e.password = "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل";

  if (!form.agreed) e.agreed = "يجب الموافقة على الشروط";

  return e;
}

export default function SignUpForm(): React.ReactElement {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");

  // Check which password rules pass
  const passwordRules = PASSWORD_RULES.map((rule) => ({
    ...rule,
    passed: rule.test(form.password),
  }));
  const showPasswordRules = form.password.length > 0;

  const handleChange = (field: keyof FormState, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setServerError("");
    if (errors[field]) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[field];
        return newErrs;
      });
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const roleMap: Record<AccountType, string> = {
        customer: "client",
        owner: "laundry_owner",
      };

      const response = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          password: form.password,
          role: roleMap[form.accountType],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setServerError(data.message || "حدث خطأ أثناء إنشاء الحساب");
      }
    } catch {
      setServerError("حدث خطأ في الاتصال بالسيرفر. تأكد من تشغيل الباك اند");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setForm(INITIAL_FORM);
    setErrors({});
    setServerError("");
  };

  if (success) {
    return <SuccessScreen name={form.fullName} onReset={handleReset} />;
  }

  return (
    <div dir="rtl" style={{ display: "flex", flexDirection: "column", gap: 18 }}>

      {/* Server error */}
      {serverError && (
        <div style={{
          background: "#ffdad6",
          border: "1px solid #ba1a1a",
          borderRadius: 10,
          padding: "10px 14px",
          color: "#ba1a1a",
          fontSize: 13,
          fontFamily: "Cairo, sans-serif",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          <span>⚠</span>
          <span>{serverError}</span>
        </div>
      )}

      {/* Account type selector */}
      <AccountTypeSelector
        value={form.accountType}
        onChange={(type: AccountType) => handleChange("accountType", type)}
        delay=".12s"
      />

      {/* Input fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <InputField
          label="الاسم الكامل"
          placeholder="أدخل اسمك (3 أحرف على الأقل)"
          value={form.fullName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("fullName", e.target.value)}
          error={errors.fullName}
          delay=".20s"
        />

        <InputField
          label="رقم الهاتف"
          placeholder="01xxxxxxxxx"
          value={form.phone}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("phone", e.target.value)}
          error={errors.phone}
          delay=".30s"
        />

        <InputField
          label="البريد الإلكتروني"
          placeholder="example@mail.com"
          type="email"
          value={form.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("email", e.target.value)}
          error={errors.email}
          delay=".40s"
        />

        {/* Password field with live rules */}
        <InputField
          label="كلمة المرور"
          placeholder="أدخل كلمة مرور قوية"
          type="password"
          value={form.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("password", e.target.value)}
          error={errors.password}
          delay=".50s"
        />

        {/* Password rules - shown while typing */}
        {showPasswordRules && (
          <div style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: 10,
            padding: "10px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}>
            <p style={{ fontSize: 12, color: "#64748b", fontFamily: "Cairo", fontWeight: 600, marginBottom: 2 }}>
              متطلبات كلمة المرور:
            </p>
            {passwordRules.map((rule) => (
              <div key={rule.id} style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexDirection: "row-reverse",
                justifyContent: "flex-start",
              }}>
                <span style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: rule.passed ? "#dcfce7" : "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  flexShrink: 0,
                  transition: "background 0.3s",
                }}>
                  {rule.passed ? "✓" : "○"}
                </span>
                <span style={{
                  fontSize: 12,
                  fontFamily: "Cairo, sans-serif",
                  color: rule.passed ? "#16a34a" : "#64748b",
                  transition: "color 0.3s",
                }}>
                  {rule.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Terms checkbox */}
      <Checkbox
        checked={form.agreed}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("agreed", e.target.checked)}
        error={errors.agreed}
        delay=".60s"
        label={
          <span>
            أوافق على{" "}
            <a href="#" style={{ color: "#14b8a6", fontWeight: 700, textDecoration: "none" }}>
              الشروط والأحكام
            </a>{" "}
            و{" "}
            <a href="#" style={{ color: "#14b8a6", fontWeight: 700, textDecoration: "none" }}>
              سياسة الخصوصية
            </a>
          </span>
        }
      />

      {/* Submit button */}
      <Button onClick={handleSubmit} loading={loading}>
        إنشاء حساب
      </Button>

    </div>
  );
}