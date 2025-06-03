import { configureStore } from "@reduxjs/toolkit";
import BoardSlice from './BoardSlice'
import sidebarSlice from './sidebarSlice';
import userSlice from './userSlice';

const store = configureStore({
    reducer: {
        board: BoardSlice,
        sidebarCollaps: sidebarSlice,
        user: userSlice
    }
})

export default store;