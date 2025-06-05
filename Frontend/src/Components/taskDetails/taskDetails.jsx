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
} from "react-icons/fa";
import Members from "./Members";

const TaskDetails = ({ modalRef, taskId }) => {
  const [detail, setDetail] = useState({
    id: taskId,
    title: "",
    description: "",
    status: "todo",
    dueDate: "",
    assignee: "",
    difficulty: "",
  });
  const [boardMembers, setBoardMembers] = useState([]);

  const [status, setStatus] = useState(detail.status);

  const initialCardMembers = [{ id: 4, name: "Doaa Tawfik" }];
  // set assignee users form task details object as initial card members
  const [cardMembers, setCardMembers] = useState(initialCardMembers);
  const [showMember, setShowMember] = useState(false);

  useEffect(() => {
    // Fetch task detals based on task id ...
    fetchTaskDetails();
    // Fetch getBoardById to get its members...
    fetchBoardMembers();
  }, []);

  const fetchTaskDetails = async () => {
    // Simulate fetching task details from an API based on taskId come as prop or form url...
    const fetchedTask = {
      id: "10",
      title: "Setup CI/CD",
      description: "Configure GitHub Actions.",
      status: "todo",
      dueDate: "2026-01-05",
      assignee: "abdelrahmanali58@gmail.com",
      difficulty: "medium",
    };
    setDetail(fetchedTask);
  };

  const fetchBoardMembers = async () => {
    // Simulate fetching board members from an API
    const fetchedMembers = [
      { id: 1, name: "Abdelrahman Ali" },
      { id: 2, name: "Jamila Ahmed" },
      { id: 3, name: "Kareem Ayman" },
      { id: 4, name: "Doaa Tawfik" },
      { id: 5, name: "Mohamed Salah" },
      { id: 6, name: "Fatma Ali" },
    ];
    setBoardMembers(fetchedMembers);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

    const handleUpdateTask = (e) => {
        e.preventDefault();
        // send the updated task details to your updateTask() API
        console.log("Updated Task:", {
        ...detail,
        status: status,
        assignee: cardMembers.map((member) => member.name).join(", "),
        });
        modalRef.current.close(); // Close the modal after saving
    };

  return (
    <Modal ref={modalRef}>
      <form className={classes.form} onSubmit={handleUpdateTask}>
        <h2 className={classes.title}>Task Details</h2>

        {/* Title */}
        <div className={classes.input_container}>
          <div className={classes.label_container}>
            <FaTasks className={classes.icon} />
            <label className={classes.label}>Title</label>
          </div>
          <div className={classes.value}>{detail.title}</div>
        </div>

        {/* Description */}
        <div className={classes.input_container}>
          <div className={classes.label_container}>
            <FaFlag className={classes.icon} />
            <label className={classes.label}>Description</label>
          </div>
          <div className={classes.value}>{detail.description}</div>
        </div>

        {/* Priority */}
        <div className={classes.input_container}>
          <div className={classes.label_container}>
            <FaCheckCircle className={classes.icon} />
            <label className={classes.label}>Priority</label>
          </div>
          <div className={classes.value}>{detail.difficulty}</div>
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
            className={classes.select}
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
          <div className={classes.value}>{detail.dueDate}</div>
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
                  {member.name?.slice(0, 2).toUpperCase()}
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
          <button className={classes.main_button} type="submit">Save</button>
          <button className={classes.close} type="button" onClick={() => modalRef.current.close()}>Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskDetails;
