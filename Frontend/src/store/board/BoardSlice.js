import { createSlice } from '@reduxjs/toolkit';
import { fetchUserBoards } from './BoardActions';

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
            });
    },
});

export default boardSlice.reducer;
