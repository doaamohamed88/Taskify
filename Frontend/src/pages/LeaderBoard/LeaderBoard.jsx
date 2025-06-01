import React, { useState } from "react";
import styles from "./LeaderBoard.module.scss";
import TeamTable from "../../Components/TeamTable";
import RankCard from "../../Components/RankCard";

export default function LeaderBoard() {
  const [totalScore, setTotalScore] = useState(0);

  const calculateTotalScore = (score) => {
    setTotalScore(score);
  };
return (
    <div className={styles.leaderboardGrid}>
      {/* <div className={styles.sidebar}>
        <Sidebar />
      </div> */}

      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Leader Board</h1>
          <p>Check out the top teams and their scores!</p>
        </div>

        <div className={`${styles.tableContainer} ${styles.rankCardContainer}`}>
          <RankCard />
        </div>

        <div className={styles.tableContainer}>
          <div className={styles.tableHeaderInfo}>
            <h3 style={{ textAlign: "center" }}>team 1</h3>
            <span>Total score: {totalScore}</span>
          </div>

          <TeamTable calculateTotalScore={calculateTotalScore} />
        </div>
      </div>
    </div>
  );
}
