import React from "react";
import styles from "./TeamTable.module.css";
import { useTranslation } from "react-i18next";

function createData(rank, name, score) {
  return { rank, name, score };
}

const rows = [
  createData(1, "Doaa", 100),
  createData(2, "Jamella", 70),
  createData(3, "Abdelrahman", 50),
  createData(4, "Kareem", 20),
];

export default function TeamTable({ calculateTotalScore }) {
  const { t } = useTranslation();
  const totalScore = rows.reduce((acc, row) => acc + row.score, 0);

  calculateTotalScore(totalScore);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableHeadCell}>{t('Rank')}</th>
            <th className={styles.tableHeadCell}>{t('Name')}</th>
            <th className={styles.tableHeadCell}>{t('Score')}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.rank} className={styles.tableBodyRow}>
              <td className={styles.tableBodyCell}>{row.rank}</td>
              <td className={styles.tableBodyCell}>
                <div className={styles.avatarWrapper}>
                  <div className={styles.avatar}>
                    {row.name.charAt(0).toUpperCase()}
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