import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoardById } from "../services/boardService";
import { setSelectedBoard } from "../store/selectedBoard";
import { useParams } from "react-router";

export default function useSelectedBoard() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const selectedBoard = useSelector((state) => state.selectedBoard);

  useEffect(() => {
    if (!selectedBoard || selectedBoard.id !== id) {
      // Fetch the board data if not already available or mismatched
      const fetchBoardData = async () => {
        try {
          const boardData = await getBoardById(id);
          dispatch(setSelectedBoard(boardData));
        } catch (error) {
          console.error("Error fetching board data:", error);
        }
      };
      fetchBoardData();
    }
  }, [id, selectedBoard, dispatch]);

  return {
    selectedBoard,
    boardId: id || selectedBoard?.id || null,
  };
}
