import React, { useRef } from "react";
import { Camera } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  profileImage: string | null;
  completedOrders: number;
  onImageChange: (file: File) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  profileImage,
  completedOrders,
  onImageChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageChange(file);
  };

  // الباك اند بيحفظ الـ URL كاملة: "http://localhost:5000/uploads/avatar-xxx.jpg"
  // فبنستخدمها مباشرة بدون إضافة حاجة
  const getAvatarSrc = (): string | null => {
    if (!profileImage) return null;
    // لو URL كاملة (بتبدأ بـ http) استخدمها مباشرة
    if (profileImage.startsWith("http://") || profileImage.startsWith("https://")) {
      return profileImage;
    }
    // لو relative path ضيف الـ base URL
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    return `${API_URL}/${profileImage.replace(/^\//, "")}`;
  };

  const avatarSrc = getAvatarSrc();

  return (
    <div className="profile-header">
      <div className="avatar-wrapper">
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={name}
            className="avatar-img"
            onError={(e) => {
              // لو الصورة فشلت في التحميل، اعرض الـ placeholder
              const target = e.currentTarget;
              target.style.display = "none";
              const placeholder = target.nextElementSibling as HTMLElement;
              if (placeholder) placeholder.style.display = "flex";
            }}
          />
        ) : null}

        {/* Placeholder - بيظهر لو مفيش صورة أو لو الصورة فشلت */}
        <div
          className="avatar-placeholder"
          style={{ display: avatarSrc ? "none" : "flex" }}
        >
          {name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <button
          className="avatar-edit-btn"
          onClick={() => fileInputRef.current?.click()}
          title="تغيير الصورة"
        >
          <Camera size={14} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      <h2 className="profile-name">{name}</h2>

      <div className="orders-card">
        <div className="orders-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="orders-count">{completedOrders}</span>
        <span className="orders-label">طلبات مكتملة</span>
      </div>
    </div>
  );
};

export default ProfileHeader;