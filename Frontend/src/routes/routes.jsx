import { createBrowserRouter, RouterProvider } from "react-router";
import { useSelector } from "react-redux";
import AuthenticationPage from "../pages/AuthenticationPage/AuthenticationPage";
import LeaderBoard from "../pages/leaderboard/leaderboard";
import BoardPage from "../pages/BoardPage/BoardPage";
import MainLayout from "../layouts/MainLayout";
import LandingPage from "../Pages/Landing/Landing";
import BoardLayout from "../layouts/BoardLayout";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";

const AppRoutes = () => {
  const loggedIn = useSelector((state) => state.user);
  // const loggedIn = true;

  console.log("User logged in:", loggedIn);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: loggedIn ? (
        <MainLayout />
      ) : (
        <AuthenticationPage type={"login"} />
      ),
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

  return <RouterProvider router={routes} />;
};

export default AppRoutes;
