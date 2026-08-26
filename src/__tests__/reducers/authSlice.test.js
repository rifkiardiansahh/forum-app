import authReducer, { clearError } from '../../store/slices/authSlice';

describe('authSlice Reducer', () => {
  const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle clearError', () => {
    const stateWithError = {
      ...initialState,
      error: 'Login failed',
    };
    const newState = authReducer(stateWithError, clearError());
    expect(newState.error).toBeNull();
  });

  it('should handle login.pending', () => {
    const action = { type: 'auth/login/pending' };
    const newState = authReducer(initialState, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('should handle login.fulfilled', () => {
    const action = {
      type: 'auth/login/fulfilled',
      payload: { token: 'fake-token' },
    };
    const newState = authReducer(initialState, action);
    expect(newState.token).toBe('fake-token');
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.loading).toBe(false);
  });

  it('should handle login.rejected', () => {
    const action = {
      type: 'auth/login/rejected',
      payload: 'Invalid credentials',
    };
    const newState = authReducer(initialState, action);
    expect(newState.error).toBe('Invalid credentials');
    expect(newState.loading).toBe(false);
    expect(newState.isAuthenticated).toBe(false);
  });
});
