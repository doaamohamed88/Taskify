import Card from "../Card/Card";
import styles from "./TasksList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "../TaskCard/TaskCard";

const TasksList = ({ title, color }) => {
  return (
    <div className={`${styles.listContainer}`}>
      <div
        className={`${styles.titleContainer}`}
        style={{ backgroundColor: color }}
      >
        <h1 className={`${styles.title}`}>{title}</h1>
        {title === "To Do" && (
          <div className={`${styles.iconContainer}`}>
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </div>
        )}
      </div>
      <Card size="large">
        <TaskCard />
      </Card>
    </div>
  );
};

export default TasksList;
