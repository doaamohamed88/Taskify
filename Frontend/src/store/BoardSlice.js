import { createSlice } from "@reduxjs/toolkit";
const initialBoardState = [];
const BoardSlice = createSlice({
    name: "board",
    initialState: initialBoardState,
    reducers: {

    }
})

export const BoardActions = BoardSlice.actions;
export default BoardSlice.reducer;