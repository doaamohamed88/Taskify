import { configureStore } from "@reduxjs/toolkit";
import BoardSlice from './BoardSlice'
const store = configureStore({
    reducer: {
        board: BoardSlice
    }
})

export default store;