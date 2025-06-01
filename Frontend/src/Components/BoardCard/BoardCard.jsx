import classes from "./BoardCard.module.css";

function BoardCard({ boardType }) {
  return (
    <div className={`${classes.board_card} ${boardType === 'created' ? classes.created : classes.envolved}`}>
      <p>Board title</p>
      <p>Due Date</p>
    </ div>
  )
}

export default BoardCard;
