import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./BoardCard.module.css";
import { setSelectedBoard } from "../../store/selectedBoard";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import CreateBoardForm from "../CreateBoardForm/CreateBoardForm";
import { updateBoard } from "../../services/boardService";
import { updateSelectedBoard } from "../../store/selectedBoard";
import { fetchUserBoards } from "../../store/board/BoardActions";
import { deleteBoard } from "../../services/boardService";

function BoardCard({ board, boardType }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function getRandomColor(index) {
    const colors = ["#FFC107", "#03A9F4", "#E91E63", "#4CAF50", "#9C27B0"];
    return colors[index % colors.length];
  }

  const handleNavigate = () => {
    dispatch(setSelectedBoard(board));
    navigate(`/${board.id}/leader-board`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent navigation
    setIsEditing(true);
    modalRef.current.open();
  };

  const handleEditClose = () => {
    setIsEditing(false);
    modalRef.current.close();
  };

  // Called after successful edit
  const handleBoardUpdate = async (updatedData) => {
    await updateBoard(board.id, updatedData);
    dispatch(updateSelectedBoard({ ...board, ...updatedData }));
    dispatch(fetchUserBoards()); // Refresh board list
    handleEditClose();
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteBoard(board.id);
      dispatch(fetchUserBoards());
      setShowDeleteModal(false);
    } catch {
      // Optionally show error message
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <div
      className={`${styles.board_card} ${boardType === "created" ? styles.created : styles.envolved}`}
      onClick={handleNavigate}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p className={styles.title}>{board.title}</p>
        {boardType === "created" && (
          <span style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              className={styles.editIcon}
              onClick={handleEditClick}
              title="Edit Board"
              style={{ cursor: "pointer", marginLeft: 8 }}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className={styles.deleteIcon}
              onClick={handleDeleteClick}
              title="Delete Board"
              style={{ cursor: "pointer" }}
            />
          </span>
        )}
      </div>
      <div className={styles.members}>
        {board.members?.length && board.members?.map((member, idx) => (
          <div
            key={idx}
            className={styles.member_circle}
            style={{ backgroundColor: getRandomColor(idx) }}
          >
            {member?.email?.charAt(0).toUpperCase()}
          </div>
        ))}
      </div>
      <Modal ref={modalRef}>
        <div onClick={e => e.stopPropagation()}>
          {isEditing && (
            <CreateBoardForm
              onClose={handleEditClose}
              initialData={board}
              isEdit
              onSubmit={handleBoardUpdate}
            />
          )}
        </div>
      </Modal>
      {showDeleteModal && (
        <Modal ref={{ current: { close: handleDeleteCancel } }}>
          <div onClick={e => e.stopPropagation()} style={{ padding: 30, color: "var(--white)" }}>
            <p>Are you sure you want to delete this board?</p>
            <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
              <button className={styles.close} onClick={handleDeleteCancel} disabled={isDeleting}>
                Cancel
              </button>
              <button className={styles.deleteIcon} onClick={handleDeleteConfirm} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default BoardCard;
