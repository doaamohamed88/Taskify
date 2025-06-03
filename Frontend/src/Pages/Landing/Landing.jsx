import BoardCard from "../../Components/BoardCard/BoardCard"
import Modal from "../../Components/Modal/Modal"
import classes from "./Landing.module.css"
import { useEffect, useRef, useState } from "react"
import * as FaIcons from "react-icons/fa6"
import { motion } from "framer-motion" // eslint-disable-line no-unused-vars
import { useSelector } from "react-redux"

const SERVER_URL = import.meta.env.VITE_SERVER

export default function LandingPage() {
  const userBoards = useSelector((state) => state.user.boards)
  const userEmail = useSelector((state) => state.user.email)
  const [boards, setBoards] = useState([])

  useEffect(() => {
    userBoards.forEach((board) => {
      fetch(`${SERVER_URL}boards/${board.id}`, {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch boards")
          }
          return response.json()
        })
        .then((data) => {
          setBoards((prevBoards) => [...prevBoards, data])
        })
        .catch((error) => {
          console.error("Error fetching boards:", error)
        })
    })
  }, [])

  const modalRef = useRef()

  function handleShowModal() {
    modalRef.current.open()
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
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
              <strong>Transform Chaos into Clarity - Organize Tasks, </strong>
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
            <Modal ref={modalRef}></Modal>
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
              {boards.map((b, i) => 
                b.admin === userEmail && (
                  <motion.div
                    className={classes.card}
                    key={i}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <BoardCard boardType="created" boardName={b.name} dueDate={b.due} />
                  </motion.div>
                )
              )}
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
              {boards.map((b, i) => 
              b.admin !== userEmail && (
                <motion.div
                  className={classes.card}
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <BoardCard boardType="envolved" boardName={b.name} dueDate={b.due}/>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
