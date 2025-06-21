import { useState } from "react";
import styles from "./leaderboard.module.css";
import TeamTable from "../../Components/TeamTable";
import RankCard from "../../Components/RankCard";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import useSelectedBoard from "../../hooks/useSelectedBoard";
import * as FaIcons from 'react-icons/fa6'
export default function LeaderBoard() {
  const { t } = useTranslation();

  const { selectedBoard } = useSelectedBoard();

  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {

    if (selectedBoard) {
      const total = selectedBoard?.members?.reduce(
        (acc, member) => acc + (member.score || 0)
      );
      console.log(total)
      setTotalScore(total);
    }
  }, [selectedBoard, setTotalScore]);

  return (
    <div className={styles.leaderBoardContainer}>
      <div className={styles.boardHeaderCard}>
        <div className={styles.boardMeta}>
          <span className={styles.boardLabel}>{t("Active Board")}</span>
          <FaIcons.FaClipboardList className={styles.boardIcon} />
        </div>
        <h1 className={styles.boardName}>{selectedBoard?.title && ` ${selectedBoard.title}`}</h1>
        <div className={styles.boardStats}>
          <span>
            {selectedBoard?.tasks && selectedBoard.tasks.length}{" "}
            {selectedBoard?.tasks && selectedBoard.tasks.length === 1 ? t("Task") : t("Tasks")}
          </span>
          <span>•</span>
          <span>
            {selectedBoard?.members && selectedBoard.members.length}{" "}
            {selectedBoard?.members && selectedBoard.members.length === 1 ? t("Member") : t("Members")}
          </span>
        </div>
      </div>
      <div>
        <p>{t("leader-board-description")}</p>
      </div>

      <div className={styles.card}>
        <RankCard />
      </div>

      <div size="large">
        <div className={styles.tableHeaderInfo}>
          <span>
            {t("total-score")}{`  `}: {totalScore}
          </span>
        </div>

        <TeamTable boardMembers={selectedBoard?.members || []} />
      </div>
    </div>
  );
}
