import React, { useState } from "react";
import { LogOut } from "lucide-react";

interface LogoutSectionProps {
  onLogout: () => void;
}

const LogoutSection: React.FC<LogoutSectionProps> = ({ onLogout }) => {
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="logout-section">
      {!confirm ? (
        <button className="logout-btn" onClick={() => setConfirm(true)}>
          <LogOut size={16} />
          تسجيل الخروج
        </button>
      ) : (
        <div className="logout-confirm">
          <p>هل أنت متأكد من تسجيل الخروج؟</p>
          <p className="logout-hint">سيتم إنهاء جميع الجلسات النشطة الحالية</p>
          <div className="confirm-actions">
            <button className="confirm-logout-btn" onClick={onLogout}>
              <LogOut size={14} />
              تسجيل الخروج
            </button>
            <button className="cancel-btn" onClick={() => setConfirm(false)}>
              إلغاء
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutSection;