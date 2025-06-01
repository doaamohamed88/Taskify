import { createBrowserRouter } from "react-router";
import AuthenticationPage from "../pages/AuthenticationPage/AuthenticationPage";
import LeaderBoard from "../pages/leaderboard/leaderboard";
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
    path: "/leader-board",
    element: <LeaderBoard />,
  },
  {
    path: "/board",
    element: <BoardPage />,
  },
]);
