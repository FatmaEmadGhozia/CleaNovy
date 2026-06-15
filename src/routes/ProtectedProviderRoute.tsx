import { type ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

interface Props {
  children: ReactNode
}

export default function ProtectedProviderRoute({ children }: Props) {
  const { user } = useAuth()
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken")

  if (!token || !user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== "laundry_owner" && user.role !== "provider") {
    return <Navigate  to="/" replace />
  }

  return <>{children}</>
}
