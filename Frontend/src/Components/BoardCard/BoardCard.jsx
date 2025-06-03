import classes from "./BoardCard.module.css";

function BoardCard({ boardType, boardName, dueDate }) {
  return (
    <div className={`${classes.board_card} ${boardType === 'created' ? classes.created : classes.envolved}`}>
      <p>{boardName}</p>
      <p>{dueDate}</p>
    </ div>
  )
}

export default BoardCard;
