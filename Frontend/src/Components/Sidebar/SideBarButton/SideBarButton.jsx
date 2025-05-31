import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import st from '../sidebar.module.css';

export default function SideBarButton({ title, icon, active }) {
  return (
    <div className={`${st.sidebarButton} ${active ? st.active : ''}`}>
        <FontAwesomeIcon icon={icon} className={st.sidebarButtonIcon}></FontAwesomeIcon>
        <span>{title}</span>
    </div>
  )
}
