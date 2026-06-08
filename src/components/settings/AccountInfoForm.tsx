import React from "react";
import { Mail, Phone, MapPin, Lock } from "lucide-react";

interface AccountInfoFormProps {
  name: string;
  email: string;
  phone: string;
  address: string;
  loading: boolean;
  onChange: (field: string, value: string) => void;
  onSave: () => void;
}

const AccountInfoForm: React.FC<AccountInfoFormProps> = ({
  name,
  email,
  phone,
  address,
  loading,
  onChange,
  onSave,
}) => {
  return (
    <div className="account-form-card">
      <h3 className="form-title">معلومات الحساب</h3>

      {/* Name field */}
      <div className="form-group">
        <label className="form-label">الاسم الكامل</label>
        <div className="input-wrapper">
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => onChange("fullName", e.target.value)}
            placeholder="أدخل اسمك الكامل"
            dir="rtl"
          />
        </div>
      </div>

      {/* Email field - readonly */}
      <div className="form-group">
        <label className="form-label">البريد الإلكتروني</label>
        <div className="input-wrapper">
          <Lock size={16} className="input-icon" />
          <input
            type="email"
            className="form-input readonly"
            value={email}
            readOnly
            dir="ltr"
          />
        </div>
        <span className="field-hint">لا يمكن تغيير البريد الإلكتروني</span>
      </div>

      {/* Phone field */}
      <div className="form-group">
        <label className="form-label">رقم الجوال</label>
        <div className="input-wrapper">
          <Phone size={16} className="input-icon" />
          <input
            type="tel"
            className="form-input"
            value={phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="01xxxxxxxxx"
            dir="ltr"
          />
        </div>
      </div>

      {/* Address field */}
      <div className="form-group">
        <label className="form-label">عنوان التوصيل الرئيسي</label>
        <div className="input-wrapper">
          <MapPin size={16} className="input-icon" />
          <input
            type="text"
            className="form-input"
            value={address}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="أدخل عنوانك الرئيسي"
            dir="rtl"
          />
        </div>
      </div>

      <button
        className="save-btn"
        onClick={onSave}
        disabled={loading}
      >
        {loading ? (
          <span className="btn-loading">جاري الحفظ...</span>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            حفظ التغييرات
          </>
        )}
      </button>
    </div>
  );
};

export default AccountInfoForm;