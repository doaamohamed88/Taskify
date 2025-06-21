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
  FaTimes
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

  const toggleEdit = () => {
    if (isEditing) {
      setDetail({ ...originalValues });
      setCardMembers([...originalValues.members]);
    }
    setIsEditing(!isEditing);
  };


  return (
    <Modal ref={modalRef}>
      <form className={`${styles.form} ${!isEditing ? styles.nonEdit : ''}`} onSubmit={handleUpdateTask}>
        <div className={styles.edit_toggle} onClick={toggleEdit}>
          {isEditing ? (
            <FaTimes className={`${styles.icon} ${styles.edit_icon}`} />
          ) : (
            <FaPen className={`${styles.icon} ${styles.edit_icon}`} />
          )}
        </div>

        <h2 className={styles.title}>{t("Task Details")}</h2>

        <div className={styles.detailsContainer}>
          {/* Title */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <FaTasks className={styles.sectionIcon} />
              <h3 className={styles.sectionTitle}>{t("Title")}</h3>
            </div>
            {isEditing ? (
              <input
                className={styles.input}
                value={detail.title}
                onChange={(e) => setDetail({ ...detail, title: e.target.value })}
              />
            ) : (
              <div className={styles.staticValue}>{detail.title}</div>
            )}
          </div>

          {/* Description */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <FaFlag className={styles.sectionIcon} />
              <h3 className={styles.sectionTitle}>{t("Description")}</h3>
            </div>
            {isEditing ? (
              <textarea
                className={`${styles.input} ${styles.textarea}`}
                value={detail.description}
                onChange={(e) => setDetail({ ...detail, description: e.target.value })}
                rows={4}
              />
            ) : (
              <div className={`${styles.staticValue} ${styles.descriptionText}`}>
                {detail.description || <span className={styles.placeholder}>No description</span>}
              </div>
            )}
          </div>

          <div className={styles.row}>
            {/* Difficulty */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaCheckCircle className={styles.sectionIcon} />
                <h3 className={styles.sectionTitle}>{t("difficulty")}</h3>
              </div>
              {isEditing ? (
                <select
                  className={styles.input}
                  value={detail.difficulty}
                  onChange={(e) => setDetail({ ...detail, difficulty: e.target.value })}
                >
                  <option value="Easy">{t("Easy")}</option>
                  <option value="Medium">{t("Medium")}</option>
                  <option value="Hard">{t("Hard")}</option>
                </select>
              ) : (
                <div className={`${styles.staticValue} ${styles[detail.difficulty?.toLowerCase()]}`}>
                  {detail.difficulty}
                </div>
              )}
            </div>

            {/* Due Date */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaCalendarAlt className={styles.sectionIcon} />
                <h3 className={styles.sectionTitle}>{t("Due Date")}</h3>
              </div>
              {isEditing ? (
                <input
                  type="date"
                  className={styles.input}
                  value={detail.dueDate}
                  onChange={(e) => setDetail({ ...detail, dueDate: e.target.value })}
                />
              ) : (
                <div className={styles.staticValue}>
                  {detail.dueDate || <span className={styles.placeholder}>No due date</span>}
                </div>
              )}
            </div>
          </div>

          {/* Members */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <FaUser className={styles.sectionIcon} />
              <h3 className={styles.sectionTitle}>{t("Members")}</h3>
            </div>
            <div className={styles.members_container}>
              {cardMembers.map((member) => (
                <div key={member._id} className={styles.member}>
                  <span className={styles.memberAvatar}>
                    {(member.name || member.email)?.slice(0, 2).toUpperCase()}
                  </span>
                  <span className={styles.memberName}>
                    {member.name || member.email.split('@')[0]}
                  </span>
                </div>
              ))}
              {isEditing && (
                <FaPlus
                  className={styles.addIcon}
                  onClick={() => setShowMember(true)}
                />
              )}
            </div>
            <div className={`${showMember ? styles.showMember : styles.hidden}`}>
              <Members
                boardMembers={boardMembers}
                initialCardMembers={task?.members || []}
                setCardMembers={setCardMembers}
                cardMembers={cardMembers}
                closeMember={() => setShowMember(false)}
              />
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <button
            className={`${styles.close} ${!isEditing ? styles.editClose : ''}`}
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