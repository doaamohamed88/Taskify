import styles from "./TasksList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "../TaskCard/TaskCard";
import { useTranslation } from "react-i18next";
import Modal from "../Modal/Modal";
import { useRef, useState, useEffect } from "react";
import CreateTask from "../CreateTask/CreateTask";
import useSelectedBoard from "../../hooks/useSelectedBoard";
import { useParams } from "react-router";

const TasksList = ({ title }) => {
  const filter =
    title === "To Do"
      ? "To Do"
      : title === "In Progress"
      ? "In Progress"
      : "Done";

      const {id} = useParams()
  const { selectedBoard } = useSelectedBoard();
  const [tasks, setTasks] = useState([]);
  console.log('task list,,,,',{tasks, selectedBoard});

  useEffect(() => {
      const boardTasks =
    selectedBoard && Array.isArray(selectedBoard.tasks)
      ? selectedBoard.tasks
      : [];
  console.log(boardTasks);

  if (boardTasks) {
    setTasks(boardTasks.filter((task) => task.status === filter));
  }
  }, [selectedBoard]);

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
      {tasks.length === 0 ? (
        <div>No tasks available.</div>
      ) : (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
};

export default TasksList;
