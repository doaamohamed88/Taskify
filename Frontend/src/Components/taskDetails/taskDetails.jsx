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
import { useSelector } from "react-redux";

const TaskDetails = ({ modalRef, task }) => {
  const [detail, setDetail] = useState({
    id: task.id,
    title: task.title || "",
    description: task.description || "",
    status: task.status || "todo",
    dueDate: task.dueDate || "",
    assignee: task.assignee || "",
    difficulty: task.difficulty || "",
  });
    const selectedBoard = useSelector((state) => state.selectedBoard);

  const [boardMembers, setBoardMembers] = useState([]);
  const [status, setStatus] = useState(detail.status);
  const [isEditing, setIsEditing] = useState(false);

  // set assignee users form task details object as initial card members
  const [cardMembers, setCardMembers] = useState(task?.assignee || []);
  const [showMember, setShowMember] = useState(false);

  useEffect(() => {
    setDetail(task);
  }, [task]);

  useEffect(() => {
    setBoardMembers(selectedBoard.members || []);
  }, [selectedBoard]);


  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    // send the updated task details to your updateTask() API
    console.log("Updated Task:", {
      ...detail,
      status: status,
      assignee: cardMembers.map((member) => (member?.name || member?.email)).join(", "),
    });
    modalRef.current.close(); // Close the modal after saving
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
            value={task.status}
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
            value={task.dueDate}
            disabled={!isEditing}
          />
        </div>

        {/* Assignee */}
        <div className={classes.input_container}>
          <div className={classes.label_container}>
            <FaUser className={classes.icon} />
            <label className={classes.label}>Assignee</label>
          </div>
          {/* <div className={classes.value}>{detail.assignee}</div> */}
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
              onClick={() => setShowMember(true)}
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
              initialCardMembers={initialCardMembers}
              setCardMembers={setCardMembers}
              cardMembers={cardMembers}
              closeMember={() => setShowMember(false)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className={classes.buttons}>
          <button className={classes.main_button} type="submit">
            Save
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
