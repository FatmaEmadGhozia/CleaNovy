import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function DashboardApp() {
  return <RouterProvider router={router} />;
}