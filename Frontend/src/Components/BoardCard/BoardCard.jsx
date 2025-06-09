import styles from "./BoardCard.module.css";

function BoardCard({ board, boardType }) {
  function getRandomColor(index) {
    const colors = ["#FFC107", "#03A9F4", "#E91E63", "#4CAF50", "#9C27B0"];
    return colors[index % colors.length];
  }
  console.log(board.members);

  return (
    <div className={`${styles.board_card} ${boardType === 'created' ? styles.created : styles.envolved}`}>
      <p className={styles.title}>{board.title}</p>
      <div className={styles.members}>
        {board.members?.map((member, index) => (
          <div
            key={index}
            className={styles.member_circle}
            style={{ backgroundColor: getRandomColor(index) }}
          >
            {member.charAt(0).toUpperCase()}
          </div>
        ))}
      </div>

    </ div>
  )
}

export default BoardCard;
