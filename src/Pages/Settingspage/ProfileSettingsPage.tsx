import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "@/components/settings/ProfileHeader";
import AccountInfoForm from "@/components/settings/AccountInfoForm";
import LogoutSection from "@/components/settings/LogoutSection";
import {
  fetchProfile,
  updateProfile,
  updateProfileImage,
  
} from "@/services/userService";
import type { UserProfile } from "@/services/userService";
import "./ProfileSettingsPage.css";

const ProfileSettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  // ─── Load profile on mount  
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProfile();
        setProfile(data);
        setFormData({ name: data.name, phone: data.phone || "", address: data.address || "" });
      } catch {
        showToast("فشل تحميل البيانات", "error");
      } finally {
        setPageLoading(false);
      }
    };
    load();
  }, []);

  // ─── Toast helper  
  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ─── Handle field change  
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ─── Save profile  
  const handleSave = async () => {
    setLoading(true);
    try {
      const updated = await updateProfile(formData);
      setProfile(updated);
      showToast("تم حفظ التغييرات بنجاح", "success");
    } catch {
      showToast("فشل حفظ التغييرات", "error");
    } finally {
      setLoading(false);
    }
  };

  // ─── Handle image upload  
  const handleImageChange = async (file: File) => {
    try {
      const result = await updateProfileImage(file);
      setProfile((prev) => prev ? { ...prev, profileImage: result.profileImage } : prev);
      showToast("تم تحديث الصورة بنجاح", "success");
    } catch {
      showToast("فشل رفع الصورة", "error");
    }
  };

  // ─── Logout  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ─── Loading state ────────────────────────────────────────────────────────
  if (pageLoading) {
    return (
      <div className="settings-loading">
        <div className="spinner" />
        <span>جاري التحميل...</span>
      </div>
    );
  }

  return (
    <div className="settings-page" dir="rtl">
      {/* Toast notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.type === "success" ? "✓" : "✕"} {toast.msg}
        </div>
      )}

      {profile && (
        <>
          <ProfileHeader
            name={profile.name}
            profileImage={profile.profileImage || null}
            completedOrders={profile.completedOrders}
            onImageChange={handleImageChange}
          />

          <AccountInfoForm
            name={formData.name}
            email={profile.email}
            phone={formData.phone}
            address={formData.address}
            loading={loading}
            onChange={handleChange}
            onSave={handleSave}
          />

          <LogoutSection onLogout={handleLogout} />
        </>
      )}
    </div>
  );
};

export default ProfileSettingsPage;