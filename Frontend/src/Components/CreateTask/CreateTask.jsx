import styles from "./CreateTask.module.css";
import { useRef, useState } from "react";
import SelectStyle from "../UI/SelectStyle";
import AsyncSelect from "react-select/async";
import { createTask } from "../../services/boardService";
import { useDispatch } from "react-redux";
import { updateSelectedBoard } from "../../store/selectedBoard";
import useSelectedBoard from "../../hooks/useSelectedBoard";
import { useTranslation } from "react-i18next";

import { toast } from "react-toastify";

const INITIAL_FORM_DATA = {
  status: "To Do",
  difficulty: "Easy"
};

function CreateTask({ onClose, boardId }) {
  const membersRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const { selectedBoard } = useSelectedBoard();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const selected = membersRef.current.getValue() || [];
      formData.members = selected.map((opt) => ({
        id: opt.value,
        name: opt.label,
        email: opt.email,
      }));
      const response = await createTask(boardId, formData);
      console.log("Task created:", response);
      const updatedBoard = {
        ...selectedBoard,
        tasks: [...(selectedBoard.tasks || []), response],
      };
      dispatch(updateSelectedBoard(updatedBoard));
      setFormData(INITIAL_FORM_DATA);
      toast.success("Task created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      onClose();

    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const memberOptions = (selectedBoard?.members || []).map((m) => ({
    value: m.id,
    label: m.name || m.email,
    email: m.email,
  }));

  const loadBoardMembers = (inputValue, callback) => {
    const filtered = memberOptions.filter(opt =>
      opt.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filtered);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <p className={styles.title}>{t("Create Task")}</p>
      <div className={styles.container}>
        <div className={styles.input_container}>
          <label htmlFor="title">{t("Title")}</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="difficulty">{t("Difficulty")}</label>

          <select
            name="difficulty"
            id="difficulty"
            value={formData.difficulty || ""}
            onChange={handleChange}
            required
          >
            <option value="Easy">{t("Easy")}</option>
            <option value="Medium">{t("Medium")}</option>
            <option value="Hard">{t("Hard")}</option>
          </select>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.input_container}>
          <label htmlFor="description">{t("Description")}</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={formData.description || ""}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.input_container}>
          <label htmlFor="startDate">{t("Start Date")}</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={formData["startDate"] || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="dueDate">{t("Due Date")}</label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            value={formData["dueDate"] || ""}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.input_container}>
          <label htmlFor="members">{t("Members")}</label>
          <AsyncSelect
            isMulti
            cacheOptions
            defaultOptions={memberOptions}
            loadOptions={loadBoardMembers}
            ref={membersRef}
            placeholder={t("Search and select members...")}
            styles={SelectStyle}
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.close} type="button" onClick={onClose}>
          {t("Close")}
        </button>
        <button type="submit" className={styles.main_button}>

          {isSubmitting ? "Creating" : t("Create Task")}

        </button>
      </div>
    </form>
  );
}

export default CreateTask;
