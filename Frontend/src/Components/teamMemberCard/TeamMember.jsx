import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import st from "./teamMemberCard.module.css"
import { faTrash, faUser } from "@fortawesome/free-solid-svg-icons"

export default function TeamMember({ name }) {
  return (
    <div className={st.memberCard}>
      <div className={st.left}>
          <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
          {name}
      </div>
      <div>
          <FontAwesomeIcon icon={faTrash} className={st.deleteIcon}></FontAwesomeIcon>
      </div>
    </div>
  )
}
