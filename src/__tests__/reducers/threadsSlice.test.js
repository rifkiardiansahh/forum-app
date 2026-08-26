import threadsReducer from '../../store/slices/threadsSlice';

describe('threadsSlice Reducer', () => {
  const initialState = {
    threads: [],
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(threadsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchThreads.pending', () => {
    const action = { type: 'threads/fetchThreads/pending' };
    const newState = threadsReducer(initialState, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('should handle fetchThreads.fulfilled', () => {
    const mockThreads = [
      { id: '1', title: 'Thread 1', body: 'Body 1', ownerId: 'user-1' },
      { id: '2', title: 'Thread 2', body: 'Body 2', ownerId: 'user-2' },
    ];
    const action = {
      type: 'threads/fetchThreads/fulfilled',
      payload: mockThreads,
    };
    const newState = threadsReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.threads).toEqual(mockThreads);
    expect(newState.error).toBeNull();
  });

  it('should handle fetchThreads.rejected', () => {
    const action = {
      type: 'threads/fetchThreads/rejected',
      payload: 'Network error',
    };
    const newState = threadsReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Network error');
    expect(newState.threads).toEqual([]);
  });

  it('should handle createNewThread.fulfilled', () => {
    const existingThreads = [
      { id: '1', title: 'Old Thread' },
    ];
    const newThread = { id: '2', title: 'New Thread' };
    const stateWithThreads = { ...initialState, threads: existingThreads };
    const action = {
      type: 'threads/createNewThread/fulfilled',
      payload: newThread,
    };
    const newState = threadsReducer(stateWithThreads, action);
    // Thread baru harus ditambahkan di awal (unshift)
    expect(newState.threads[0]).toEqual(newThread);
    expect(newState.threads[1]).toEqual(existingThreads[0]);
    expect(newState.threads.length).toBe(2);
  });

  it('should handle voteThread.fulfilled - upvote', () => {
    const userId = 'user-1';
    const threadId = 'thread-1';
    const existingThreads = [
      { id: threadId, title: 'Thread 1', upVotesBy: [], downVotesBy: [] },
    ];
    const stateWithThreads = { ...initialState, threads: existingThreads };
    const action = {
      type: 'threads/voteThread/fulfilled',
      payload: { threadId, voteType: 1, userId },
    };
    const newState = threadsReducer(stateWithThreads, action);
    const updatedThread = newState.threads.find(t => t.id === threadId);
    expect(updatedThread.upVotesBy).toContain(userId);
    expect(updatedThread.downVotesBy).not.toContain(userId);
  });

  it('should handle voteThread.fulfilled - downvote', () => {
    const userId = 'user-1';
    const threadId = 'thread-1';
    const existingThreads = [
      { id: threadId, title: 'Thread 1', upVotesBy: [], downVotesBy: [] },
    ];
    const stateWithThreads = { ...initialState, threads: existingThreads };
    const action = {
      type: 'threads/voteThread/fulfilled',
      payload: { threadId, voteType: -1, userId },
    };
    const newState = threadsReducer(stateWithThreads, action);
    const updatedThread = newState.threads.find(t => t.id === threadId);
    expect(updatedThread.downVotesBy).toContain(userId);
    expect(updatedThread.upVotesBy).not.toContain(userId);
  });

  it('should handle voteThread.fulfilled - neutral (remove vote)', () => {
    const userId = 'user-1';
    const threadId = 'thread-1';
    const existingThreads = [
      { id: threadId, title: 'Thread 1', upVotesBy: ['user-1'], downVotesBy: [] },
    ];
    const stateWithThreads = { ...initialState, threads: existingThreads };
    const action = {
      type: 'threads/voteThread/fulfilled',
      payload: { threadId, voteType: 0, userId },
    };
    const newState = threadsReducer(stateWithThreads, action);
    const updatedThread = newState.threads.find(t => t.id === threadId);
    expect(updatedThread.upVotesBy).not.toContain(userId);
    expect(updatedThread.downVotesBy).not.toContain(userId);
  });
});