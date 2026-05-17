import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

import Orders from "./Orders";
import Services from "./Services";
import Discounts from "./Discounts";
import Dashboard from "./Dashboard";

export type Page = "dashboard" | "orders" | "services" | "discounts";

export default function ProviderLayout() {
  const [page, setPage] = useState<Page>("dashboard");

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <Dashboard />;
      case "orders": return <Orders />;
      case "services": return <Services />;
      case "discounts": return <Discounts />;
    }
  };

  return (
    <div className="bg-[#F6FAFF] text-[#171C21] min-h-screen" dir="rtl">
      <Sidebar page={page} setPage={setPage} />
      <main className="mr-64 min-h-screen">
        <TopBar page={page} />
        {renderPage()}
      </main>
    </div>
  );
}


