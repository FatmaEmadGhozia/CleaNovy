import React, { useState, type ChangeEvent } from "react";
import InputField from "./InputField";
import AccountTypeSelector from "./AccountTypeSelector";
import Checkbox from "./Checkbox";
import Button from "./Button";
import SuccessScreen from "./SuccessScreen";

// 1. تعريف الأنواع بشكل دقيق لتطابق قيم الباك اند تماماً
type AccountType = "client" | "laundry_owner";

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
  accountType: "client", // القيمة الافتراضية "عميل" متوافقة مع السيرفر
  fullName: "",
  phone: "",
  email: "",
  password: "",
  agreed: false,
};

// 2. منطق التحقق من صحة البيانات (Validation) للموبايل المصري والإيميل
function validate(form: FormState): Errors {
  const e: Errors = {};

  if (!form.fullName.trim()) e.fullName = "الاسم الكامل مطلوب";

  // التحقق من رقم الهاتف المصري (11 رقم يبدأ بـ 01)
  const egyptPhoneRegex = /^01[0125][0-9]{8}$/;
  if (!form.phone.trim()) {
    e.phone = "رقم الهاتف مطلوب";
  } else if (!egyptPhoneRegex.test(form.phone.trim())) {
    e.phone = "رقم الهاتف غير صحيح، يجب أن يتكون من 11 رقم ويبدأ بـ 01";
  }

  // التحقق من صيغة البريد الإلكتروني
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim()) {
    e.email = "البريد الإلكتروني مطلوب";
  } else if (!emailRegex.test(form.email.trim())) {
    e.email = "صيغة البريد الإلكتروني غير صحيحة";
  }

  if (form.password.length < 8) e.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
  if (!form.agreed) e.agreed = "يجب الموافقة على الشروط والأحكام";

  return e;
}

export default function SignUpForm(): React.ReactElement {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // 3. دالة معالجة التغيير وحذف الأخطاء فوراً عند الكتابة
  const handleChange = (field: keyof FormState, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[field];
        return newErrs;
      });
    }
  };

  // 4. دالة الإرسال والربط الحقيقي مع الباك اند واصطياد الأخطاء المتكررة
  const handleSubmit = async () => {
    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {

      // الربط مع مسار الـ Register في الباك اند
      //const response = await fetch("http://localhost:5000/api/v1/auth/register", {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          password: form.password,
          role: form.accountType, // يرسل "client" أو "laundry_owner" مباشرة
        }),
      });

      const data = await response.json();

      // if (response.ok) {
      //   setSuccess(true); // تفعيل شاشة النجاح
      // }
      if (response.ok) {
        localStorage.setItem("token", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        setSuccess(true);
      }
      else {
        // فحص نوع الخطأ المسترجع وعرضه فوق الحقل المخصص له
        if (data.message && data.message.includes("البريد")) {
          setErrors({ email: data.message });
        } else if (data.message && data.message.includes("الهاتف")) {
          setErrors({ phone: data.message });
        } else {
          alert(data.message || "فشل تسجيل الحساب");
        }
      }
    } catch (error) {
      console.error("Register Error:", error);
      alert("حدث خطأ في الاتصال بالسيرفر، تأكدي من تشغيل السيرفر المحلي");
    } finally {
      setLoading(false);
    }
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
          placeholder="011xxxxxxxx" // Placeholder بالمصري جاهز ومناسب
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