import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ProgressCard from "../../Components/ProgressCard/ProgressCard"
import st from "./AdminDashboard.module.css"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "react-i18next"

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
        <h2>{t('Team Members')}</h2>
        <div className={st.memberCard}>
          <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
          Alice Johnson
        </div>
        <div className={st.memberCard}>
          <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
          Bob Smith
        </div>
        <div className={st.memberCard}>
          <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
          Charlie Brown
        </div>
        <div className={st.memberCard}>
          <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
          Diana Prince
        </div>
        <div className={st.memberCard}>
          <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
          Ethan Hunt
        </div>
      </div>
    </div>
  )
}
