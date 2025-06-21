import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./teamMember.module.css"
import { faTrash, faUser } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "react-i18next"
import Modal from "../Modal/Modal"
import { useRef } from "react"
import { useDispatch } from "react-redux"
import { updateSelectedBoard } from "../../store/selectedBoardSlice"
import { updateBoard } from "../../services/boardService"
import { getUserByEmail, updateUser } from "../../services/userService"
import useSelectedBoard from "../../hooks/useSelectedBoard"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function TeamMember({ name, email }) {
  const { t } = useTranslation()
  const modalRef = useRef()
  const { selectedBoard } = useSelectedBoard();

  const dispatch = useDispatch()


  function deleteMember() {
    modalRef.current.close()

    const updatedMembers = selectedBoard.members.filter(
      (member) => member.email !== email
    )
    const updatedBoard = { ...selectedBoard, members: updatedMembers }
    dispatch(updateSelectedBoard(updatedBoard))
    updateBoard(selectedBoard.id, updatedBoard)

    const updateUserBoards = async () => {
      const user = await getUserByEmail(email)
      const updatedUser = { ...user, boards: user.boards.filter((board) => board.id !== selectedBoard.id) }
      updateUser(user.id, updatedUser)
    }

    updateUserBoards()
  }

  return (
    <>
      <div className={styles.memberCard}>
        <div className={styles.left}>
          <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
          {name}
        </div>
        <div>
          <FontAwesomeIcon
            icon={faTrash}
            className={styles.deleteIcon}
            onClick={() => modalRef.current.open()}
          ></FontAwesomeIcon>
        </div>
      </div>

      <Modal ref={modalRef}>
        <div className={styles.modal}>
          <div onClick={e => e.stopPropagation()} className={styles.deleteModal}>
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className={styles.icon} />
            <p>{t("Are you sure?")}</p>
            <span>{t("This action can't be undone, all data associated with this field will be lost")}</span>
            <div className={styles.buttons}>
              <button type="button" className={styles.close} onClick={() => modalRef.current.close()} >
                {t("Close")}
              </button>
              <button type="submit" className={styles.main_button} onClick={deleteMember}>
                {t("Delete")}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
