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
import { useAuth } from "@/context/AuthContext";
import "./ProfileSettingsPage.css";

const ProfileSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({ fullName: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const loadProfile = async () => {
    try {
      const data = await fetchProfile();
      setProfile(data);
      setFormData({
        fullName: data.fullName,
        phone: data.phone || "",
        address: data.address || "",
      });
    } catch (err: any) {
      if (err?.response?.status === 401) {
        logout();
        navigate("/login");
      } else {
        showToast("فشل تحميل البيانات", "error");
      }
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updated = await updateProfile(formData);
      setProfile(updated);
      showToast("تم حفظ التغييرات بنجاح ✓", "success");
    } catch {
      showToast("فشل حفظ التغييرات", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (file: File) => {
    // عرض preview فوري قبل ما الـ upload يخلص
    const previewUrl = URL.createObjectURL(file);
    setProfile((prev) => prev ? { ...prev, avatar: previewUrl } : prev);

    try {
      const result = await updateProfileImage(file);
      // بعد ما الـ upload يخلص، حدث بالـ URL الحقيقي من السيرفر
      setProfile((prev) => prev ? { ...prev, avatar: result.avatar } : prev);
      showToast("تم تحديث الصورة بنجاح ✓", "success");
    } catch (err: any) {
      // لو فشل، ارجع للصورة القديمة
      const msg = err?.response?.data?.message || "فشل رفع الصورة";
      showToast(msg, "error");
      await loadProfile(); // reload to get original
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.msg}
        </div>
      )}

      {profile && (
        <>
          <ProfileHeader
            name={profile.fullName}
            profileImage={profile.avatar || null}
            completedOrders={profile.completedOrders || 0}
            onImageChange={handleImageChange}
          />

          <AccountInfoForm
            name={formData.fullName}
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