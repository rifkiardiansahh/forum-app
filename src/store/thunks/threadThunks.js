import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllThreads,
  getThreadDetail,
  createThread,
  createComment,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
} from '../../api';

export const fetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async(_, { rejectWithValue }) => {
    try {
      const response = await getAllThreads();
      return response.data.data.threads;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch threads',
      );
    }
  },
);

export const fetchThreadDetail = createAsyncThunk(
  'detailThread/fetchThreadDetail',
  async(threadId, { rejectWithValue }) => {
    try {
      const response = await getThreadDetail(threadId);
      return response.data.data.detailThread;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch thread detail',
      );
    }
  },
);

export const createNewThread = createAsyncThunk(
  'threads/createNewThread',
  async({ title, body, category }, { rejectWithValue }) => {
    try {
      const response = await createThread(title, body, category);
      return response.data.data.thread;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create thread',
      );
    }
  },
);

export const createNewComment = createAsyncThunk(
  'detailThread/createNewComment',
  async({ threadId, content }, { rejectWithValue }) => {
    try {
      const response = await createComment(threadId, content);
      return response.data.data.comment;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create comment',
      );
    }
  },
);

// ============ VOTE THREAD ============
export const voteThread = createAsyncThunk(
  'threads/voteThread',
  async({ threadId, voteType }, { getState, rejectWithValue }) => {
    try {
      const userId = getState().auth.user?.id;
      let response;
      if (voteType === 1) {
        response = await upVoteThread(threadId);
      } else if (voteType === -1) {
        response = await downVoteThread(threadId);
      } else {
        response = await neutralVoteThread(threadId);
      }
      return { threadId, voteType, userId, data: response.data.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Vote failed');
    }
  },
);

export const voteComment = createAsyncThunk(
  'detailThread/voteComment',
  async({ threadId, commentId, voteType }, { getState, rejectWithValue }) => {
    try {
      const userId = getState().auth.user?.id;
      let response;
      if (voteType === 1) {
        response = await upVoteComment(threadId, commentId);
      } else if (voteType === -1) {
        response = await downVoteComment(threadId, commentId);
      } else {
        response = await neutralVoteComment(threadId, commentId);
      }
      return { commentId, voteType, userId, data: response.data.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Vote failed');
    }
  },
);
