import { createSlice } from '@reduxjs/toolkit';
import {
  fetchThreads,
  createNewThread,
  voteThread,
  // voteComment,
} from '../thunks/threadThunks';

const initialState = {
  threads: [],
  loading: false,
  error: null,
};

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Threads
      .addCase(fetchThreads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.loading = false;
        state.threads = action.payload;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch threads';
      })
      // Create Thread
      .addCase(createNewThread.fulfilled, (state, action) => {
        state.threads.unshift(action.payload);
      })
      // Vote Thread (optimistic update handled in thunk)
      .addCase(voteThread.fulfilled, (state, action) => {
        const { threadId, voteType, userId } = action.payload;
        const thread = state.threads.find((t) => t.id === threadId);
        if (thread) {
          // Update upVotesBy / downVotesBy
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
          if (voteType === 1) {
            thread.upVotesBy.push(userId);
          } else if (voteType === -1) {
            thread.downVotesBy.push(userId);
          }
        }
      });
  },
});

export default threadsSlice.reducer;
