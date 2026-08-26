import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, logout } from '../../store/thunks/authThunks';
import * as api from '../../api';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../api');

describe('authThunks', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: null,
        token: null,
        loading: false,
        error: null,
        isAuthenticated: false,
      },
    });
    jest.clearAllMocks();
  });

  it('should dispatch pending and fulfilled on successful login', async() => {
    const mockToken = 'fake-jwt-token';
    api.loginUser.mockResolvedValue({
      data: { data: { token: mockToken } },
    });

    const expectedActions = [
      { type: 'auth/login/pending' },
      { type: 'auth/getProfile/pending' },
      {
        type: 'auth/getProfile/fulfilled',
        payload: { user: { id: '1', name: 'Test' } },
      },
      { type: 'auth/login/fulfilled', payload: { token: mockToken } },
    ];

    await store.dispatch(
      login({ email: 'test@test.com', password: 'password123' }),
    );

    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('should dispatch rejected on failed login', async() => {
    api.loginUser.mockRejectedValue({
      response: { data: { message: 'Invalid credentials' } },
    });

    await store.dispatch(login({ email: 'wrong@test.com', password: 'wrong' }));

    const actions = store.getActions();
    expect(actions[0].type).toBe('auth/login/pending');
    expect(actions[actions.length - 1].type).toBe('auth/login/rejected');
    expect(actions[actions.length - 1].payload).toBe('Invalid credentials');
  });

  it('should handle logout', async() => {
    const mockStoreWithAuth = mockStore({
      auth: { user: { id: '1' }, token: 'token', isAuthenticated: true },
    });

    await mockStoreWithAuth.dispatch(logout());

    const actions = mockStoreWithAuth.getActions();
    expect(actions[0].type).toBe('auth/logout/fulfilled');
    // localStorage.removeItem should have been called
    expect(localStorage.getItem('token')).toBeNull();
  });
});
