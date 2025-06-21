import { createSlice } from "@reduxjs/toolkit";

const selectedBoardSlice = createSlice({
    name: "selectedBoard",
    initialState: null,
    reducers: {
        setSelectedBoard: (state, action) => state = action.payload,
        updateSelectedBoard: (state, action) => state = { ...state, ...action.payload },
        updateTaskInBoard: (state, action) => {
            if (!state || !state.tasks) return state;

            const updatedTasks = state.tasks.map((task) =>
                task.id === action.payload.id ? action.payload : task
            );

            return { ...state, tasks: updatedTasks };
        },
    },
});

export const { setSelectedBoard, updateSelectedBoard, updateTaskInBoard } = selectedBoardSlice.actions;
export default selectedBoardSlice.reducer;