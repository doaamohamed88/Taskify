import { faAngleLeft, faBorderAll, faDashboard, faTrophy } from "@fortawesome/free-solid-svg-icons"
import styles from "./sidebar.module.css"
import SideBarButton from "./SideBarButton/SideBarButton"
import { useLocation } from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { toggleSidebar } from "../../store/sidebarSlice"
import { useParams } from "react-router"
export default function Sidebar() {
  const { id } = useParams();
  const collapseState = useSelector((state) => state.sidebarCollaps.collapsed)
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.user.id)
  const boardOwner = useSelector((state) => state.selectedBoard.owner)

  const toggleCollapse = () => {
    dispatch(toggleSidebar())
  }

  const location = useLocation()
  const path = location.pathname

  return (
    <div className={`${styles.sidebar} ${collapseState ? styles.collapsed : ""}`}>
      {boardOwner === userId && <SideBarButton
        title="Dashboard"
        icon={faDashboard}
        active={path === `/${id}/dashboard`}
        linkTo={`/${id}/dashboard`}
      ></SideBarButton>}
      <SideBarButton
        title="Leaderboard"
        icon={faTrophy}
        active={path === `/${id}/leader-board`}
        linkTo={`/${id}/leader-board`}
      ></SideBarButton>
      <SideBarButton
        title="Tasks"
        icon={faBorderAll}
        active={path === `/${id}/tasks`}
        linkTo={`/${id}/tasks`}
      ></SideBarButton>
      <div className={`${styles.collapse} ${collapseState && styles.pointRight}`} onClick={toggleCollapse}>
        <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
      </div>
    </div>
  )
}
