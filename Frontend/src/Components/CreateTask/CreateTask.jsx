import styles from "./CreateTask.module.css";
import { loadUserOptions } from "../../utils/loadUserOptions";
import { useRef, useState } from "react";
import SelectStyle from "../UI/SelectStyle";
import AsyncSelect from "react-select/async";
import { createTask } from "../../services/boardService";
import { useDispatch } from "react-redux";
import { updateSelectedBoard } from "../../store/selectedBoard";
import useSelectedBoard from "../../hooks/useSelectedBoard";

const INITIAL_FORM_DATA = {
  status: "To Do",
};

function CreateTask({ onClose, boardId }) {
  const membersRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const { selectedBoard } = useSelectedBoard();
  const dispatch = useDispatch();
  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log('formData', formData);
  console.log('members,,,,,', membersRef?.current?.getValue());
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
      onClose();
      dispatch(updateSelectedBoard(updatedBoard));
      setFormData(INITIAL_FORM_DATA);

      // Optionally reset form or show success message here
    } catch (error) {
      console.error("Error creating task:", error);
      // Optionally show error message here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <p className={styles.title}>Create Task</p>
      <div className={styles.container}>
        <div className={styles.input_container}>
          <label htmlFor="title">Title</label>
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
          <label htmlFor="difficulty">Difficulty</label>

          <select
            name="difficulty"
            id="difficulty"
            value={formData.difficulty || ""}
            onChange={handleChange}
            required
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>
      <div className={styles.conatiner}>
        <div className={styles.input_container}>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={formData.description || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="status">Status</label>
           <input type="text" name="status" id="status" value={'To Do'} disabled />
        </div>
      </div>
      <div className={styles.conatiner}>
        <div className={styles.input_container}>
          <label htmlFor="due-date">Due Date</label>
          <input
            type="date"
            name="due-date"
            id="due-date"
            value={formData["due-date"] || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="members">Members</label>
          <AsyncSelect
            isMulti
            cacheOptions
            defaultOptions={false}
            loadOptions={loadUserOptions}
            ref={membersRef}
            placeholder="Search and select members..."
            styles={SelectStyle}
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.close} type="button" onClick={onClose}>
          Close
        </button>
        <button type="submit" className={styles.main_button}>
          Create Task
        </button>
      </div>
    </form>
  );
}

export default CreateTask;
