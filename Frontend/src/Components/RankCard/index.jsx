import React from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import styles from "./RankCard.module.css";

const RankCard = () => {
  const participants = [
    {
      rank: "2nd",
      name: "Participant 2",
      img: "/public/images/second.webp",
      heightClass: "second",
      bg: "/public/images/bg1.png",
    },
    {
      rank: "1st",
      name: "Participant 1",
      img: "/public/images/first.webp",
      heightClass: "first",
      bg: "/public/images/bg2.webp",
    },
    {
      rank: "3rd",
      name: "Participant 3",
      img: "/public/images/third.webp",
      heightClass: "third",
      bg: "/public/images/bg3.jpg",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" },
  };

  return (
    <motion.div
      className={styles.podium}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.container}>
        {participants.map((participant, index) => (
          <motion.div
            key={index}
            className={`${styles["podium-item"]} ${styles[participant.heightClass]}`}
            style={{
              backgroundImage: `url(${participant.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            variants={itemVariants}
            whileHover="hover"
          >
            <div className={styles.rank}>{participant.rank}</div>
            <img src={participant.img} alt={participant.name} className={styles.img} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RankCard;
