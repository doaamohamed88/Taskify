import { Outlet } from "react-router";
import Sidebar from "../Components/Sidebar/Sidebar";

const BoardLayout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default BoardLayout;
