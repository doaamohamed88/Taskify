import styles from "./TasksList.module.css";
import TaskCard from "../TaskCard/TaskCard";
import { useTranslation } from "react-i18next";
import Modal from "../Modal/Modal";
import { useRef } from "react";
import CreateTask from "../CreateTask/CreateTask";
import useSelectedBoard from "../../hooks/useSelectedBoard";
import { useParams } from "react-router";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import * as FaIcons from "react-icons/fa6";

const TasksList = ({ title, status, tasks }) => {
  const { id } = useParams();
  const { selectedBoard } = useSelectedBoard();
  const { t } = useTranslation();
  const modalRef = useRef();

  const { setNodeRef, isOver } = useDroppable({
    id: status, // this is your droppable ID (column)
  });

  const taskListClass = `${styles.taskList} ${isOver ? styles.draggingOver : ""}`;

  function showModal() {
    modalRef.current.open();
  }

  function handleCloseModal() {
    modalRef.current.close();
  }

  return (
    <div className={styles.listContainer}>
      <div
        className={`${styles.titleContainer} ${title === "To Do"
            ? styles.todo
            : title === "In Progress"
              ? styles.inProgress
              : styles.done
          }`}
      >
        <p className={styles.title}>{t(title)}</p>
        {title === "To Do" && (
          <div className={styles.iconContainer}>
            <FaIcons.FaPlus onClick={showModal} />
            <Modal ref={modalRef} widthGrow>
              <CreateTask
                onClose={handleCloseModal}
                boardId={id || selectedBoard?.id}
              />
            </Modal>
          </div>
        )}
      </div>

      {/* 🔥 WRAP tasks inside SortableContext */}
      <div ref={setNodeRef} className={taskListClass}>
        <SortableContext
          id={status}
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.length === 0 ? (
            <div>{t("No tasks available.")}</div>
          ) : (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </SortableContext>
      </div>
    </div>
  );
};

export default TasksList;
