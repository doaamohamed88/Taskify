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

  const getScoreBasedOnDifficulty = (difficulty) => {
    console.log('difficulty,,,,gggg', difficulty);
    if (difficulty === "Easy") return 5;
    if (difficulty === "Medium") return 10;
    if (difficulty === "Hard") return 20;

    return 0;
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || !active) return;
    if (active.id === over.id) return;

    const draggedTask = tasks.find((t) => t.id === active.id);
    if (!draggedTask) return;

    const newStatus = over.id;
    if (STATUSES.includes(newStatus) && draggedTask.status !== newStatus) {
      const updatedTasks = tasks.map((task) =>
        task.id === active.id ? { ...task, status: newStatus } : task
      );

      let boardMembers = selectedBoard.members;
      if (newStatus === 'Done') {
        // calculate score for each members...
        const selectedTask = tasks.find((task) => task.id === active.id);
        const asigneeMembers = selectedTask.members;

       boardMembers =  boardMembers.map(member => {
          const selected = asigneeMembers?.find(el => el.id === member.id);
          if(selected) {
            // calculate score.....
            return {
              ...member,
              score: (member.score || 0) + (getScoreBasedOnDifficulty(selectedTask.priority || selectedTask.difficulty))
            }
          }
          else {
            return member;
          }
        });
      };

      setTasks(updatedTasks);
      const updatedBoard = { ...selectedBoard, tasks: updatedTasks, members: boardMembers };
      dispatch(setSelectedBoard(updatedBoard));
      await updateBoard(selectedBoard.id, updatedBoard);
      return;
    }

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