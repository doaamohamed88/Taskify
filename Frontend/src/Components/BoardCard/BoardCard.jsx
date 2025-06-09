import styles from "./BoardCard.module.css";

function BoardCard({ board, boardType }) {
  return (
    <div className={`${styles.board_card} ${boardType === 'created' ? styles.created : styles.envolved}`}>
      <p>{board.title}</p>
      {/* <p>{dueDate}</p> */}
    </ div>
  )
}

export default BoardCard;
