import { createBrowserRouter } from "react-router";
import AuthenticationPage from "../pages/AuthenticationPage/AuthenticationPage";
import LeaderBoard from "../pages/leaderboard/leaderboard";
import BoardPage from "../pages/BoardPage/BoardPage";
import AdminDashboard from "../pages/adminDashboard/AdminDashboard";
import MainLayout from "../layouts/MainLayout";
import LandingPage from "../Pages/Landing/Landing";
import BoardLayout from "../layouts/BoardLayout";

const loggedIn = true;

export const routes = createBrowserRouter([
  {
    path: "/",
    element: loggedIn ? <MainLayout /> : <AuthenticationPage type={"login"} />,
    children: loggedIn
      ? [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          element: <BoardLayout />,
          children: [
            {
              path: "/tasks",
              element: <BoardPage />,
            },
            {
              path: "/leader-board",
              element: <LeaderBoard />,
            },
            {
              path: "/dashboard",
              element: <AdminDashboard />,
            },
          ],
        },
      ]
      : null,
  },
  {
    path: "/register",
    element: <AuthenticationPage type={"register"} />,
  },
  {
    path: "/forget-password",
    element: <AuthenticationPage type={"forgetPassword"} />,
  },
]);
