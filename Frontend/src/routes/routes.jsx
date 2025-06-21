import { createBrowserRouter, RouterProvider } from "react-router";
import React, { Suspense, lazy } from "react";
// Lazy load all main pages with correct casing
const AuthenticationPage = lazy(() => import("../Pages/AuthenticationPage/AuthenticationPage"));
const LeaderBoard = lazy(() => import("../Pages/LeaderBoard/LeaderBoard"));
const BoardPage = lazy(() => import("../Pages/BoardPage/BoardPage"));
const MainLayout = lazy(() => import("../layouts/MainLayout"));
const LandingPage = lazy(() => import("../Pages/Landing/Landing"));
const BoardLayout = lazy(() => import("../layouts/BoardLayout"));
const AdminDashboard = lazy(() => import("../Pages/AdminDashboard/AdminDashboard"));
const ProtectedRoute = lazy(() => import("../layouts/ProtectedRoute"));
const GuestRoute = lazy(() => import("../layouts/GuestRoute"));
const Boards = lazy(() => import("../Pages/Boards/Boards"));

const AppRoutes = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Suspense fallback={<div>Loading...</div>}><LandingPage /></Suspense>,
        },
        {
          path: 'createdboardsPage',
          element: <Suspense fallback={<div>Loading...</div>}><Boards /></Suspense>
        },
        {
          path: 'involvedboardsPage',
          element: <Suspense fallback={<div>Loading...</div>}><Boards /></Suspense>
        },
        {
          element: <Suspense fallback={<div>Loading...</div>}><BoardLayout /></Suspense>,
          path: ":id",
          children: [
            {
              path: "tasks",
              element: <Suspense fallback={<div>Loading...</div>}><BoardPage /></Suspense>,
            },
            {
              path: "leader-board",
              element: <Suspense fallback={<div>Loading...</div>}><LeaderBoard /></Suspense>,
            },
            {
              path: "dashboard",
              element: <Suspense fallback={<div>Loading...</div>}><AdminDashboard /></Suspense>,
            },
          ],
        },
      ],
    },
    {
      element: <Suspense fallback={<div>Loading...</div>}><GuestRoute /></Suspense>,
      children: [
        {
          index: true,
          path: "/login",
          element: <Suspense fallback={<div>Loading...</div>}><AuthenticationPage type="login" /></Suspense>,
        },
        {
          path: "/register",
          element: <Suspense fallback={<div>Loading...</div>}><AuthenticationPage type="register" /></Suspense>,
        },
        {
          path: "/forget-password",
          element: <Suspense fallback={<div>Loading...</div>}><AuthenticationPage type="forgetPassword" /></Suspense>,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default AppRoutes;
