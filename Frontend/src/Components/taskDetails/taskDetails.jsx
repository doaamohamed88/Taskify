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
import { useTranslation } from "react-i18next";

const TaskDetails = ({ modalRef, task }) => {
  const { id } = useParams;
  const [detail, setDetail] = useState({
    id: task.id,
    title: task.title || "",
    description: task.description || "",
    dueDate: task.dueDate || task["due-date"],
    members: task.members || "",
    difficulty: task.difficulty || "",
  });
  const { selectedBoard } = useSelectedBoard();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const boardId = id || selectedBoard?.id || null;

  const [boardMembers, setBoardMembers] = useState([]);
  // const [status, setStatus] = useState(detail.status);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [cardMembers, setCardMembers] = useState(task?.members || []);
  const [showMember, setShowMember] = useState(false);

  console.log("cardMembers:", { cardMembers, task, selectedBoard });

  useEffect(() => {
    setDetail({
      id: task.id,
      title: task.title || "",
      description: task.description || "",
      status: task.status || "todo",
      dueDate: task.dueDate || task["due-date"] || "",
      members: task.members || "",
      difficulty: task.priority || task.difficulty || "",
    });
  }, [task]);

  useEffect(() => {
    setBoardMembers(selectedBoard.members || []);
  }, [selectedBoard]);

  useEffect(() => {
    console.log(isEditing);
  }, [isEditing]);

  // const handleStatusChange = (e) => {
  //   setStatus(e.target.value);
  // };

  const handleUpdateTask = async (e) => {
    e.preventDefault();

    const updatedTask = {
      ...detail,
      status: status || detail.status || "To Do",
      members: [...cardMembers],
    };

    const updatedTasks = selectedBoard.tasks.map((t) =>
      t.id === detail.id ? updatedTask : t
    );
    const updatedBoard = { ...selectedBoard, tasks: updatedTasks };

    try {
      setIsSubmitting(true);
      await updateBoard(boardId, updatedBoard);

      dispatch(updateSelectedBoard(updatedBoard));
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setIsSubmitting(false);
      setIsEditing(false);
      modalRef.current.close();
    }
  };

  return (
    <Modal ref={modalRef}>
      <form className={classes.form} onSubmit={handleUpdateTask}>
        <FaPen
          className={`${classes.icon} ${classes.edit_icon}`}
          onClick={() => setIsEditing(true)}
        />
        <h2 className={classes.title}>{t("Task Details")}</h2>

        {/* Title */}
        <div className={classes.input_container}>
          <div className={classes.label_container}>
            <FaTasks className={classes.icon} />
            <label className={classes.label}>{t("Title")}</label>
          </div>
          <input
            className={`${classes.value} ${classes.input}`}
            value={detail.title}
            onChange={(e) =>
              isEditing && setDetail({ ...detail, title: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>

        <div className={classes.input_container}>
          <div className={classes.label_container}>
            <FaFlag className={classes.icon} />
            <label className={classes.label}>{t("Description")}</label>
          </div>
          <input
            className={`${classes.value} ${classes.input}`}
            value={detail.description}
            onChange={(e) =>
              isEditing && setDetail({ ...detail, description: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>

        <div className={classes.input_container}>
          <div className={classes.label_container}>
            <FaCheckCircle className={classes.icon} />
            <label className={classes.label}>{t("difficulty")}</label>
          </div>
          <select
            name="difficulty"
            id="difficulty"
            className={`${classes.value} ${classes.input}`}
            value={detail.difficulty}
            onChange={(e) =>
              isEditing && setDetail({ ...detail, difficulty: e.target.value })
            }
            required
            disabled={!isEditing}
          >
            <option value="Easy">{t("Easy")}</option>
            <option value="Medium">{t("Medium")}</option>
            <option value="Hard">{t("Hard")}</option>
          </select>
        </div>

        {/* Due Date */}
        <div className={classes.input_container}>
          <div className={classes.label_container}>
            <FaCalendarAlt className={classes.icon} />
            <label className={classes.label}>{t("Due Date")}</label>
          </div>
          <input
            type="date"
            className={`${classes.value} ${classes.input}`}
            value={detail.dueDate}
            onChange={(e) =>
              isEditing && setDetail({ ...detail, dueDate: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>

        {/* members */}
        <div className={classes.input_container}>
          <div className={classes.label_container}>
            <FaUser className={classes.icon} />
            <label className={classes.label}>{t("Members")}</label>
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
            className={`${showMember ? classes.showMember : classes.hidden} ${classes.members_container
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
            className={classes.close}
            type="button"
            onClick={() => modalRef.current.close()}
          >
            {t("Close")}
          </button>
          <button
            className={classes.main_button}
            type="submit"
            disabled={!isEditing || isSubmitting}
          >
            {t("Save")}{" "}
            {isSubmitting && <span className={classes.loading}>...</span>}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskDetails;
