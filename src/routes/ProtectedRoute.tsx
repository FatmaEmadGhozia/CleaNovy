// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }: any) {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }


 import { Navigate } from "react-router-dom";
//   أضفنا كلمة type هنا لحل المشكلة
import type { ReactNode } from "react"; 

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}