 import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import ResetPassword from "../Pages/Auth/ResetPassword";
import LandingPage from "@/components/landing/LandingPage";
import LoginPage from "../Pages/Auth/LoginPage";
import SignUpPage from "@/Pages/Auth/SignUpPage";
import ProviderLayout from "@/Pages/provider/ProviderLayout";
import DashboardApp from "@/modules/app/App";
import { Layout } from "@/modules/app/components/Layout";
import { Dashboard } from "@/modules/app/pages/Dashboard";
import { UsersManagement } from "@/modules/app/pages/UsersManagement";
import { ProvidersManagement } from "@/modules/app/pages/ProvidersManagement";
import { OrdersManagement } from "@/modules/app/pages/OrdersManagement";
import { ServicesCategories } from "@/modules/app/pages/ServicesCategories";
import { ReviewsReports } from "@/modules/app/pages/ReviewsReports";


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
        {/* Protected Routes */}
        {/*  */}
        <Route path="/" element={<Layout />} >
        <Route path="dashboard"  element={<Dashboard/>}  />
        <Route path="users" element={<UsersManagement />} />
        <Route path="providers" element={<ProvidersManagement />} />
        <Route path="orders" element={<OrdersManagement />} />
        <Route path="services" element={<ServicesCategories />} />
        <Route path="reviews" element={<ReviewsReports />} />
        
        
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
