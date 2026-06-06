// Pages/provider/Settingspage/Settingspage.tsx
// هذه الصفحة هي الـ wrapper اللي بتظهر لما المستخدم يضغط على "الإعدادات"
// بتعرض ProfileSettingsPage مباشرةً

import React from "react";
import ProfileSettingsPage from "./ProfileSettingsPage";

const Settingspage: React.FC = () => {
  return <ProfileSettingsPage />;
};

export default Settingspage;