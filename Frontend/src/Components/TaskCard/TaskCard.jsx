import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./TaskCard.module.css";
import { faEllipsis, faUserTie } from "@fortawesome/free-solid-svg-icons";
import TaskDetails from "../taskDetails/taskDetails";

const TaskCard = ({ task }) => {
  const modalRef = useRef();

  function handleShowModal() {
    modalRef.current.open();
  }

  return (
    <>
      <div className={`${styles.taskContainer}`} onClick={handleShowModal}>
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
