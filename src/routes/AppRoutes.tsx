import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import ProtectedRoute from "./ProtectedRoute";
import ProtectedProviderRoute from "./ProtectedProviderRoute";

import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import LandingPage from "../components/landing/LandingPage";
import LoginPage from "../pages/Auth/LoginPage";
import SignUpPage from "../pages/Auth/SignUpPage";
import AboutPage from "../pages/AboutPage/AboutPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import Settingspage from "../pages/Settingspage/Settingspage";
import { CleannovyPage } from "../pages/CleannovyPage";
import { Layout } from "@/modules/app/components/Layout";
import { Dashboard } from "@/modules/app/pages/Dashboard";
import { UsersManagement } from "@/modules/app/pages/UsersManagement";
import { ProvidersManagement } from "@/modules/app/pages/ProvidersManagement";
import { OrdersManagement } from "@/modules/app/pages/OrdersManagement";
import { ServicesCategories } from "@/modules/app/pages/ServicesCategories";
import { ReviewsReports } from "@/modules/app/pages/ReviewsReports";

import CartPage from "../pages/orders/CartPage";
import SchedulePage from "../pages/orders/SchedulePage";
import CheckoutPage from "../pages/orders/CheckoutPage";
import ShopPage from "../pages/ShopPage/ShopPage";

import ProviderLayout from "../pages/provider/ProviderLayout";

// Redirects based on auth state — default entry point
function SmartHome() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "laundry_owner" || user.role === "provider")
    return <Navigate to="/provider/dashboard" replace />;
  if (user.role === "admin")
    return <Navigate to="/dashboard" replace />;
  return <LandingPage />;
}

// Guards admin routes — non-admin users are bounced out
function AdminOnly() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/home" replace />;
  return <Outlet />;
}

// Prevents already-logged-in users from seeing the login page
function GuestOnly({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <>{children}</>;
  if (user.role === "laundry_owner" || user.role === "provider")
    return <Navigate to="/provider/dashboard" replace />;
  if (user.role === "admin")
    return <Navigate to="/dashboard" replace />;
  return <Navigate to="/home" replace />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Smart root — redirects based on auth */}
        <Route path="/" element={<SmartHome />} />

        {/* Landing page (for logged-in clients) */}
        <Route path="/home" element={<LandingPage />} />

        {/* Auth pages — guests only */}
        <Route path="/login"  element={<GuestOnly><LoginPage /></GuestOnly>} />
        <Route path="/signup" element={<GuestOnly><SignUpPage /></GuestOnly>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password"  element={<ResetPassword />} />

        {/* Public pages */}
        <Route path="/about"     element={<AboutPage />} />
        <Route path="/contact"   element={<ContactPage />} />
        <Route path="/cleannovy" element={<CleannovyPage />} />
        <Route path="/laundry/:id" element={<ShopPage />} />

        {/* Order flow — requires login */}
        <Route path="/cart"     element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="/schedule" element={<ProtectedRoute><SchedulePage /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />

        {/* User protected */}
        <Route
          path="/settings"
          element={<ProtectedRoute><Settingspage /></ProtectedRoute>}
        />

        {/* Provider routes (protected) */}
        <Route path="/provider" element={<Navigate to="/provider/dashboard" replace />} />
        <Route
          path="/provider/*"
          element={
            <ProtectedProviderRoute>
              <ProviderLayout />
            </ProtectedProviderRoute>
          }
        />

        {/* Admin routes — protected: admin only */}
        <Route element={<AdminOnly />}>
          <Route path="/" element={<Layout />}>
            <Route path="dashboard"  element={<Dashboard />} />
            <Route path="users"      element={<UsersManagement />} />
            <Route path="providers"  element={<ProvidersManagement />} />
            <Route path="orders"     element={<OrdersManagement />} />
            <Route path="services"   element={<ServicesCategories />} />
            <Route path="reviews"    element={<ReviewsReports />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
