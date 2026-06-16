import { useState } from "react";
import { type Role } from "../RoleSelector/RoleSelector";
import "./LoginForm.css";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  role: Role;
}

interface FormValues {
  identifier: string;
  password: string;
  remember: boolean;
}

interface FormErrors {
  identifier?: string;
  password?: string;
}

const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};
  if (!values.identifier.trim()) errors.identifier = "هذا الحقل مطلوب";
  if (!values.password.trim()) errors.password = "هذا الحقل مطلوب";
  else if (values.password.length < 6) errors.password = "كلمة المرور 6 أحرف على الأقل";
  return errors;
};

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const AlertIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const EyeOpenIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const ROLE_TO_BACKEND: Record<Role, string> = {
  admin: "admin",
  laundry: "laundry_owner",
  client: "client",
};

const ROLE_LABELS: Record<string, string> = {
  admin: "مدير",
  laundry_owner: "صاحب مغسلة",
  client: "عميل",
};

const LoginForm = ({ role }: LoginFormProps) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState<FormValues>({
    identifier: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setServerError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: values.identifier,
            password: values.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const userRole = data.data.user.role;
        const expectedRole = ROLE_TO_BACKEND[role];

        if (userRole !== expectedRole) {
          setServerError(
            `هذا الحساب مسجل كـ ${ROLE_LABELS[userRole] ?? userRole}، وليس كـ ${ROLE_LABELS[expectedRole] ?? expectedRole}`
          );
          return;
        }

        localStorage.setItem("token", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        login(data.data.user);

        if (userRole === "laundry_owner") {
          navigate("/provider/dashboard");
        } else if (userRole === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/home");
        }
      } else {
        setServerError(data.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة");
      }
    } catch {
      setServerError("حدث خطأ في الاتصال بالسيرفر");
    }

    setIsLoading(false);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate aria-label="نموذج تسجيل الدخول" autoComplete="off">      {serverError && (
      <div className="login-form__error-banner" role="alert">
        <AlertIcon />
        <span>{serverError}</span>
      </div>
    )}

      <div className="login-form__field">
        <label className="login-form__label" htmlFor="identifier">
          البريد الإلكتروني أو رقم الهاتف
        </label>
        <div className={`login-form__input-wrap ${errors.identifier ? "login-form__input-wrap--error" : ""}`}>
          <span className="login-form__icon login-form__icon--right"><EmailIcon /></span>
          <input
            id="identifier" name="identifier" type="text"
            value={values.identifier} onChange={handleChange}
            placeholder="example@cleanovy.com"
            className="login-form__input" autoComplete="username" dir="auto"
            aria-invalid={!!errors.identifier}
          />
        </div>
        {errors.identifier && <p className="login-form__field-error" role="alert">{errors.identifier}</p>}
      </div>

      <div className="login-form__field">
        <label className="login-form__label" htmlFor="password">كلمة المرور</label>
        <div className={`login-form__input-wrap ${errors.password ? "login-form__input-wrap--error" : ""}`}>
          <span className="login-form__icon login-form__icon--right"><LockIcon /></span>
          <input
            id="password" name="password"
            type={showPassword ? "text" : "password"}
            value={values.password} onChange={handleChange}
            placeholder="••••••••" className="login-form__input"
            autoComplete="off" dir="auto"
            aria-invalid={!!errors.password}
          />
          <button type="button" className="login-form__eye-btn"
            onClick={() => setShowPassword((v) => !v)} tabIndex={-1}>
            {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </button>
        </div>
        {errors.password && <p className="login-form__field-error" role="alert">{errors.password}</p>}
      </div>

      <div className="login-form__meta-row">
        <label className="login-form__checkbox-label">
          <input type="checkbox" name="remember" checked={values.remember}
            onChange={handleChange} className="login-form__checkbox-input" />
          <span className="login-form__checkmark" aria-hidden="true" />
          تذكرني
        </label>
        <a href="/forgot-password" className="login-form__forgot-link">نسيت كلمة المرور؟</a>
      </div>

      <button type="submit" className="login-form__submit" disabled={isLoading} aria-busy={isLoading}>
        {isLoading ? <span className="login-form__spinner" /> : "تسجيل الدخول"}
      </button>

      <div className="login-form__divider" aria-hidden="true"><span>أو عبر</span></div>

      <div className="login-form__social">
        <button type="button" className="login-form__social-btn">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          فيسبوك
        </button>
        <button type="button" className="login-form__social-btn">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          جوجل
        </button>
      </div>

      <p className="login-form__register-line">
        ليس لديك حساب؟{" "}
        <a href="/signup" className="login-form__register-link">إنشاء حساب جديد</a>
      </p>
    </form>
  );
};

export default LoginForm;