import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import AddServiceModal from "./components/AddServiceModal";
import NotificationsPanel from "./components/NotificationsPanel";
import Toast from "./components/Toast";
import { ProviderProvider } from "./context/ProviderContext";

import Orders from "./Orders";
import Services from "./Services";
import Discounts from "./Discounts";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import Profile from "./Profile";

import type { Page } from "./types";

export type { Page };

function ProviderContent() {
  const [page, setPage] = useState<Page>("dashboard");

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <Dashboard setPage={setPage} />;
      case "orders": return <Orders />;
      case "services": return <Services />;
      case "discounts": return <Discounts />;
      case "settings": return <Settings />;
      case "profile": return <Profile />;
    }
  };

  return (
    <div className="bg-[#F6FAFF] text-[#171C21] min-h-screen" dir="rtl">
      <Sidebar page={page} setPage={setPage} />
      <main className="mr-64 min-h-screen">
        <TopBar page={page} setPage={setPage} />
        {renderPage()}
      </main>
      <AddServiceModal />
      <NotificationsPanel />
      <Toast />
    </div>
  );
}

export default function ProviderLayout() {
  return (
    <ProviderProvider>
      <ProviderContent />
    </ProviderProvider>
  );
}
