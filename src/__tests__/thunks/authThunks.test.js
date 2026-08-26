import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
import { login, logout } from '../../store/thunks/authThunks';
import * as api from '../../api';
import authReducer from '../../store/slices/authSlice';

// Mock API
jest.mock('../../api');

describe('authThunks', () => {
  let store;

  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'removeItem');
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          user: null,
          token: null,
          loading: false,
          error: null,
          isAuthenticated: false,
        },
      },
    });
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should dispatch pending and fulfilled on successful login', async() => {
    const mockToken = 'fake-jwt-token';
    api.loginUser.mockResolvedValue({
      data: { data: { token: mockToken } },
    });
    api.getOwnProfile.mockResolvedValue({
      data: { data: { user: { id: 'user-1', name: 'Test' } } },
    });

    await store.dispatch(
      login({ email: 'test@test.com', password: 'password123' }),
    );

    const state = store.getState();
    expect(state.auth.token).toBe(mockToken);
    expect(state.auth.isAuthenticated).toBe(true);
    expect(state.auth.loading).toBe(false);
  });

  it('should dispatch rejected on failed login', async() => {
    api.loginUser.mockRejectedValue({
      response: { data: { message: 'Invalid credentials' } },
    });

    await store.dispatch(login({ email: 'wrong@test.com', password: 'wrong' }));

    const state = store.getState();
    expect(state.auth.error).toBe('Invalid credentials');
    expect(state.auth.isAuthenticated).toBe(false);
    expect(state.auth.loading).toBe(false);
  });

  it('should handle logout', async() => {
    // Buat store dengan state sudah login
    const authStore = configureStore({
      reducer: { auth: authReducer },
      preloadedState: {
        auth: {
          user: { id: '1', name: 'User' },
          token: 'token',
          loading: false,
          error: null,
          isAuthenticated: true,
        },
      },
    });

    await authStore.dispatch(logout());

    // Verifikasi state berubah
    const state = authStore.getState();
    expect(state.auth.isAuthenticated).toBe(false);
    expect(state.auth.token).toBe(null);
    expect(state.auth.user).toBe(null);
    // Verifikasi localStorage.removeItem dipanggil
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });
});
