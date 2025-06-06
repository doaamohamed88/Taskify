import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import st from "./teamMember.module.css"
import { faTrash, faUser } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "react-i18next"
import Modal from "../Modal/Modal"
import { useRef } from "react"

export default function TeamMember({ name }) {
  const { t } = useTranslation()
  const modalRef = useRef()

  return (
    <>
      <div className={st.memberCard}>
        <div className={st.left}>
          <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
          {name}
        </div>
        <div>
          <FontAwesomeIcon
            icon={faTrash}
            className={st.deleteIcon}
            onClick={() => modalRef.current.open()}
          ></FontAwesomeIcon>
        </div>
      </div>

      <Modal ref={modalRef}>
        <div className={st.modal}>
          <p>{t("deleteMemberConfirm", { name })}</p>
          <div className="buttons">
            <button onClick={() => modalRef.current.close()}>{t("Cancel")}</button>
            <button>{t("Yes, Delete")}</button>
          </div>
        </div>
      </Modal>
    </>
  )
}
