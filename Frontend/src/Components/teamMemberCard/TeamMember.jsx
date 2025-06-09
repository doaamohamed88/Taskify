import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import st from "./teamMember.module.css"
import { faTrash, faUser } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "react-i18next"
import Modal from "../Modal/Modal"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateSelectedBoard } from "../../store/selectedBoard"
import { updateBoard } from "../../services/boardService"
import { getUserByEmail, updateUser } from "../../services/userService"

export default function TeamMember({ name, email }) {
  const { t } = useTranslation()
  const modalRef = useRef()
  const boardData = useSelector((state) => state.selectedBoard)
  const dispatch = useDispatch()


  function deleteMember() {
    modalRef.current.close()

    const updatedMembers = boardData.members.filter(
      (member) => member.email !== email
    )
    const updatedBoard = { ...boardData, members: updatedMembers }
    dispatch(updateSelectedBoard(updatedBoard))
    updateBoard(boardData.id, updatedBoard)

    const updateUserBoards = async () => {
      const user = await getUserByEmail(email)
      const updatedUser = { ...user, boards: user.boards.filter((board) => board.id !== boardData.id) }
      updateUser(user.id, updatedUser)
    }

    updateUserBoards()
  }

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
            <button onClick={deleteMember}>{t("Yes, Delete")}</button>
          </div>
        </div>
      </Modal>
    </>
  )
}
