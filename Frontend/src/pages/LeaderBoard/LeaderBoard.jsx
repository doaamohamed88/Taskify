import React, { useState } from "react";
import styles from "./leaderboard.module.css";
import TeamTable from "../../Components/TeamTable";
import RankCard from "../../Components/RankCard";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoardById } from "../../services/boardService";
import { setSelectedBoard } from "../../store/selectedBoard";

export default function LeaderBoard() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const userBoardId = useSelector((state) => state.user.boards[0].id);
  const selectedBoard = useSelector((state) => state.selectedBoard);

  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const fetchBoard = async () => {
      let board = null;
      if (userBoardId) {
        try {
          board = await getBoardById(userBoardId);

          const total = board?.members?.reduce(
            (acc, member) => acc + member.score,
            0
          );
          setTotalScore(total);

          dispatch(setSelectedBoard(board));
        } catch (error) {
          console.error("Error fetching board:", error);
        }
      }
    };

    setTotalScore(0);
    fetchBoard();
  }, [userBoardId]);

  return (
    <div className={styles.leaderBoardContainer}>
      <div>
        <h1 style={{ marginBottom: 15 }}>{t("Leaderboard")}</h1>
        <p>{t("leader-board-description")}</p>
      </div>

      <div className={styles.card}>
        <RankCard />
      </div>

      <div size="large">
        <div className={styles.tableHeaderInfo}>
          <h3 style={{ textAlign: "center" }}>
            {selectedBoard?.name || "Team Name"}{" "}
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
