import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileSettingsPage from "./ProfileSettingsPage";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const Settingspage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div dir="ltr">
      <Navbar />
      <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
        <div style={{ padding: "12px 24px", borderBottom: "1px solid #f1f5f9" }} dir="rtl">
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "none", border: "none", cursor: "pointer",
              color: "#0D1F3C", fontSize: 14,
              fontFamily: "Tajawal, sans-serif", fontWeight: 600,
              padding: "4px 10px", borderRadius: 8, transition: "color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#14b8a6"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#0D1F3C"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            رجوع
          </button>
        </div>
        <ProfileSettingsPage />
      </div>
      <Footer />
    </div>
  );
};

export default Settingspage;