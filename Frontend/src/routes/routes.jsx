import { createBrowserRouter, RouterProvider } from "react-router";
import AuthenticationPage from "../pages/AuthenticationPage/AuthenticationPage";
import LeaderBoard from "../pages/leaderboard/leaderboard";
import BoardPage from "../pages/BoardPage/BoardPage";
import MainLayout from "../layouts/MainLayout";
import LandingPage from "../Pages/Landing/Landing";
import BoardLayout from "../layouts/BoardLayout";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import ProtectedRoute from "../layouts/ProtectedRoute";
import GuestRoute from "../layouts/GuestRoute";
import { useSelector } from "react-redux";
const AppRoutes = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          element: <BoardLayout />,
          children: [
            {
              path: "tasks",
              element: <BoardPage />,
            },
            {
              path: "leader-board",
              element: <LeaderBoard />,
            },
            {
              path: "dashboard",
              element: <AdminDashboard />,
            },
          ],
        },
      ],
    },
    {
      element: <GuestRoute />,
      children: [
        {
          index: true,
          path: "/login",
          element: <AuthenticationPage type="login" />,
        },
        {
          path: "/register",
          element: <AuthenticationPage type="register" />,
        },
        {
          path: "/forget-password",
          element: <AuthenticationPage type="forgetPassword" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default AppRoutes;
