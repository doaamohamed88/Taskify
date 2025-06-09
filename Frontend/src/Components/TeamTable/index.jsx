import React, { useEffect, useState } from "react";
import styles from "./TeamTable.module.css";
import { useTranslation } from "react-i18next";

function createTableData(members) {
  return members.map((member, index) => {
    return {
      rank: index + 1,
      name: member.email,
      score: member.score,
    };
  });
}

export default function TeamTable({ boardMembers }) {
  const { t } = useTranslation();

    const [members, setMembers] = useState([]);
  
    const fetchTeamMembers = async () => {
      const membersData = boardMembers?.length
        ? [...boardMembers]?.sort((a, b) => b.score - a.score)
        : [];
  
        const rows = createTableData(membersData);
      setMembers([...rows]);
    };
  
    useEffect(() => {
      fetchTeamMembers();
    }, [boardMembers, boardMembers]);
  
  
  if (!members || members.length === 0) {
    return <p>{t("No members found")}</p>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableHeadCell}>{t("Rank")}</th>
            <th className={styles.tableHeadCell}>{t("Name")}</th>
            <th className={styles.tableHeadCell}>{t("Score")}</th>
          </tr>
        </thead>
        <tbody>
          {members.map((row) => (
            <tr key={row.rank} className={styles.tableBodyRow}>
              <td className={styles.tableBodyCell}>{row.rank}</td>
              <td className={styles.tableBodyCell}>
                <div className={styles.avatarWrapper}>
                  <div className={styles.avatar}>
                    {row?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  {row.name}
                </div>
              </td>
              <td className={styles.tableBodyCell} align="center">
                {row.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
