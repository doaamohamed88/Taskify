import { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./TaskCard.module.css"
import { faEllipsis, faTrash, faUserTie } from "@fortawesome/free-solid-svg-icons"
import TaskDetails from "../taskDetails/taskDetails"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useDispatch, useSelector } from "react-redux"
import { updateSelectedBoard } from "../../store/selectedBoard"
import { updateBoard } from "../../services/boardService"

const TaskCard = ({ task }) => {
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

  function handleShowModal() {
    modalRef.current.open()
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
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`${styles.taskContainer} ${isDragging ? styles.dragging : ""}`}
        onDoubleClick={handleShowModal}
      >
        <div className={styles.iconContainer}>
          <FontAwesomeIcon icon={faTrash} onClick={handleDeleteTask}></FontAwesomeIcon>
        </div>
        <h3 {...attributes} {...listeners}>
          {task.title}
        </h3>

        <div className={styles.cardFooter}>
          <div className={styles.avatar}>
            <FontAwesomeIcon icon={faUserTie} size="lg" />
          </div>
          <span>{task.dueDate}</span>
        </div>
      </div>

      <TaskDetails modalRef={modalRef} task={task} />
    </>
  )
}

export default TaskCard
