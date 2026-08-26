import axios from 'axios';

const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menambahkan token Authorization
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============ AUTH ============
export const registerUser = (name, email, password) =>
  api.post('/register', { name, email, password });

export const loginUser = (email, password) =>
  api.post('/login', { email, password });

export const getOwnProfile = () => api.get('/users/me');

// Users
export const getUsers = () => api.get('/users');

// ============ THREADS ============
export const getAllThreads = () => api.get('/threads');

export const getThreadDetail = (threadId) => api.get(`/threads/${threadId}`);

export const createThread = (title, body, category = 'General') =>
  api.post('/threads', { title, body, category });

// ============ COMMENTS ============
export const createComment = (threadId, content) =>
  api.post(`/threads/${threadId}/comments`, { content });

// ============ VOTES ============
// Thread
export const upVoteThread = (threadId) =>
  api.post(`/threads/${threadId}/up-vote`);

export const downVoteThread = (threadId) =>
  api.post(`/threads/${threadId}/down-vote`);

export const neutralVoteThread = (threadId) =>
  api.post(`/threads/${threadId}/neutral-vote`);

// Comment
export const upVoteComment = (threadId, commentId) =>
  api.post(`/threads/${threadId}/comments/${commentId}/up-vote`);

export const downVoteComment = (threadId, commentId) =>
  api.post(`/threads/${threadId}/comments/${commentId}/down-vote`);

export const neutralVoteComment = (threadId, commentId) =>
  api.post(`/threads/${threadId}/comments/${commentId}/neutral-vote`);

// ============ LEADERBOARD ============
export const getLeaderboards = () => api.get('/leaderboards');

export default api;
