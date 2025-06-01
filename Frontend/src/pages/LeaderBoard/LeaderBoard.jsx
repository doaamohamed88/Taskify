import React, { useState } from "react";
import styles from "./leaderboard.module.css";
import TeamTable from "../../Components/TeamTable";
import RankCard from "../../Components/RankCard";

export default function LeaderBoard() {
  const [totalScore, setTotalScore] = useState(0);

  const calculateTotalScore = (score) => {
    setTotalScore(score);
  };
  return (
    <div className={styles.leaderBoardContainer}>
      <div>
        <h1 style={{ marginBottom: 15 }}>Leader Board</h1>
        <p>Check out the top teams and their scores!</p>
      </div>

      <div className={styles.card}>
        <RankCard />
      </div>

      <div size="large">
        <div className={styles.tableHeaderInfo}>
          <h3 style={{ textAlign: "center" }}>team 1</h3>
          <span>Total score: {totalScore}</span>
        </div>

        <TeamTable calculateTotalScore={calculateTotalScore} />
      </div>
    </div>
  );
}
