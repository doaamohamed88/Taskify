import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./teamMember.module.css"
import { faTrash, faUser } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "react-i18next"
import Modal from "../Modal/Modal"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateSelectedBoard } from "../../store/selectedBoard"
import { updateBoard } from "../../services/boardService"
import { getUserByEmail, updateUser } from "../../services/userService"
import useSelectedBoard from "../../hooks/useSelectedBoard"

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
          <p>{t("deleteMemberConfirm", { name })}</p>
          <div className="buttons">
            <button onClick={() => modalRef.current.close()}>{t("Cancel")}</button>
            <button onClick={deleteMember}>{t("Yes, Delete")}</button>
          </div>
        </div>
      </Modal>
    </>
  )
}
