import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import st from '../sidebar.module.css';
import { useLocation, useNavigate } from 'react-router';

export default function SideBarButton({ title, icon, active, linkTo }) {

  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname

  function changePage(pageRoute) {
    if (pageRoute === path) return
    navigate(pageRoute)
  }

  return (
    <div className={`${st.sidebarButton} ${active ? st.active : ''}`} onClick={() => changePage(linkTo)}>
        <FontAwesomeIcon icon={icon} className={st.sidebarButtonIcon}></FontAwesomeIcon>
        <span className={st.desktopOnly}>{title}</span>
    </div>
  )
}
