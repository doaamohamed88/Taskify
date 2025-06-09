import BoardCard from "../../Components/BoardCard/BoardCard";
import Modal from "../../Components/Modal/Modal";
import styles from "./Landing.module.css";
import * as FaIcons from "react-icons/fa6";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { useRef, useEffect } from "react";
import { cardVariants, buttonVariants, textVariants, containerVariants } from "../../Components/UI/LandingAnimation";
import CreateBoardForm from "../../Components/CreateBoardForm/CreateBoardForm";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBoards } from '../../store/board/BoardActions';
import { jwtDecode } from "jwt-decode";

export default function LandingPage() {
  const modalRef = useRef();
  const accessToken = localStorage.getItem("accessToken");
  const user = accessToken ? jwtDecode(accessToken) : null;
  const userId = user?.userId;
  const dispatch = useDispatch();
  const { data: boards, loading, error } = useSelector(state => state.boards);


  function handleShowModal() {
    modalRef.current.open();
  }

  const createdBoards = boards.filter(board => board.owner === userId).slice(0, 2);
  const involvedBoards = boards.filter(board =>
    Array.isArray(board.members) && board.members.includes(userId) && board.owner !== userId
  ).slice(0, 2);

  useEffect(() => {
    dispatch(fetchUserBoards());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <motion.div
      className={styles.landing_page}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.background_mesh}></div>
      <div className={styles.geometric_grid}></div>
      <div className={styles.landing_content}>
        <div className={styles.section}>
          <div>
            {/* <ul>
              {boards.map(board => (
                <li key={board.id}>{board.title}</li>
              ))}
            </ul> */}

            <motion.p
              className={styles.typingText}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <strong>
                Transform Chaos into Clarity - Organize Tasks,{" "}
              </strong>
              Boost Productivity, and Achieve More with{" "}
              <span className={styles.logo}>Taskify</span>
            </motion.p>
            <motion.button
              onClick={handleShowModal}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Create board
              <FaIcons.FaArrowRight className={styles.icon} />
            </motion.button>
            <Modal ref={modalRef}>
              <CreateBoardForm onClose={() => modalRef.current.close()} />
            </Modal>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.cards_section}>
            <motion.p
              className={styles.boardName}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              Created
            </motion.p>
            <div>
              {createdBoards.map(board => (
                <motion.div className={styles.card} key={board.id} variants={cardVariants} initial="hidden" animate="visible">
                  <BoardCard board={board} boardType="created" />
                </motion.div>
              ))}
            </div>
          </div>
          <div className={styles.cards_section}>
            <motion.p
              className={styles.boardName}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              Involved
            </motion.p>
            <div>
              {involvedBoards.map(board => (
                <motion.div className={styles.card} key={board.id} variants={cardVariants} initial="hidden" animate="visible">
                  <BoardCard board={board} boardType="involved" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}