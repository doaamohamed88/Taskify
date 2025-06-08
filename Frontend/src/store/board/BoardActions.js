import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

export const fetchUserBoards = createAsyncThunk(
    'boards/fetchUserBoards',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/boards');
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);