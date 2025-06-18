import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import styles from "./BoardCard.module.css";
import { setSelectedBoard } from "../../store/selectedBoard";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import CreateBoardForm from "../CreateBoardForm/CreateBoardForm";
import { updateBoard } from "../../services/boardService";
import { updateSelectedBoard } from "../../store/selectedBoard";
import { fetchUserBoards } from "../../store/board/BoardActions";
import { deleteBoard } from "../../services/boardService";
import { FaIcons } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
function BoardCard({ board, boardType }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalRef = useRef();
  const deleteModalRef = useRef()
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  function getRandomColor(index) {
    const colors = ["#FFC107", "#03A9F4", "#E91E63", "#4CAF50", "#9C27B0"];
    return colors[index % colors.length];
  }

  const handleNavigate = () => {
    dispatch(setSelectedBoard(board));
    navigate(`/${board.id}/tasks`);
  };

  function handleShowDeleteModal(e) {
    e.stopPropagation();
    deleteModalRef.current.open();
  }

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
    modalRef.current.open();
  };

  const handleEditClose = () => {
    setIsEditing(false);
    modalRef.current.close();
  };

  const handleBoardUpdate = async (updatedData) => {
    await updateBoard(board.id, updatedData);
    dispatch(updateSelectedBoard({ ...board, ...updatedData }));
    dispatch(fetchUserBoards());
    handleEditClose();
  };


  const handleDeleteConfirm = async (e) => {
    e.stopPropagation;
    setIsDeleting(true);
    try {
      await deleteBoard(board.id);
      dispatch(fetchUserBoards());
    } catch {
      deleteModalRef.current.close()
    } finally {
      setIsDeleting(false);
    }
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
              onClick={e => handleShowDeleteModal(e)}
              title="Delete Board"
              style={{ cursor: "pointer" }}
            />
            <Modal ref={deleteModalRef}>
              <div onClick={e => e.stopPropagation()} className={styles.deleteModal}>
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className={styles.icon} />
                <p>Are you sure?</p>
                <span>This action can't be undone, all data associated with this field will be lost</span>
                <div className={styles.buttons}>
                  <button type="button" className={styles.close} onClick={handleEditClose} >
                    {t("Close")}
                  </button>
                  <button type="submit" className={styles.main_button} onClick={(e) => handleDeleteConfirm(e)}>
                    {t("Delete")}
                  </button>
                </div>
              </div>
            </Modal>
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
    </div>
  );
}

export default BoardCard;
