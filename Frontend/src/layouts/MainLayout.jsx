import { Outlet } from "react-router";
import Header from "../Components/Header/Header";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default MainLayout;
