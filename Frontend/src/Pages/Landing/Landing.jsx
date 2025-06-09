import BoardCard from "../../Components/BoardCard/BoardCard";
import Modal from "../../Components/Modal/Modal";
import classes from "./Landing.module.css";
import * as FaIcons from "react-icons/fa6";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { useRef, useEffect } from "react";
import { cardVariants, buttonVariants, textVariants, containerVariants } from "../../Components/UI/LandingAnimation";
import CreateBoardForm from "../../Components/CreateBoardForm/CreateBoardForm";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBoards } from '../../store/board/BoardActions';
// import { useSelector } from 'react-redux';
export default function LandingPage() {
  const modalRef = useRef();
  function handleShowModal() {
    modalRef.current.open();
  }
  const dispatch = useDispatch();
  const { data: boards, loading, error } = useSelector(state => state.boards);

  useEffect(() => {
    dispatch(fetchUserBoards());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

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
            <ul>
              {boards.map(board => (
                <li key={board.id}>{board.title}</li>
              ))}
            </ul>

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
              <CreateBoardForm onClose={() => modalRef.current.close()} />
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