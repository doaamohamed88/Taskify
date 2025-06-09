import { createSlice } from "@reduxjs/toolkit";

const selectedBoardSlice = createSlice({
    name: "selectedBoard",
    initialState: null,
    reducers: {
        setSelectedBoard: (state, action) => state = action.payload,
        updateSelectedBoard: (state, action) => state = { ...state, ...action.payload },
    },
});

export const { setSelectedBoard, updateSelectedBoard } = selectedBoardSlice.actions;
export default selectedBoardSlice.reducer;