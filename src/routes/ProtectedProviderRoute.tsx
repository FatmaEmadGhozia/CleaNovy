import { Navigate } from "react-router-dom"
import { authService } from "../services/authService"

interface Props {
  children: React.ReactNode
}

export default function ProtectedProviderRoute({ children }: Props) {
  if (!authService.isLoggedIn()) {
    return <Navigate to="/login" replace />
  }

  if (!authService.isProvider()) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
