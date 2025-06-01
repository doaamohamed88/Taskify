import React, { useState } from "react";
import styles from "./leaderboard.module.css";
import TeamTable from "../../Components/TeamTable";
import RankCard from "../../Components/RankCard";
import Card from "../../components/Card/Card";

export default function LeaderBoard() {
  const [totalScore, setTotalScore] = useState(0);

  const calculateTotalScore = (score) => {
    setTotalScore(score);
  };
  return (
    <div className={styles.leaderBoardContainer}>
      <div>
        <h1>Leader Board</h1>
        <p>Check out the top teams and their scores!</p>
      </div>

      <Card size="large">
        <RankCard />
      </Card>

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
