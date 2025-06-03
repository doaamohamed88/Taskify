import React, { useState } from "react";
import styles from "./leaderboard.module.css";
import TeamTable from "../../Components/TeamTable";
import RankCard from "../../Components/RankCard";
import { useTranslation } from "react-i18next";

export default function LeaderBoard() {
    const { t } = useTranslation()
  
  const [totalScore, setTotalScore] = useState(0);

  const calculateTotalScore = (score) => {
    setTotalScore(score);
  };
  return (
    <div className={styles.leaderBoardContainer}>
      <div>
        <h1 style={{ marginBottom: 15 }}>
          {t('Leaderboard')}
        </h1>
        <p>{t('leader-board-description')}</p>
      </div>

      <div className={styles.card}>
        <RankCard />
      </div>

      <div size="large">
        <div className={styles.tableHeaderInfo}>
          <h3 style={{ textAlign: "center" }}> Team Name </h3>
          <span>{t('total-score')}: {totalScore}</span>
        </div>

        <TeamTable calculateTotalScore={calculateTotalScore} />
      </div>
    </div>
  );
}
