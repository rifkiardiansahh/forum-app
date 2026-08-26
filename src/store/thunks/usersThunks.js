import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../api';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async(_, { rejectWithValue }) => {
    try {
      const response = await getUsers();
      return response.data.data.users;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch users',
      );
    }
  },
);
