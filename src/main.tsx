import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"

import { ThemeProvider } from "@/components/theme-provider.tsx"
  // import ForgotPassword from "./Pages/auth/ForgotPassword.tsx"
  // import ResetPassword from "./Pages/auth/ResetPassword.tsx"
import LoginPage from "./Pages/LoginPage/LoginPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      {/* <App />
       */}
      {/* <ForgotPassword /> */}
      <LoginPage />
      {/* <ResetPassword/> */}
    </ThemeProvider>
  </StrictMode>
)
 

 

 