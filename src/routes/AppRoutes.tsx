 import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import ResetPassword from "../Pages/Auth/ResetPassword";
import LandingPage from "@/components/landing/LandingPage";
import LoginPage from "../Pages/Auth/LoginPage";
import SignUpPage from "@/Pages/Auth/SignUpPage";
import ProviderLayout from "@/Pages/provider/ProviderLayout";
import CartPage from "@/Pages/orders/CartPage";
import SchedulePage from "@/Pages/orders/SchedulePage";
import CheckoutPage from "@/Pages/orders/CheckoutPage";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
      
        
  

        {/*  Public Routes */}



{/* orders routes */}


  <Route path="/cart"          element={<CartPage />} />
        <Route path="/schedule"  element={<SchedulePage />} />
        <Route path="/checkout"  element={<CheckoutPage />} />
        <Route path="/" element={<LandingPage />} />
      
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
         <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} /> 
        <Route path="/provider" element={<ProviderLayout />} />
        <Route path="*" element={<Navigate to="/provider" replace />} />
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {/* <Dashboard /> */}
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
