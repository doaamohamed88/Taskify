import BoardCard from "../../Components/BoardCard/BoardCard";
import Modal from "../../Components/Modal/Modal";
import styles from "./Landing.module.css";
import * as FaIcons from "react-icons/fa6";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { useRef, useEffect, useState } from "react";
import {
  cardVariants,
  buttonVariants,
  textVariants,
  containerVariants,
} from "../../Components/UI/LandingAnimation";
import CreateBoardForm from "../../Components/CreateBoardForm/CreateBoardForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBoards } from "../../store/board/BoardActions";
import { jwtDecode } from "jwt-decode";
import noboard from '../../assets/noboards.png'
import { useTranslation } from "react-i18next";
export default function LandingPage() {
  const modalRef = useRef();
  const accessToken = localStorage.getItem("accessToken");
  const user = accessToken ? jwtDecode(accessToken) : null;
  const userId = user?.id;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: boards, loading, error } = useSelector((state) => state.boards);

  const [dir, setDir] = useState("ltr");

  useEffect(() => {
    const direction = document.documentElement.getAttribute("dir") || "ltr";
    setDir(direction);
  }, []);
  function handleShowModal() {
    modalRef.current.open();
  }

  const createdBoards = boards
    .filter((board) => board.owner === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 2);
  const involvedBoards = boards
    .filter(
      (board) =>
        Array.isArray(board.members) &&
        board.members.includes(userId) &&
        board.owner !== userId
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // most recent first
    .slice(0, 2);
  useEffect(() => {
    dispatch(fetchUserBoards());
  }, [dispatch]);

  if (loading) return <p>{t("Loading...")}</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

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
            <motion.p
              className={styles.typingText}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <strong>{t("Transform Chaos into Clarity - Organize Tasks, ")}</strong>
              <br />
              {t("Boost Productivity, and Achieve More with")}{" "}
              <span className={styles.logo}>Taskify</span>
            </motion.p>
            <motion.button
              onClick={handleShowModal}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {t("Create Board")}
              {dir === "ltr" &&
                <FaIcons.FaArrowRight className={styles.icon} />
              }
              {dir === "rtl" &&
                <FaIcons.FaArrowLeft className={styles.icon} />
              }
            </motion.button>
            <Modal ref={modalRef}>
              <CreateBoardForm onClose={() => modalRef.current.close()} />
            </Modal>
          </div>
        </div>

        <div className={styles.section}>
          {(createdBoards.length === 0 && involvedBoards.length === 0) &&
            <img src={noboard} className={styles.img}></img>
          }
          {createdBoards.length > 0 && (
            <div className={styles.cards_section}>
              <motion.p
                className={styles.boardName}
                variants={textVariants}
                initial="hidden"
                animate="visible"
              >
                {t("Created")}
              </motion.p>
              <div>

                {createdBoards.map((board) => (
                  <motion.div
                    className={styles.card}
                    key={board.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <BoardCard board={board} boardType="created" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          {involvedBoards.length > 0 && (
            <div className={styles.cards_section}>
              <motion.p
                className={styles.boardName}
                variants={textVariants}
                initial="hidden"
                animate="visible"
              >
                {t("Involved")}
              </motion.p>
              <div>
                {involvedBoards.map((board) => (
                  <motion.div
                    className={styles.card}
                    key={board.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <BoardCard board={board} boardType="involved" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
