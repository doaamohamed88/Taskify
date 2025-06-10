import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./TaskCard.module.css";
import { faEllipsis, faUserTie } from "@fortawesome/free-solid-svg-icons";
import TaskDetails from "../taskDetails/taskDetails";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ task }) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const modalRef = useRef();

  function handleShowModal() {
    modalRef.current.open();
  }

  return (
    <>
      <div ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`${styles.taskContainer} ${isDragging ? styles.dragging : ""}`} onDoubleClick={handleShowModal}>
        <FontAwesomeIcon className={styles.icon} icon={faEllipsis} size="lg" />
        <h3>{task.title}</h3>

        <div className={styles.cardFooter}>
          <div className={styles.avatar}>
            <FontAwesomeIcon icon={faUserTie} size="lg" />
          </div>
          <span>{task.dueDate}</span>
        </div>
      </div>

      <TaskDetails modalRef={modalRef} task={task} />
    </>
  );
};

export default TaskCard;
