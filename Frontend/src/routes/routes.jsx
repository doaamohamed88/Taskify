import { createBrowserRouter } from "react-router";
import AuthenticationPage from "../pages/AuthenticationPage/AuthenticationPage";
import BoardPage from "../pages/BoardPage/BoardPage";
import RootLayout from "./RootLayout";

export const routes = createBrowserRouter([
  {
    path: "/",
    // element: <AuthenticationPage type={"login"} />,
    element: <RootLayout />
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
    path: "/board",
    element: <BoardPage />,
  },
]);
