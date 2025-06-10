import styles from "./CreateTask.module.css";
import { loadUserOptions } from "../../utils/loadUserOptions";
import { useRef, useState } from "react";
import SelectStyle from "../UI/SelectStyle";
import AsyncSelect from "react-select/async";
import { createTask } from "../../services/boardService";
import { useDispatch } from "react-redux";
import { updateSelectedBoard } from "../../store/selectedBoard";
import useSelectedBoard from "../../hooks/useSelectedBoard";

function CreateTask({ onClose, boardId }) {
  const membersRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ status: "To Do" });
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { selectedBoard } = useSelectedBoard();
  const dispatch = useDispatch();
  console.log(formData);

  // Handler to update formData on focus
  const handleFocus = (field, ref) => {
    setFormData((prev) => ({
      ...prev,
      [field]: ref.current ? ref.current.value : "",
    }));
  };

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
      formData.members = selected.map((opt) => opt.value);
      const response = await createTask(boardId, formData);
      console.log("Task created:", response);
      const updatedBoard = {
        ...selectedBoard,
        tasks: [...(selectedBoard.tasks || []), response],
      };
      onClose();
      dispatch(updateSelectedBoard(updatedBoard));

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
          <input type="text" name="title" id="title" onChange={handleChange} />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="difficulty">Difficulty</label>
          <input
            type="text"
            name="difficulty"
            id="difficulty"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.conatiner}>
        <div className={styles.input_container}>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
          />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="status">Status</label>
          <select name="status" onChange={handleChange}>
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>
      </div>
      <div className={styles.conatiner}>
        <div className={styles.input_container}>
          <label htmlFor="due-date">Due Date</label>
          <input
            type="date"
            name="due-date"
            id="due-date"
            onChange={handleChange}
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
