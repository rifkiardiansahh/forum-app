import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ThreadItem from '../../components/threads/ThreadItem';
import authReducer from '../../store/slices/authSlice';
import usersReducer from '../../store/slices/usersSlice';

// Mock react-router-dom sepenuhnya untuk menghindari error resolusi
jest.mock('react-router-dom', () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  BrowserRouter: ({ children }) => <div>{children}</div>,
  MemoryRouter: ({ children }) => <div>{children}</div>,
  useNavigate: () => jest.fn(),
  useParams: () => ({}),
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
    {
      id: 'user-1',
      name: 'John Doe',
      avatar: 'https://example.com/avatar.jpg',
    },
  ];

  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        users: usersReducer,
      },
      preloadedState: {
        auth: { user: { id: 'user-1' }, isAuthenticated: true },
        users: { users: mockUsers },
      },
    });
  });

  it('should render thread title correctly', () => {
    render(
      <Provider store={store}>
        <ThreadItem thread={mockThread} />
      </Provider>,
    );

    expect(screen.getByText('Test Thread')).toBeInTheDocument();
  });

  it('should render owner name correctly', () => {
    render(
      <Provider store={store}>
        <ThreadItem thread={mockThread} />
      </Provider>,
    );

    expect(screen.getByText('oleh John Doe')).toBeInTheDocument();
  });

  it('should display vote counts correctly', () => {
    render(
      <Provider store={store}>
        <ThreadItem thread={mockThread} />
      </Provider>,
    );

    expect(screen.getByText('👍 2')).toBeInTheDocument();
    expect(screen.getByText('👎 0')).toBeInTheDocument();
  });

  it('should show upvoted state when user has upvoted', () => {
    render(
      <Provider store={store}>
        <ThreadItem thread={mockThread} />
      </Provider>,
    );

    const upButton = screen.getByText('👍 2');
    expect(upButton.closest('button')).toHaveClass('bg-green-100');
  });

  it('should show category badge when category exists', () => {
    render(
      <Provider store={store}>
        <ThreadItem thread={mockThread} />
      </Provider>,
    );

    expect(screen.getByText('redux')).toBeInTheDocument();
  });
});
