import { createSlice } from "@reduxjs/toolkit";

const selectedBoardSlice = createSlice({
    name: "selectedBoard",
    initialState: null,
    reducers: {
        setSelectedBoard: (state, action) => state = action.payload
    },
});

export const { setSelectedBoard } = selectedBoardSlice.actions;
export default selectedBoardSlice.reducer;