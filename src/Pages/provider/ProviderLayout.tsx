import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom"
import Sidebar from "./components/Sidebar"
import TopBar from "./components/TopBar"
import AddServiceModal from "./components/AddServiceModal"
import NotificationsPanel from "./components/NotificationsPanel"
import Toast from "./components/Toast"
import { ProviderProvider } from "./context/ProviderContext"

import Orders from "./Orders"
import Services from "./Services"
import Discounts from "./Discounts"
import Dashboard from "./Dashboard"
import Profile from "./Profile"

import type { Page } from "./types"
export type { Page }

function ProviderContent() {
  const navigate = useNavigate()
  const location = useLocation()

  // derive current page from URL
  const pathToPage = (path: string): Page => {
    if (path.includes("/orders")) return "orders"
    if (path.includes("/services")) return "services"
    if (path.includes("/discounts")) return "discounts"
    if (path.includes("/profile")) return "profile"
    return "dashboard"
  }

  const page = pathToPage(location.pathname)

  const setPage = (p: Page) => {
    navigate(`/provider/${p === "dashboard" ? "dashboard" : p}`)
  }

  return (
    <div className="min-h-screen bg-[#F6FAFF] text-[#171C21]" dir="rtl">
      <Sidebar page={page} setPage={setPage} />
      <main className="mr-64 min-h-screen">
        <TopBar page={page} setPage={setPage} />
        <Routes>
          <Route path="dashboard" element={<Dashboard setPage={setPage} />} />
          <Route path="orders" element={<Orders />} />
          <Route path="services" element={<Services />} />
          <Route path="discounts" element={<Discounts />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </main>
      <AddServiceModal />
      <NotificationsPanel />
      <Toast />
    </div>
  )
}

export default function ProviderLayout() {
  return (
    <ProviderProvider>
      <ProviderContent />
    </ProviderProvider>
  )
}
