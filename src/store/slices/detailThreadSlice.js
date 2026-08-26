import { createSlice } from '@reduxjs/toolkit';
import {
  fetchThreadDetail,
  createNewComment,
  voteThread as voteThreadDetail,
  voteComment as voteCommentDetail,
} from '../thunks/threadThunks';

const initialState = {
  thread: null,
  loading: false,
  error: null,
};

const detailThreadSlice = createSlice({
  name: 'detailThread',
  initialState,
  reducers: {
    clearDetail: (state) => {
      state.thread = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Detail
      .addCase(fetchThreadDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.thread = action.payload;
      })
      .addCase(fetchThreadDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch thread detail';
      })
      // Create Comment
      .addCase(createNewComment.fulfilled, (state, action) => {
        if (state.thread) {
          state.thread.comments.push(action.payload);
          state.thread.totalComments = (state.thread.totalComments || 0) + 1;
        }
      })
      // Vote Thread Detail
      .addCase(voteThreadDetail.fulfilled, (state, action) => {
        if (state.thread && state.thread.id === action.payload.threadId) {
          const { voteType, userId } = action.payload;
          state.thread.upVotesBy = state.thread.upVotesBy.filter(
            (id) => id !== userId,
          );
          state.thread.downVotesBy = state.thread.downVotesBy.filter(
            (id) => id !== userId,
          );
          if (voteType === 1) {
            state.thread.upVotesBy.push(userId);
          } else if (voteType === -1) {
            state.thread.downVotesBy.push(userId);
          }
        }
      })
      // Vote Comment Detail
      .addCase(voteCommentDetail.fulfilled, (state, action) => {
        if (state.thread) {
          const { commentId, voteType, userId } = action.payload;
          const comment = state.thread.comments.find((c) => c.id === commentId);
          if (comment) {
            comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
            comment.downVotesBy = comment.downVotesBy.filter(
              (id) => id !== userId,
            );
            if (voteType === 1) {
              comment.upVotesBy.push(userId);
            } else if (voteType === -1) {
              comment.downVotesBy.push(userId);
            }
          }
        }
      });
  },
});

export const { clearDetail } = detailThreadSlice.actions;
export default detailThreadSlice.reducer;
