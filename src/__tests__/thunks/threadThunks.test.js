import { configureStore } from '@reduxjs/toolkit';
import { fetchThreads, createNewThread } from '../../store/thunks/threadThunks';
import * as api from '../../api';
import threadsReducer from '../../store/slices/threadsSlice';
import authReducer from '../../store/slices/authSlice';

jest.mock('../../api');

describe('threadThunks', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        threads: threadsReducer,
        auth: authReducer,
      },
      preloadedState: {
        auth: { user: { id: 'user-1' } },
      },
    });
    jest.clearAllMocks();
  });

  it('should fetch threads successfully', async() => {
    const mockThreads = [
      { id: '1', title: 'Thread 1', body: 'Body 1', ownerId: 'user-1' },
      { id: '2', title: 'Thread 2', body: 'Body 2', ownerId: 'user-2' },
    ];
    api.getAllThreads.mockResolvedValue({
      data: { data: { threads: mockThreads } },
    });

    await store.dispatch(fetchThreads());

    const state = store.getState();
    expect(state.threads.loading).toBe(false);
    expect(state.threads.threads).toEqual(mockThreads);
    expect(state.threads.error).toBeNull();
  });

  it('should handle fetch threads error', async() => {
    api.getAllThreads.mockRejectedValue({
      response: { data: { message: 'Network error' } },
    });

    await store.dispatch(fetchThreads());

    const state = store.getState();
    expect(state.threads.loading).toBe(false);
    expect(state.threads.error).toBe('Network error');
    expect(state.threads.threads).toEqual([]);
  });

  it('should create a new thread', async() => {
    const newThread = {
      id: '3',
      title: 'New Thread',
      body: 'Content',
      category: 'General',
      ownerId: 'user-1',
    };
    api.createThread.mockResolvedValue({
      data: { data: { thread: newThread } },
    });

    await store.dispatch(
      createNewThread({
        title: 'New Thread',
        body: 'Content',
        category: 'General',
      }),
    );

    const state = store.getState();
    expect(state.threads.threads[0]).toEqual(newThread);
    expect(state.threads.loading).toBe(false);
  });
});
