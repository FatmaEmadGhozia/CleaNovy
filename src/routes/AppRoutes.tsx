import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import ResetPassword from "../Pages/Auth/ResetPassword";
import SignUpPage from "@/Pages/Auth/SignUpPage";
// import Home from "../Pages/home/Home";
// import Login from "../Pages/auth/Login";
// import Signup from "../Pages/auth/Signup";
// import Dashboard from "../Pages/dashboard/Dashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/*  Public Routes */}
         {/* <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="/signup" element={<SignUpPage />} /> 
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
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