import styles from "./TasksList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "../TaskCard/TaskCard";
import { useTranslation } from "react-i18next";
import Modal from "../Modal/Modal";
import { useRef, useState } from "react";
import CreateTask from "../CreateTask/CreateTask";
import { useSelector } from "react-redux";

const TasksList = ({ title }) => {
  const filter =
    title === "To Do"
      ? "todo"
      : title === "In Progress"
      ? "in-progress"
      : "done";
  const selectedBoard = useSelector((state) => state.selectedBoard);
  const [tasks, setTasks] = useState(
    selectedBoard.tasks.filter((task) => task.status === filter)
  );
  console.log(tasks);

  const { t } = useTranslation();
  const modalRef = useRef();

  function showModal() {
    modalRef.current.open();
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
              <CreateTask />
            </Modal>
          </div>
        )}
      </div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TasksList;
