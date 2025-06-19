import { createSlice } from '@reduxjs/toolkit';
import { fetchBoardById, fetchUserBoards } from './BoardActions';

const boardSlice = createSlice({
    name: 'boards',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserBoards.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserBoards.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUserBoards.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchBoardById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBoardById.fulfilled, (state, action) => {
                state.loading = false;
                const updatedBoard = action.payload;
                const idx = state.data.findIndex(b => b.id === updatedBoard.id);
                if (idx !== -1) {
                    state.data[idx] = updatedBoard;
                } else {
                    state.data.push(updatedBoard);
                }
            })
            .addCase(fetchBoardById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default boardSlice.reducer;
