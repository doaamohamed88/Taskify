import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import st from "./teamMember.module.css"
import { faTrash, faUser } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export default function TeamMember({ name }) {
  const [showModal, setShowModal] = useState(false)
  const { t } = useTranslation()

  return (
    <div className={st.memberCard}>
      <div className={st.left}>
        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
        {name}
      </div>
      <div>
        <FontAwesomeIcon
          icon={faTrash}
          className={st.deleteIcon}
          onClick={() => setShowModal(true)}
        ></FontAwesomeIcon>
      </div>

      {showModal && (
        <div className={st.deleteModal}>
          <p>{t("deleteMemberConfirm", {name})}</p>
          <button onClick={() => setShowModal(false)}>{t('Cancel')}</button>
          <button>{t('Yes, Delete')}</button>
        </div>
      )}
    </div>
  )
}
