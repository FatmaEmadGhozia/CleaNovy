import React from "react";
import ProfileSettingsPage from "./ProfileSettingsPage";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const Settingspage: React.FC = () => {
  return (
    <div dir="ltr">
      <Navbar />
      <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
        <ProfileSettingsPage />
      </div>
      <Footer />
    </div>
  );
};

export default Settingspage;