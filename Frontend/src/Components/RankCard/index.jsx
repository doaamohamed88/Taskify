import React from "react";
import styles from "./RankCard.module.scss";

const RankCard = () => {
  const participants = [
    {
      rank: "2nd",
      name: "Participant 2",
      img: "./images/second.webp",
      heightClass: "second",
      bg: "./images/bg1.png",
    },
    {
      rank: "1st",
      name: "Participant 1",
      img: "./images/first.webp",
      heightClass: "first",
      bg: "./images/bg2.webp",
    },
    {
      rank: "3rd",
      name: "Participant 3",
      img: "./images/third.webp",
      heightClass: "third",
      bg: "./images/bg3.jpg",
    },
  ];

  return (
    <div className={styles.podium}>
      {participants.map((participant, index) => (
        <div
          key={index}
          className={`${styles["podium-item"]} ${
            styles[participant.heightClass]
          }`}
          style={{
            backgroundImage: `url(${participant.bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className={styles.rank}>{participant.rank}</div>
          <img src={participant.img} alt={participant.name} />
        </div>
      ))}
    </div>
  );
};

export default RankCard;
