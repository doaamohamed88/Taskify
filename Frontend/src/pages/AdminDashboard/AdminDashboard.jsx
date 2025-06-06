import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ProgressCard from "../../Components/ProgressCard/ProgressCard"
import TeamMember from "../../Components/teamMemberCard/TeamMember"
import st from "./AdminDashboard.module.css"
import { useTranslation } from "react-i18next"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useRef } from "react"
import Modal from "../../Components/Modal/Modal"

export default function AdminDashboard() {

  const modalRef = useRef()
  const { t } = useTranslation()

  return (
    <>
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
          <FontAwesomeIcon icon={faPlus} className={st.addIcon} onClick={() => modalRef.current.open()}></FontAwesomeIcon>
        </div>
        <TeamMember name='Alice Johnson'></TeamMember>
        <TeamMember name='Bob Smith'></TeamMember>
        <TeamMember name='Charlie Brown'></TeamMember>
        <TeamMember name='Diana Prince'></TeamMember>
        <TeamMember name='Ethan Hunt'></TeamMember>
      </div>
    </div>

    <Modal ref={modalRef}>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <h3 className="modal-title">{t('Add New Team Member')}</h3>
        <label htmlFor="teamMemberEmail">Please Enter Team Member Email:</label>
        <input type="email" id="teamMemberEmail" name="teamMemberEmail" placeholder="Enter Email"></input>
        <div className={st.buttons}>
          <button onClick={() => modalRef.current.close()}>{t('Close')}</button>
          <button type="submit">{t('Add')}</button>
        </div>
      </form>

    </Modal>

    </>
  )
}
