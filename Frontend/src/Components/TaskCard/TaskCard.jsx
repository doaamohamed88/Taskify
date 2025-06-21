import { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./TaskCard.module.css"
import { faTrash, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import TaskDetails from "../taskDetails/taskDetails"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useDispatch, useSelector } from "react-redux"
import { updateSelectedBoard } from "../../store/selectedBoardSlice"
import { updateBoard } from "../../services/boardService"
import { useTranslation } from "react-i18next"
import Modal from "../Modal/Modal"
const TaskCard = ({ task }) => {
  const deleteModalRef = useRef()
  const { t } = useTranslation()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  })

  const selectedBoard = useSelector((state) => state.selectedBoard)
  const dispatch = useDispatch()

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const modalRef = useRef()

  function handleShowModal(e) {
    e.stopPropagation()
    modalRef.current.open()
  }

  function getRandomColor(index) {
    const colors = ["#FFC107", "#03A9F4", "#E91E63", "#4CAF50", "#9C27B0"];
    return colors[index % colors.length];
  }


  const handleDeleteTask = async (e) => {
    e.stopPropagation()
    if (!selectedBoard) return
    const updatedTasks = selectedBoard.tasks.filter((t) => t.id !== task.id)
    const updatedBoard = { ...selectedBoard, tasks: updatedTasks }
    try {
      await updateBoard(selectedBoard.id, updatedBoard)
      dispatch(updateSelectedBoard(updatedBoard))
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  };

  function handleOpenDeleteModal(e) {
    e.stopPropagation();
    deleteModalRef.current.open();
  }

  return (
    <div className={styles.mainContainer}>
      <FontAwesomeIcon icon={faTrash} onClick={(e) => handleOpenDeleteModal(e)} className={styles.icon} />
      <Modal ref={deleteModalRef}>
        <div onClick={e => e.stopPropagation()} className={styles.deleteModal}>
          <FontAwesomeIcon icon={faTriangleExclamation} className={styles.delete_icon} />
          <p>{t("Are you sure?")}</p>
          <span>{t("This action can't be undone, all data associated with this field will be lost")}</span>
          <div className={styles.buttons}>
            <button type="button" className={styles.close} onClick={(e) => deleteModalRef.current.close(e)}>
              {t("Close")}
            </button>
            <button type="submit" className={styles.main_button} onClick={(e) => handleDeleteTask(e)}>
              {t("Delete")}
            </button>
          </div>
        </div>
      </Modal>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`${styles.taskContainer} ${isDragging ? styles.dragging : ""}`}
        onDoubleClick={(e) => handleShowModal(e)}
      >
        <div className={styles.iconContainer}>
          <p className={styles.title}>
            {task.title}
          </p>
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.members}>
            {task.members?.length && task.members.map((member, idx) => (
              <div
                key={idx}
                className={styles.member_circle}
                style={{ backgroundColor: getRandomColor(idx) }}
              >
                {member?.email?.charAt(0).toUpperCase()}
              </div>
            ))}
          </div>
          <span>
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
              : "No due date"}
          </span>
        </div>
      </div>
      <TaskDetails modalRef={modalRef} task={task} />
    </div>
  )
}

export default TaskCard
