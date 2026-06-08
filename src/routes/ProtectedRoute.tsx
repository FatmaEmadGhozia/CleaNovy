import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  // لو لسه بيتحمل، مش هنعمل redirect
  if (isLoading) {
    return null;
  }

  // لو مفيش user بعد ما خلص التحميل، روح للـ login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}