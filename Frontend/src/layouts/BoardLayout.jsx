import { Outlet } from "react-router";
import Sidebar from "../Components/Sidebar/Sidebar";
import classes from './layout.module.css'
export default function BoardLayout() {
  return (
    <div className={classes.layout_continer}>
      <div className={classes.sidebar}>
        <Sidebar />
      </div>
      <div className={classes.outlit_container}>
        <Outlet />
      </div>
    </div>
  );
};

