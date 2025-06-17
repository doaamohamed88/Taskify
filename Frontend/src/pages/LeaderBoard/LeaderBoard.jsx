import React, { useState } from "react";
import styles from "./leaderboard.module.css";
import TeamTable from "../../Components/TeamTable";
import RankCard from "../../Components/RankCard";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import useSelectedBoard from "../../hooks/useSelectedBoard";

export default function LeaderBoard() {
  const { t } = useTranslation();

  const { selectedBoard } = useSelectedBoard();

  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {

    if (selectedBoard) {
      const total = selectedBoard?.members?.reduce(
        (acc, member) => acc + (member.score || 0),
        0
      );
      setTotalScore(total);
    }
  }, [selectedBoard, setTotalScore]);

  return (
    <div className={styles.leaderBoardContainer}>
      <div>
        <h1 style={{ marginBottom: 15 }}>{t("Leaderboard")}</h1>
        <h2 style={{ marginBottom: 10, color: 'var(--lilac-color)' }}>{selectedBoard?.title && `Board: ${selectedBoard.title}`}</h2>
        <p>{t("leader-board-description")}</p>
      </div>

      <div className={styles.card}>
        <RankCard />
      </div>

      <div size="large">
        <div className={styles.tableHeaderInfo}>
          <h3 style={{ textAlign: "center" }}>
            {selectedBoard?.title || "Team Name"}{" "}
          </h3>
          <span>
            {t("total-score")}: {totalScore}
          </span>
        </div>

        <TeamTable boardMembers={selectedBoard?.members || []} />
      </div>
    </div>
  );
}
