import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
// import ProtectedProviderRoute from "./ProtectedProviderRoute";
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


import CartPage from "../pages/orders/CartPage"
import SchedulePage from "../pages/orders/SchedulePage"
import CheckoutPage from "../pages/orders/CheckoutPage"
import ShopPage from "../pages/ShopPage/ShopPage"

import ProviderLayout from "../pages/provider/ProviderLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/*  Public Routes */}

        {/* orders routes */}

        <Route path="/cart" element={<CartPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Shop page (user flow) */}
        <Route path="/laundry/:id" element={<ShopPage />} />

        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cleannovy" element={<CleannovyPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Orders Routes */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Provider Routes (Protected) */}
        <Route
          path="/provider"
          element={<Navigate to="/provider/dashboard" replace />}
        />
        <Route
          path="/provider/*"
          element={
            <ProtectedProviderRoute>
              <ProviderLayout />
            </ProtectedProviderRoute>
          }
        />

        {/* User Protected Routes */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settingspage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UsersManagement />} />
          <Route path="providers" element={<ProvidersManagement />} />
          <Route path="orders" element={<OrdersManagement />} />
          <Route path="services" element={<ServicesCategories />} />
          <Route path="reviews" element={<ReviewsReports />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}