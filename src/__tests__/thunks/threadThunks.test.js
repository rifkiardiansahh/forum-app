import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchThreads, createNewThread } from '../../store/thunks/threadThunks';
import * as api from '../../api';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../api');

describe('threadThunks', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      threads: { threads: [], loading: false, error: null },
      auth: { user: { id: 'user-1' } },
    });
    jest.clearAllMocks();
  });

  it('should fetch threads successfully', async () => {
    const mockThreads = [
      { id: '1', title: 'Thread 1', body: 'Body 1', ownerId: 'user-1' },
      { id: '2', title: 'Thread 2', body: 'Body 2', ownerId: 'user-2' },
    ];
    api.getAllThreads.mockResolvedValue({
      data: { data: { threads: mockThreads } },
    });

    await store.dispatch(fetchThreads());

    const actions = store.getActions();
    expect(actions[0].type).toBe('threads/fetchThreads/pending');
    expect(actions[1].type).toBe('threads/fetchThreads/fulfilled');
    expect(actions[1].payload).toEqual(mockThreads);
  });

  it('should handle fetch threads error', async () => {
    api.getAllThreads.mockRejectedValue({
      response: { data: { message: 'Network error' } },
    });

    await store.dispatch(fetchThreads());

    const actions = store.getActions();
    expect(actions[0].type).toBe('threads/fetchThreads/pending');
    expect(actions[1].type).toBe('threads/fetchThreads/rejected');
    expect(actions[1].payload).toBe('Network error');
  });

  it('should create a new thread', async () => {
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

    await store.dispatch(createNewThread({ title: 'New Thread', body: 'Content', category: 'General' }));

    const actions = store.getActions();
    expect(actions[0].type).toBe('threads/createNewThread/pending');
    expect(actions[1].type).toBe('threads/createNewThread/fulfilled');
    expect(actions[1].payload).toEqual(newThread);
  });
});