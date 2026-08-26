import { createSlice } from '@reduxjs/toolkit';
import { fetchLeaderboards } from '../thunks/leaderboardThunks';

const initialState = {
  leaderboards: [],
  loading: false,
  error: null,
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboards.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderboards = action.payload;
      })
      .addCase(fetchLeaderboards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch leaderboards';
      });
  },
});

export default leaderboardSlice.reducer;
