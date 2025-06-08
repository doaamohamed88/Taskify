import { configureStore } from "@reduxjs/toolkit";
import BoardSlice from './board/BoardSlice'
import sidebarSlice from './sidebarSlice';
import userSlice from './userSlice';

const store = configureStore({
    reducer: {
        boards: BoardSlice,
        sidebarCollaps: sidebarSlice,
        user: userSlice
    }
})

export default store;