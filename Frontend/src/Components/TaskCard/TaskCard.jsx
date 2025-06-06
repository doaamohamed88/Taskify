import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./TaskCard.module.css";
import { faEllipsis, faUserTie } from "@fortawesome/free-solid-svg-icons";
import TaskDetails from "../taskDetails/taskDetails";

const TaskCard = () => {
  const modalRef = useRef();

  function handleShowModal() {
    console.log('modalRef,,,,,', modalRef)
    modalRef.current.open();
  }

  return (
    <>
      <div className={`${styles.taskContainer}`} onClick={handleShowModal}>
        <FontAwesomeIcon className={styles.icon} icon={faEllipsis} size="lg" />
        <h3>Task Title</h3>

        <div className={styles.cardFooter}>
          <div className={styles.avatar}>
            <FontAwesomeIcon icon={faUserTie} size="lg" />
          </div>
          <span>Due Date: 01/01/2023</span>
        </div>
      </div>

      <TaskDetails modalRef={modalRef} />
    </>
  );
};

export default TaskCard;
