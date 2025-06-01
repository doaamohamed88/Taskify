import styles from "./TasksList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "../TaskCard/TaskCard";

const TasksList = ({ title }) => {
  return (
    <div className={`${styles.listContainer}`}>
      <div
        className={`${styles.titleContainer} ${title === "To Do" ? styles.todo : title === "In Progress" ? styles.inProgress : styles.done}`}

      >
        <h1 className={`${styles.title}`}>{title}</h1>
        {title === "To Do" && (
          <div className={`${styles.iconContainer}`}>
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </div>
        )}
      </div>
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </div>
  );
};

export default TasksList;
