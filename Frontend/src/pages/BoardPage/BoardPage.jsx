import TasksList from "../../components/TasksList/TasksList";
import styles from "./BoardPage.module.css";

const BoardPage = () => {
  return (
    <div className={`${styles.boardContainer}`}>
      <TasksList title={"To Do"} color={"blue"} />
      <TasksList title={"In Progress"} color={"blue"} />
      <TasksList title={"Done"} color={"blue"} />
    </div>
  );
};

export default BoardPage;
