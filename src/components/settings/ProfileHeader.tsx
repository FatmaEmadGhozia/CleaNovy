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

  return (
    <div className="profile-header">
      <div className="avatar-wrapper">
        <img
          src={
            profileImage
              ? `${import.meta.env.VITE_API_URL}/${profileImage}`
              : "/assets/default-avatar.png"
          }
          alt={name}
          className="avatar-img"
        />
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

      {/* Completed Orders - Full width card */}
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