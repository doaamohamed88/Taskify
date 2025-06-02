import { Outlet } from "react-router";
import Sidebar from "../Components/Sidebar/Sidebar";
import classes from './layout.module.css'
import { useSelector } from "react-redux";
export default function BoardLayout() {

  const collapseState = useSelector((state) => state.sidebarCollaps.collapsed);

  return (
    <div className={`${classes.layout_continer} ${collapseState ? classes.collapsed : ""}`}>
      <div className={classes.sidebar}>
        <Sidebar />
      </div>
      <div className={classes.outlit_container}>
        <Outlet />
      </div>
    </div>
  );
};

