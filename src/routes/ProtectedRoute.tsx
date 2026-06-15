// src/routes/ProtectedProviderRoute.tsx
// import { Navigate } from "react-router-dom";
// import { authService } from "../services/authService";

// interface Props {
//   children: React.ReactNode;
// }

// export default function ProtectedProviderRoute({ children }: Props) {
//   if (!authService.isLoggedIn()) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!authService.isProvider()) {
//     return <Navigate to="/" replace />;
//   }

//   return <>{children}</>;
// }

import { Navigate } from "react-router-dom"

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
