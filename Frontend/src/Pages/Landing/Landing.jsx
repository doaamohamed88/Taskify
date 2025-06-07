import BoardCard from "../../Components/BoardCard/BoardCard";
import Modal from "../../Components/Modal/Modal";
import classes from "./Landing.module.css";
import { useRef, useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa6";
import { motion } from "framer-motion";
import { isNotEmpty } from '../../utils/validation';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import SelectStyle from '../../Components/UI/SelectStyle'
import { cardVariants, buttonVariants, textVariants, containerVariants } from "../../Components/UI/LandingAnimation";

export default function LandingPage() {
  const modalRef = useRef();
  const [boardTitle, setBoardTitle] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create axios instance with auth token
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }

  });
  console.log("API URL:", import.meta.env.VITE_APP_BASE_URL);
  const loadOptions = async (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
      return;
    }

    try {
      const response = await api.get(`users/?search=${inputValue}`);
      const members = response.data;
      console.log(members);
      const formatted = members.map(member => ({
        value: member.id,
        label: member.name,
      }));
      callback(formatted);
    } catch (error) {
      console.error("Error fetching members", error);
      callback([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    const selectedMemberIds = selectedOptions.map(opt => opt.value);
    const validationErrors = [];

    if (!isNotEmpty(boardTitle)) {
      validationErrors.push("Board title is required");
    }

    if (selectedMemberIds.length === 0) {
      validationErrors.push("At least one member is required");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await api.post('/boards', {
        title: boardTitle,
        members: selectedMemberIds  // Fixed variable name
      });

      console.log("Board created:", response.data);
      modalRef.current.close();
      setBoardTitle("");
      setSelectedOptions([]);

      // TODO: Refresh board list here

    } catch (error) {
      console.error("Error creating board", error);
      let errorMessage = "Failed to create board. Please try again.";

      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Session expired. Please login again.";
          // Optionally redirect to login:
          // navigate('/login');
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      }

      setErrors([errorMessage]);
    } finally {
      setIsSubmitting(false);
    }
  };

  function handleShowModal() {
    setErrors([]); // Reset errors when opening modal
    modalRef.current.open();
  }

  return (
    <motion.div
      className={classes.landing_page}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={classes.background_mesh}></div>
      <div className={classes.geometric_grid}></div>
      <div className={classes.landing_content}>
        <div className={classes.section}>
          <div>
            <motion.p
              className={classes.typingText}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <strong>
                Transform Chaos into Clarity - Organize Tasks,{" "}
              </strong>
              Boost Productivity, and Achieve More with{" "}
              <span className={classes.logo}>Taskify</span>
            </motion.p>
            <motion.button
              onClick={handleShowModal}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Create board
              <FaIcons.FaArrowRight className={classes.icon} />
            </motion.button>
            <Modal ref={modalRef}>
              <form onSubmit={handleSubmit} className={classes.form}>
                <p>Create Board</p>

                {/* Display errors */}
                {errors.length > 0 && (
                  <div className={classes.error}>
                    {errors.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}

                <div className={classes.input_container}>
                  <label htmlFor="title">Board Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter board title"
                    value={boardTitle}
                    onChange={(e) => setBoardTitle(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className={classes.input_container}>
                  <label htmlFor="members">Members</label>
                  <AsyncSelect
                    isMulti
                    cacheOptions
                    defaultOptions={false}
                    loadOptions={loadOptions}
                    onChange={setSelectedOptions}
                    value={selectedOptions}
                    placeholder="Search and select members..."
                    styles={SelectStyle}
                    isDisabled={isSubmitting}
                  />
                </div>

                <div className={classes.buttons}>
                  <button
                    type="button"
                    className={classes.close}
                    onClick={() => modalRef.current.close()}
                    disabled={isSubmitting}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className={classes.main_button}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create"}
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        </div>

        {/* Boards sections */}
        <div className={classes.section}>
          <div className={classes.cards_section}>
            <motion.p
              className={classes.boardName}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              Created
            </motion.p>
            <div>
              {[...Array(2)].map((_, i) => (
                <motion.div
                  className={classes.card}
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <BoardCard boardType="created" />
                </motion.div>
              ))}
            </div>
          </div>
          <div className={classes.cards_section}>
            <motion.p
              className={classes.boardName}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              Involved
            </motion.p>
            <div>
              {[...Array(2)].map((_, i) => (
                <motion.div
                  className={classes.card}
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <BoardCard boardType="involved" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}