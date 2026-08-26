import { createAsyncThunk } from '@reduxjs/toolkit';
import { getLeaderboards } from '../../api';

export const fetchLeaderboards = createAsyncThunk(
  'leaderboard/fetchLeaderboards',
  async(_, { rejectWithValue }) => {
    try {
      const response = await getLeaderboards();
      return response.data.data.leaderboards;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch leaderboards',
      );
    }
  },
);
