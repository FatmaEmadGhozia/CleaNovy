import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import ProtectedRoute from "./ProtectedRoute"
import ForgotPassword from "../Pages/Auth/ForgotPassword"
import ResetPassword from "../Pages/Auth/ResetPassword"
import LandingPage from "@/components/landing/LandingPage"
import LoginPage from "../Pages/Auth/LoginPage"
import SignUpPage from "@/Pages/Auth/SignUpPage"
import ProviderLayout from "@/Pages/provider/ProviderLayout"
import CartPage from "@/Pages/orders/CartPage"
import SchedulePage from "@/Pages/orders/SchedulePage"
import CheckoutPage from "@/Pages/orders/CheckoutPage"

import AboutPage from "@/Pages/AboutPage/AboutPage"
import ContactPage from "@/Pages/ContactPage/ContactPage"
import Settingspage from "@/Pages/Settingspage/Settingspage"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/*  Public Routes */}

        {/* orders routes */}

        <Route path="/cart" element={<CartPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Provider Routes */}
        <Route path="/provider/*" element={<ProviderLayout />} />
        <Route
          path="/provider"
          element={<Navigate to="/provider/dashboard" replace />}
        />
        {/* Protected Routes */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settingspage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
