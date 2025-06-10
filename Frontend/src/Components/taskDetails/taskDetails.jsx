import classes from "./taskDetails.module.css";
import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaTasks,
  FaFlag,
  FaCheckCircle,
  FaUserPlus,
  FaPlus,
  FaPen,
} from "react-icons/fa";
import Members from "./Members";
import { useDispatch } from "react-redux";
import { updateSelectedBoard } from "../../store/selectedBoard";
import { updateBoard } from "../../services/boardService";
import { useParams } from "react-router";
import useSelectedBoard from "../../hooks/useSelectedBoard";

const TaskDetails = ({ modalRef, task }) => {
  const { id } = useParams;
  const [detail, setDetail] = useState({
    id: task.id,
    title: task.title || "",
    description: task.description || "",
    status: task.status || "todo",
    dueDate: task.dueDate || "",
    members: task.members || "",
    priority: task.priority || "",
  });
  const { selectedBoard } = useSelectedBoard();
  const dispatch = useDispatch();

  const boardId = id || selectedBoard?.id || null;

  const [boardMembers, setBoardMembers] = useState([]);
  const [status, setStatus] = useState(detail.status);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // set members users form task details object as initial card members
  const [cardMembers, setCardMembers] = useState(task?.members || []);
  const [showMember, setShowMember] = useState(false);

  console.log("cardMembers:", { cardMembers, task, selectedBoard });

  useEffect(() => {
    setDetail(task);
  }, [task]);

  useEffect(() => {
    setBoardMembers(selectedBoard.members || []);
  }, [selectedBoard]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    // send the updated task details to your updateTask() API
    const data = {
      ...detail,
      status: status,
      members: [...cardMembers],
    };

    try {
      setIsSubmitting(true);
      const response = await updateBoard(boardId, data);
      console.log("Task updated:", response);
      // Optionally reset form or show success message here
    } catch (error) {
      console.error("Error updating task:", error);
      // Optionally show error message here
    } finally {
      setIsSubmitting(false);
    }
    modalRef.current.close(); // Close the modal after saving
    const updatedTasks = selectedBoard.tasks.map((t) =>
      t.id === detail.id ? { ...t, ...detail, status, members: cardMembers } : t
    );
    const updatedBoard = { ...selectedBoard, tasks: updatedTasks };
    dispatch(updateSelectedBoard(updatedBoard));
  };

  return (
    <Modal ref={modalRef}>
      <form className={classes.form} onSubmit={handleUpdateTask}>
        <FaPen
          className={`${classes.icon} ${classes.edit_icon}`}
          onClick={() => setIsEditing(true)}
        />
        <h2 className={classes.title}>Task Details</h2>

        {/* Title */}
        <div className={classes.input_container}>
          <div className={classes.label_container}>
            <FaTasks className={classes.icon} />
            <label className={classes.label}>Title</label>
          </div>
          <input
            className={`${classes.value} ${classes.input}`}
            value={task.title}
            disabled={!isEditing}
          />
        </div>

        {/* Description */}
        <div className={classes.input_container}>
          <div className={classes.label_container}>
            <FaFlag className={classes.icon} />
            <label className={classes.label}>Description</label>
          </div>
          <input
            className={`${classes.value} ${classes.input}`}
            value={task.description}
            disabled={!isEditing}
          />
        </div>

        {/* Priority */}
        <div className={classes.input_container}>
          <div className={classes.label_container}>
            <FaCheckCircle className={classes.icon} />
            <label className={classes.label}>Priority</label>
          </div>
          <input
            className={`${classes.value} ${classes.input}`}
            value={task.difficulty}
            disabled={!isEditing}
          />
        </div>

        {/* Status Dropdown */}
        <div className={classes.input_container}>
          <div className={classes.label_container}>
            <FaCheckCircle className={classes.icon} />
            <label className={classes.label}>Status</label>
          </div>
          <select
            id="status"
            value={status}
            onChange={handleStatusChange}
            className={`${classes.value} ${classes.input}`}
            disabled={!isEditing}
          >
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* Due Date */}
        <div className={classes.input_container}>
          <div className={classes.label_container}>
            <FaCalendarAlt className={classes.icon} />
            <label className={classes.label}>Due Date</label>
          </div>
          <input
            className={`${classes.value} ${classes.input}`}
            value={task['due-date']}
            disabled={!isEditing}
          />
        </div>

        {/* members */}
        <div className={classes.input_container}>
          <div className={classes.label_container}>
            <FaUser className={classes.icon} />
            <label className={classes.label}>members</label>
          </div>
          {/* <div className={classes.value}>{detail.members}</div> */}
          <div className={`${classes.value} ${classes.members_container}`}>
            {cardMembers.map((member) => (
              <div
                key={member.id}
                className={`${classes.member} ${classes.truncate}`}
              >
                <span className={classes.memberAvatar}>
                  {(member.name || member.email)?.slice(0, 2).toUpperCase()}
                </span>
              </div>
            ))}
            <FaPlus
              className={classes.addIcon}
              onClick={() => isEditing && setShowMember(true)}
            />
          </div>
          <br />
          <div
            className={`${showMember ? classes.showMember : classes.hidden} ${
              classes.members_container
            }`}
            onBlur={() => setShowMember(false)}
          >
            <Members
              boardMembers={boardMembers}
              initialCardMembers={task?.members || []}
              setCardMembers={setCardMembers}
              cardMembers={cardMembers}
              closeMember={() => setShowMember(false)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className={classes.buttons}>
          <button
            className={classes.main_button}
            type="submit"
            disabled={!isEditing || isSubmitting}
          >
            Save {isSubmitting && <span className={classes.loading}>...</span>}
          </button>
          <button
            className={classes.close}
            type="button"
            onClick={() => modalRef.current.close()}
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskDetails;
