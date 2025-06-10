import TasksList from "../../components/TasksList/TasksList";
import styles from "./BoardPage.module.css";
import { DndContext } from "@dnd-kit/core";
import useSelectedBoard from "../../hooks/useSelectedBoard";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedBoard } from "../../store/selectedBoard";
import { updateBoard } from "../../services/boardService";
import { useState, useEffect } from "react";

const STATUSES = ["To Do", "In Progress", "Done"];

const BoardPage = () => {
  const dispatch = useDispatch();
  const selectedBoard = useSelector((state) => state.selectedBoard);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (selectedBoard && Array.isArray(selectedBoard.tasks)) {
      setTasks(selectedBoard.tasks);
    }
  }, [selectedBoard]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || !active) return;
    if (active.id === over.id) return;

    // Find the dragged task
    const draggedTask = tasks.find((t) => t.id === active.id);
    if (!draggedTask) return;

    // If dropped in a new column, update status
    const newStatus = over.id;
    if (STATUSES.includes(newStatus) && draggedTask.status !== newStatus) {
      const updatedTasks = tasks.map((task) =>
        task.id === active.id ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
      const updatedBoard = { ...selectedBoard, tasks: updatedTasks };
      dispatch(setSelectedBoard(updatedBoard));
      await updateBoard(selectedBoard.id, updatedBoard);
      return;
    }

    // Reorder within the same column
    const activeIndex = tasks.findIndex((t) => t.id === active.id);
    const overIndex = tasks.findIndex((t) => t.id === over.id);
    if (activeIndex === -1 || overIndex === -1) return;
    if (tasks[activeIndex].status !== tasks[overIndex].status) return;
    const reordered = [...tasks];
    const [removed] = reordered.splice(activeIndex, 1);
    reordered.splice(overIndex, 0, removed);
    setTasks(reordered);
    const updatedBoard = { ...selectedBoard, tasks: reordered };
    dispatch(setSelectedBoard(updatedBoard));
    await updateBoard(selectedBoard.id, updatedBoard);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={styles.boardContainer}>
        {STATUSES.map((status) => (
          <TasksList
            key={status}
            title={status}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default BoardPage;