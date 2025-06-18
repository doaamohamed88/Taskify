import { createAsyncThunk } from '@reduxjs/toolkit';
// import { api } from '../../utils/api';
import { authFetch } from '../../helpers/authFetch';

export const fetchUserBoards = createAsyncThunk(
    'boards/fetchUserBoards',
    async (_, { rejectWithValue }) => {
        try {
            const response = await authFetch('/boards', {
                method: 'GET',
            });
            console.log(response);

            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);