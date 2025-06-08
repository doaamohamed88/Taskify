import { configureStore } from "@reduxjs/toolkit";
import BoardSlice from './board/BoardSlice'
import sidebarSlice from './sidebarSlice';
import userSlice from './userSlice';
import selectedBoard from './selectedBoard';

const store = configureStore({
    reducer: {
        boards: BoardSlice,
        sidebarCollaps: sidebarSlice,
        user: userSlice,
        selectedBoard: selectedBoard
    }
})

export default store;