import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser, getOwnProfile } from '../../api';

export const register = createAsyncThunk(
  'auth/register',
  async({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await registerUser(name, email, password);
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return rejectWithValue(message);
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async({ email, password }, { rejectWithValue, dispatch }) => {
    // async({ emails, passwords }, { rejectWithValue, dispatch }) => {
    try {
      const response = await loginUser(email, password);
      const { token } = response.data.data;
      localStorage.setItem('token', token);
      await dispatch(getProfile());
      return { token };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return rejectWithValue(message);
    }
  },
);

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async(_, { rejectWithValue }) => {
    try {
      const response = await getOwnProfile();
      return response.data.data;
    } catch (error) {
      localStorage.removeItem('token');
      const message = error.response?.data?.message || 'Authentication failed';
      return rejectWithValue(message);
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async() => {
  localStorage.removeItem('token');
  return {};
});
