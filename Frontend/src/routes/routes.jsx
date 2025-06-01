import { createBrowserRouter } from "react-router";
import AuthenticationPage from "../pages/AuthenticationPage/AuthenticationPage";
import BoardPage from "../pages/BoardPage/BoardPage";

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
    path: "/board",
    element: <BoardPage />,
  },
]);
