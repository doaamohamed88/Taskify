import styles from "./CreateTask.module.css";
import { loadUserOptions } from "../../utils/loadUserOptions";
import { useRef, useState } from "react";
import SelectStyle from "../UI/SelectStyle";
import AsyncSelect from "react-select/async";
import { authFetch } from "../../helpers/authFetch";
import { createTask } from "../../services/boardService";
function CreateTask({ onClose, boardId }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const priorityRef = useRef();
  const statusRef = useRef();
  const dueDateRef = useRef();
  const membersRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedMembers, setSelectedMembers] = useState([]);
  console.log(formData);
  // Handler to update formData on focus
  const handleFocus = (field, ref) => {
    setFormData((prev) => ({
      ...prev,
      [field]: ref.current ? ref.current.value : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      priority: priorityRef.current.value,
      status: statusRef.current.value,
      dueDate: dueDateRef.current.value,
      members: selectedMembers,
    };

    try {
      setIsSubmitting(true);
      const response = await createTask(boardId, data);
      console.log("Task created:", response);
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
            ref={titleRef}
            onFocus={() => handleFocus("title", titleRef)}
            onChange={(e) => (titleRef.current.value = e.target.value)}
          />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="priority">Priority</label>
          <input
            type="text"
            name="priority"
            id="priority"
            ref={priorityRef}
            onFocus={() => handleFocus("priority", priorityRef)}
            onChange={(e) => (priorityRef.current.value = e.target.value)}
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
            ref={descriptionRef}
            onFocus={() => handleFocus("description", descriptionRef)}
            onChange={(e) => (descriptionRef.current.value = e.target.value)}
          />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="status">Status</label>
          <select
            ref={statusRef}
            onFocus={() => handleFocus("status", statusRef)}
            onChange={(e) => (statusRef.current.value = e.target.value)}
          >
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
            ref={dueDateRef}
            onFocus={() => handleFocus("dueDate", dueDateRef)}
            onChange={(e) => (dueDateRef.current.value = e.target.value)}
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
            onChange={setSelectedMembers}
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
