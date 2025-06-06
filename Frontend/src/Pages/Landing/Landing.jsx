
import BoardCard from "../../Components/BoardCard/BoardCard";
import Modal from "../../Components/Modal/Modal";
import classes from "./Landing.module.css";
import { useRef } from "react";
import * as FaIcons from "react-icons/fa6";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { useActionState } from "react";
import { isNotEmpty } from '../../utils/validation';
import { useState } from "react";
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import SelectStyle from '../../Components/UI/SelectStyle'
import { cardVariants, buttonVariants, textVariants, containerVariants } from "../../Components/UI/LandingAnimation";
function boardDataAction(prevstate, formData) {
  const boardTitle = formData.get('title');
  const members = formData.get('members');

  let errors = [];

  if (!isNotEmpty(boardTitle)) {
    errors.push('First name is required');
  }

  if (errors.length > 0) {
    return {
      errors, enteredValues: {
        boardTitle,
        members
      }
    };
  }

  return {
    errors: null,
    enteredValues: {
      boardTitle,
      members
    }
  };
}

export default function LandingPage() {
  const modalRef = useRef();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const loadOptions = async (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/users?search=${inputValue}`);
      const members = response.data;

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
  const [formState, formAction] = useActionState(boardDataAction, { errors: null });
  function handleShowModal() {
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
              <form action={formAction} className={classes.form}>
                <p>Create Board</p>
                <div className={classes.input_container}>
                  <label htmlFor="title">Board Title</label>
                  <input type="text" name="title" id="title" placeholder="Enter board title" defaultValue={formState.enteredValues?.boardTitle} />
                </div>
                <div className={classes.input_container}>
                  <label htmlFor="members">Members</label>
                  {/* <input type="search" name="members" id="members " placeholder="Add Members" defaultValue={formState.enteredValues?.members} /> */}
                  <AsyncSelect
                    isMulti
                    cacheOptions
                    defaultOptions={false}
                    loadOptions={loadOptions}
                    onChange={setSelectedOptions}
                    value={selectedOptions}
                    placeholder="Search and select members..."
                    styles={SelectStyle}
                  />
                </div>
                <div className={classes.buttons}>
                  <button className={classes.close}>Close</button>
                  <button className={classes.main_button}>Create</button>
                </div>
              </form>
            </Modal>
          </div>
        </div>
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
              Envolved
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
                  <BoardCard boardType="envolved" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}