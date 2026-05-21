import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { UsersManagement } from "./pages/UsersManagement";
import { ProvidersManagement } from "./pages/ProvidersManagement";
import { OrdersManagement } from "./pages/OrdersManagement";
import { ServicesCategories } from "./pages/ServicesCategories";
import { ReviewsReports } from "./pages/ReviewsReports";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "users", Component: UsersManagement },
      { path: "providers", Component: ProvidersManagement },
      { path: "orders", Component: OrdersManagement },
      { path: "services", Component: ServicesCategories },
      { path: "reviews", Component: ReviewsReports },
    ],
  },
]);
