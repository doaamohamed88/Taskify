import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     id: null,
//     email: null,
//     password: null,
//     boards: [],
//     verified: false,
// };

const initialState = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : null;

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state = { ...state, ...action.payload };
            sessionStorage.setItem("user", JSON.stringify(state));
            return state;
        },
        setBoards: (state, action) => {
            state.boards = action.payload;
            return state;
        },
        addBoard: (state, action) => {
            state.boards.push(action.payload);
            return state;
        },
        removeBoard: (state, action) => {
            state.boards = state.boards.filter(board => board.id !== action.payload);
            return state;
        },
        clearUser: () => {
            return initialState;
        },
    }
});

export const { setUser, setBoards, addBoard, removeBoard, clearUser } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state) => state.user;