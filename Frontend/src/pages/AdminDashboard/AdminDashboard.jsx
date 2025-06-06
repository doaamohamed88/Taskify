import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ProgressCard from "../../Components/ProgressCard/ProgressCard"
import TeamMember from "../../Components/teamMemberCard/TeamMember"
import st from "./AdminDashboard.module.css"
import { useTranslation } from "react-i18next"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

export default function AdminDashboard() {

  const { t } = useTranslation()

  return (
    <div className={st.grid}>
      <h1>{t('Welcome back, ')}Admin 👋</h1>
      <div className={st.projectProgress}>
        <ProgressCard title="Completed" colorScheme="green" score={65}></ProgressCard>
        <ProgressCard title="In Progress" colorScheme="blue" score={15}></ProgressCard>
        <ProgressCard title="Not Started" colorScheme="red" score={20}></ProgressCard>
      </div>

      <div className={st.teamMembers}>
        <div className={st.teamMembersHeader}>
          <h2>{t('Team Members')}</h2>
          <FontAwesomeIcon icon={faPlus} className={st.addIcon}></FontAwesomeIcon>
        </div>
        <TeamMember name='Alice Johnson'></TeamMember>
        <TeamMember name='Bob Smith'></TeamMember>
        <TeamMember name='Charlie Brown'></TeamMember>
        <TeamMember name='Diana Prince'></TeamMember>
        <TeamMember name='Ethan Hunt'></TeamMember>
      </div>
    </div>
  )
}
