import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import threadsReducer from './slices/threadsSlice';
import detailThreadReducer from './slices/detailThreadSlice';
import leaderboardReducer from './slices/leaderboardSlice';
import filterReducer from './slices/filterSlice';
import usersReducer from './slices/usersSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadsReducer,
    detailThread: detailThreadReducer,
    leaderboard: leaderboardReducer,
    filter: filterReducer,
    users: usersReducer,
  },
});

export default store;
