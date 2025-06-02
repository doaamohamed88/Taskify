import { faAngleLeft, faBorderAll, faDashboard, faTrophy } from "@fortawesome/free-solid-svg-icons"
import st from "./sidebar.module.css"
import SideBarButton from "./SideBarButton/SideBarButton"
import { useLocation } from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { toggleSidebar } from "../../store/sidebarSlice"

export default function Sidebar() {

  const collapseState = useSelector((state) => state.sidebarCollaps.collapsed)
  const dispatch = useDispatch()

  const toggleCollapse = () => {
    dispatch(toggleSidebar())
  }

  const location = useLocation()
  const path = location.pathname

  return (
    <div className={`${st.sidebar} ${collapseState ? st.collapsed : ""}`}>
      <SideBarButton
        title="Dashboard"
        icon={faDashboard}
        active={path == "/dashboard"}
        linkTo="/dashboard"
      ></SideBarButton>
      <SideBarButton
        title="Leaderboard"
        icon={faTrophy}
        active={path == "/leader-board"}
        linkTo="/leader-board"
      ></SideBarButton>
      <SideBarButton
        title="Tasks"
        icon={faBorderAll}
        active={path == "/tasks"}
        linkTo="/tasks"
      ></SideBarButton>
      <div className={`${st.collapse} ${collapseState && st.pointRight}`} onClick={toggleCollapse}>
        <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
      </div>
    </div>
  )
}
