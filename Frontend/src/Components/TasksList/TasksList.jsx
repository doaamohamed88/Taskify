import styles from "./TasksList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "../TaskCard/TaskCard";
import { useTranslation } from "react-i18next";
import Modal from "../Modal/Modal";
import { useRef } from "react";
import CreateTask from "../CreateTask/CreateTask";
import useSelectedBoard from "../../hooks/useSelectedBoard";
import { useParams } from "react-router";
import { useDroppable } from "@dnd-kit/core";

const TasksList = ({ title, status, tasks }) => {
  const { id } = useParams();
  const { selectedBoard } = useSelectedBoard();

  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: { accepts: ["task"] },
  });
  const taskListClass = `${styles.taskList} ${
    isOver ? styles.draggingOver : ""
  }`;

  const { t } = useTranslation();
  const modalRef = useRef();

  function showModal() {
    modalRef.current.open();
  }

  function handleCloseModal() {
    modalRef.current.close();
  }

  return (
    <div className={`${styles.listContainer}`}>
      <div
        className={`${styles.titleContainer} ${
          title === "To Do"
            ? styles.todo
            : title === "In Progress"
            ? styles.inProgress
            : styles.done
        }`}
      >
        <h1 className={`${styles.title}`}>{t(title)}</h1>
        {title === "To Do" && (
          <div className={`${styles.iconContainer}`}>
            <FontAwesomeIcon icon={faPlus} size="lg" onClick={showModal} />
            <Modal ref={modalRef}>
              <CreateTask
                onClose={handleCloseModal}
                boardId={id || selectedBoard?.id}
              />
            </Modal>
          </div>
        )}
      </div>
      <div ref={setNodeRef} className={taskListClass}>
        {tasks.length === 0 ? (
          <div>{t("No tasks available.")}</div>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
};

export default TasksList;
