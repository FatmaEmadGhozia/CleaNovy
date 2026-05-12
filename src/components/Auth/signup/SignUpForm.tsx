import React, { useState, ChangeEvent } from "react";
import InputField from "./InputField";
import AccountTypeSelector from "./AccountTypeSelector";
import Checkbox from "./Checkbox";
import Button from "./Button";
import SuccessScreen from "./SuccessScreen";

// 1. تعريف الأنواع بشكل دقيق لضمان سلامة البيانات
type AccountType = "customer" | "owner";

interface FormState {
  accountType: AccountType;
  fullName: string;
  phone: string;
  email: string;
  password: string;
  agreed: boolean;
}

// تعريف نوع الأخطاء بحيث يرتبط بمفاتيح الفورم
type Errors = Partial<Record<keyof FormState, string>>;

const INITIAL_FORM: FormState = {
  accountType: "customer",
  fullName: "",
  phone: "",
  email: "",
  password: "",
  agreed: false,
};

// 2. منطق التحقق من صحة البيانات (Validation)
function validate(form: FormState): Errors {
  const e: Errors = {};

  if (!form.fullName.trim()) e.fullName = "الاسم الكامل مطلوب";
  if (!form.phone.trim()) e.phone = "رقم الهاتف مطلوب";
  if (!form.email.trim()) e.email = "البريد الإلكتروني مطلوب";
  if (form.password.length < 8) e.password = "كلمة المرور يجب أن تكون 8 أحرف";
  if (!form.agreed) e.agreed = "يجب الموافقة على الشروط";

  return e;
}

export default function SignUpForm(): React.ReactElement {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // 3. دالة معالجة التغيير - تم استخدام 'any' للـ value لتجنب تعارض string و boolean
  const handleChange = (field: keyof FormState, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    
    // مسح رسالة الخطأ فور بدء المستخدم في تعديل الحقل
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
    // محاكاة عملية إرسال البيانات
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
  };

  const handleReset = () => {
    setSuccess(false);
    setForm(INITIAL_FORM);
    setErrors({});
  };

  if (success) {
    return <SuccessScreen name={form.fullName} onReset={handleReset} />;
  }

  return (
    <div dir="rtl" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      
      {/* اختيار نوع الحساب */}
      <AccountTypeSelector
        value={form.accountType}
        onChange={(type: AccountType) => handleChange("accountType", type)}
        delay=".12s"
      />

      {/* مجموعة حقول الإدخال */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <InputField
          label="الاسم الكامل"
          placeholder="أدخل اسمك"
          value={form.fullName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("fullName", e.target.value)}
          error={errors.fullName}
          delay=".20s"
        />

        <InputField
          label="رقم الهاتف"
          placeholder="05xxxxxxxx"
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

        <InputField
          label="كلمة المرور"
          placeholder="********"
          type="password"
          value={form.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("password", e.target.value)}
          error={errors.password}
          delay=".50s"
        />
      </div>

      {/* الموافقة على الشروط */}
      <Checkbox
        checked={form.agreed}
        // تصحيح: استخدام e.target.checked لأن الحقل boolean
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

      {/* زر الإرسال */}
      <Button onClick={handleSubmit} loading={loading}>
        إنشاء حساب
      </Button>

    </div>
  );
}