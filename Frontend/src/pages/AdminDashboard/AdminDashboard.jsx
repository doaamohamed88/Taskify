import st from './AdminDashboard.module.css';

export default function AdminDashboard() {
  return (
      <div className={st.grid}>
        <h1>Welcome Back, Kareem 👋</h1>
        
        <div className={st.sidebar}>sidebar</div>

        <div className={st.projectProgress}>Project Progress</div>

        <div className={st.teamMembers}>Team Members</div>
      </div>
  )
}
