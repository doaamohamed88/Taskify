import React, { useState } from "react";
import styles from "./leaderboard.module.css";
import TeamTable from "../../Components/TeamTable";
import RankCard from "../../Components/RankCard";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function LeaderBoard() {
  const { t } = useTranslation();

  const [members, setMembers] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    // fetch the mebers of the team and calculate the total score
    const fetchTeamMembers = async () => {
      try {
        // const response = await fetch('/members');
        // const data = await response.json();

        const data = [
          {
            email: "user@user.com",
            score: 35,
          },
          {
            email: "abdelrahmanali58@gmail.com",
            score: 39,
          },
          {
            email: "kareem.mohamed.ayman@gmail.com",
            score: 13,
          },
        ];

        const sortedData = data.sort((a, b) => b.score - a.score);
        setMembers(sortedData);
        
        const score = data?.length
          ? data.reduce((acc, member) => acc + member.score, 0)
          : 0;
        setTotalScore(score);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

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
          <h3 style={{ textAlign: "center" }}> Team Name </h3>
          <span>
            {t("total-score")}: {totalScore}
          </span>
        </div>

        <TeamTable members={members} />
      </div>
    </div>
  );
}
