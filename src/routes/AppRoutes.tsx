 import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import ResetPassword from "../Pages/Auth/ResetPassword";
import LandingPage from "@/components/landing/LandingPage";
import LoginPage from "../Pages/Auth/LoginPage";
// import Home from "../Pages/home/Home";
// import Login from "../Pages/auth/Login";
// import Signup from "../Pages/auth/Signup";
// import Dashboard from "../Pages/dashboard/Dashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/*  Public Routes */}
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} /> */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
         <Route path="/login" element={<LoginPage />} />
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
