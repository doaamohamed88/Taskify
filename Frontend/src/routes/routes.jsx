import { createBrowserRouter } from "react-router";
import AuthenticationPage from "../pages/AuthenticationPage/AuthenticationPage";
import AdminDashboard from "../pages/adminDashboard/AdminDashboard";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthenticationPage type={"login"} />,
  },
  {
    path: "/register",
    element: <AuthenticationPage type={"register"} />,
  },
  {
    path: "/forget-password",
    element: <AuthenticationPage type={"forgetPassword"} />,
  },
  {
    path: "/dashboard",
    element: <AdminDashboard></AdminDashboard>,
  }
]);
