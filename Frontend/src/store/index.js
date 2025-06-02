import { configureStore } from "@reduxjs/toolkit";
import BoardSlice from './BoardSlice'
import sidebarSlice from './sidebarSlice';
const store = configureStore({
    reducer: {
        board: BoardSlice,
        sidebarCollaps: sidebarSlice
    }
})

export default store;