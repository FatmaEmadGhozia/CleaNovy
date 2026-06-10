import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { AuthProvider } from "./context/AuthContext";
// import App from "./App";
import { CleannovyPage } from "./Pages/CleannovyPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        {/* <App /> */}
        <CleannovyPage/>
       </ThemeProvider>
     </AuthProvider>
   </StrictMode>
);