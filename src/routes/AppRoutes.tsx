 import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import ResetPassword from "../Pages/Auth/ResetPassword";
import LandingPage from "@/components/landing/LandingPage";
import LoginPage from "../Pages/Auth/LoginPage";
import SignUpPage from "@/Pages/Auth/SignUpPage";
import ProviderLayout from "@/Pages/provider/ProviderLayout";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
      
        
  

        {/*  Public Routes */}
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
         <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} /> 
        <Route path="/provider" element={<ProviderLayout />} /> 
         <Route path="*" element={<Navigate to="/provider" replace />} />
         {/* <Route path="/provider" element={<Provider />} /> */}
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
