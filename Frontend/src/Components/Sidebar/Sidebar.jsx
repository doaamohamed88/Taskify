import { faBorderAll, faDashboard, faTrophy } from '@fortawesome/free-solid-svg-icons';
import st from './sidebar.module.css';
import SideBarButton from './SideBarButton/SideBarButton';

export default function Sidebar() {
  return (
    <div className={st.sidebar}>
        <SideBarButton title="Dashboard" icon={faDashboard} active={true}></SideBarButton>
        <SideBarButton title="Leaderboard" icon={faTrophy}></SideBarButton>
        <SideBarButton title="Boards" icon={faBorderAll}></SideBarButton>
    </div>
  )
}
