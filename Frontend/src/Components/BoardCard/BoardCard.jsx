import { useDispatch } from "react-redux";
import styles from "./BoardCard.module.css";
import { setSelectedBoard } from "../../store/selectedBoard";
import { useNavigate } from "react-router-dom";

function BoardCard({ board, boardType }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function getRandomColor(index) {
    const colors = ["#FFC107", "#03A9F4", "#E91E63", "#4CAF50", "#9C27B0"];
    return colors[index % colors.length];
  }
  console.log(board.members);

  const handleNavigate = () => {
    dispatch(setSelectedBoard(board));
    navigate(`/leader-board`);
  };

  return (
    <div
      className={`${styles.board_card} ${
        boardType === "created" ? styles.created : styles.envolved
      }`}
      onClick={handleNavigate}
    >
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
    </div>
  );
}

export default BoardCard;
