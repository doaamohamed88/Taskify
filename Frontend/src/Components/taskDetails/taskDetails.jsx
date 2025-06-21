import styles from "./taskDetails.module.css";
import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaTasks,
  FaFlag,
  FaCheckCircle,
  FaPlus,
  FaPen,
  FaTimes // Add this for cancel icon
} from "react-icons/fa";
import Members from "./Members";
import { useParams } from "react-router";
import useSelectedBoard from "../../hooks/useSelectedBoard";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { updateTask } from "../../services/boardService";
import { fetchBoardById } from "../../store/board/BoardActions";
import { updateTaskInBoard } from "../../store/selectedBoardSlice";

const TaskDetails = ({ modalRef, task }) => {
  const { id } = useParams();
  const [detail, setDetail] = useState({
    id: task.id,
    title: task.title || "",
    description: task.description || "",
    dueDate: task.dueDate,
    members: Array.isArray(task.members) ? task.members : [],
    difficulty: task.difficulty || "",
    status: task.status || "To Do",
  });

  const { selectedBoard } = useSelectedBoard();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const boardId = id || selectedBoard?.id || null;
  const [boardMembers, setBoardMembers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cardMembers, setCardMembers] = useState(task?.members || []);
  const [showMember, setShowMember] = useState(false);

  // Store original values to revert on cancel
  const [originalValues, setOriginalValues] = useState({ ...detail });

  useEffect(() => {
    const formattedDate = task.dueDate
      ? new Date(task.dueDate).toISOString().split("T")[0]
      : "";
    setDetail({
      id: task.id,
      title: task.title || "",
      description: task.description || "",
      status: task.status || "To Do",
      dueDate: formattedDate,
      members: Array.isArray(task.members) ? task.members : [],
      difficulty: task.difficulty || "",
    });

    // Save original values whenever task changes
    setOriginalValues({
      ...task,
      dueDate: formattedDate,
      members: [...(Array.isArray(task.members) ? task.members : [])]
    });
  }, [task]);

  useEffect(() => {
    setBoardMembers(selectedBoard.members || []);
  }, [selectedBoard]);

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedTask = {
        ...detail,
        status: detail.status || "To Do",
        dueDate: detail.dueDate ? new Date(detail.dueDate) : null,
        members: [...cardMembers],
      };

      await updateTask(boardId, detail.id, updatedTask);
      dispatch(updateTaskInBoard(updatedTask));
      modalRef.current.close();
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setIsSubmitting(false);
      setIsEditing(false);
    }
  };

  // Toggle edit mode and save/cancel
  const toggleEdit = () => {
    if (isEditing) {
      // Cancel edit mode - revert to original values
      setDetail({ ...originalValues });
      setCardMembers([...originalValues.members]);
    }
    setIsEditing(!isEditing);
  };

  return (
    <Modal ref={modalRef}>
      <form className={styles.form} onSubmit={handleUpdateTask}>
        {/* Toggle between edit and cancel icon */}
        <div className={styles.edit_toggle} onClick={toggleEdit}>
          {isEditing ? (
            <FaTimes className={`${styles.icon} ${styles.edit_icon}`} />
          ) : (
            <FaPen className={`${styles.icon} ${styles.edit_icon}`} />
          )}
        </div>

        <h2 className={styles.title}>{t("Task Details")}</h2>

        <div className={styles.container}>
          {/* Title */}
          <div className={styles.input_container}>
            <div className={styles.label_container}>
              <FaTasks className={styles.icon} />
              <label className={styles.label}>{t("Title")}</label>
            </div>
            <input
              className={`${styles.value} ${styles.input} ${isEditing ? styles.editing : ""
                }`}
              value={detail.title}
              onChange={(e) =>
                isEditing && setDetail({ ...detail, title: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>

          {/* Description */}
          <div className={styles.input_container}>
            <div className={styles.label_container}>
              <FaFlag className={styles.icon} />
              <label className={styles.label}>{t("Description")}</label>
            </div>
            <input
              className={`${styles.value} ${styles.input} ${isEditing ? styles.editing : ""
                }`}
              value={detail.description}
              onChange={(e) =>
                isEditing && setDetail({ ...detail, description: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className={styles.container}>

          {/* Difficulty */}
          <div className={styles.input_container}>
            <div className={styles.label_container}>
              <FaCheckCircle className={styles.icon} />
              <label className={styles.label}>{t("difficulty")}</label>
            </div>
            <select
              name="difficulty"
              id="difficulty"
              className={`${styles.value} ${styles.input} ${isEditing ? styles.editing : ""
                }`}
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
          <div className={styles.input_container}>
            <div className={styles.label_container}>
              <FaCalendarAlt className={styles.icon} />
              <label className={styles.label}>{t("Due Date")}</label>
            </div>
            <input
              type="date"
              className={`${styles.value} ${styles.input} ${isEditing ? styles.editing : ""
                }`}
              value={detail.dueDate}
              onChange={(e) =>
                isEditing && setDetail({ ...detail, dueDate: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>
        </div>
        {/* Members */}
        <div className={styles.input_container}>
          <div className={styles.label_container}>
            <FaUser className={styles.icon} />
            <label className={styles.label}>{t("Members")}</label>
          </div>
          <div className={`${styles.value} ${styles.members_container}`}>
            {cardMembers.map((member) => (
              <div
                key={member._id}
                className={`${styles.member} ${styles.truncate}`}
              >
                <span className={styles.memberAvatar}>
                  {(member.name || member.email)?.slice(0, 2).toUpperCase()}
                </span>
              </div>
            ))}
            <FaPlus
              className={`${styles.addIcon} ${isEditing ? styles.editingAddIcon : ""
                }`}
              onClick={() => isEditing && setShowMember(true)}
            />
          </div>
          <div
            className={`${showMember ? styles.showMember : styles.hidden} ${styles.members_container
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

        <div className={styles.buttons}>
          <button
            className={`${styles.close} ${!isEditing ? styles.editClose : ""}`}
            type="button"
            onClick={() => modalRef.current.close()}
          >
            {t("Close")}
          </button>
          {isEditing && (

            <button
              className={styles.main_button}
              type="submit"
              disabled={isSubmitting}
            >
              {t("Save")}
              {isSubmitting && <span className={styles.loading}>...</span>}
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default TaskDetails;