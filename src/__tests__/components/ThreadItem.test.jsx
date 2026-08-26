import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ThreadItem from '../../components/threads/ThreadItem';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../store/thunks/threadThunks', () => ({
  voteThread: jest.fn(() => ({ type: 'threads/voteThread' })),
}));

describe('ThreadItem Component', () => {
  const mockThread = {
    id: 'thread-1',
    title: 'Test Thread',
    body: 'This is a test thread body',
    category: 'redux',
    createdAt: '2026-08-26T10:00:00.000Z',
    ownerId: 'user-1',
    totalComments: 5,
    upVotesBy: ['user-1', 'user-2'],
    downVotesBy: [],
  };

  const mockUsers = [
    { id: 'user-1', name: 'John Doe', avatar: 'https://example.com/avatar.jpg' },
  ];

  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { user: { id: 'user-1' } },
      users: { users: mockUsers },
    });
  });

  it('should render thread title correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadItem thread={mockThread} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Test Thread')).toBeInTheDocument();
  });

  it('should render owner name correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadItem thread={mockThread} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('oleh John Doe')).toBeInTheDocument();
  });

  it('should display vote counts correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadItem thread={mockThread} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('👍 2')).toBeInTheDocument();
    expect(screen.getByText('👎 0')).toBeInTheDocument();
  });

  it('should show upvoted state when user has upvoted', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadItem thread={mockThread} />
        </BrowserRouter>
      </Provider>
    );

    const upButton = screen.getByText('👍 2');
    expect(upButton.closest('button')).toHaveClass('bg-green-100');
  });

  it('should show category badge when category exists', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadItem thread={mockThread} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('redux')).toBeInTheDocument();
  });
});