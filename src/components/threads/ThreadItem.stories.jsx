import ThreadItem from './ThreadItem';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

export default {
  title: 'Threads/ThreadItem',
  component: ThreadItem,
  decorators: [
    (Story) => (
      <Provider store={mockStore({
        auth: { user: { id: 'user-1' } },
        users: { users: [{ id: 'user-1', name: 'John Doe' }] },
      })}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Provider>
    ),
  ],
};

const mockThread = {
  id: 'thread-1',
  title: 'My First Thread',
  body: 'This is the content of my first thread...',
  category: 'redux',
  createdAt: '2026-08-26T10:00:00.000Z',
  ownerId: 'user-1',
  totalComments: 5,
  upVotesBy: ['user-1', 'user-2'],
  downVotesBy: [],
};

export const Default = {
  args: {
    thread: mockThread,
  },
};

export const WithLongTitle = {
  args: {
    thread: {
      ...mockThread,
      title: 'This is a very long thread title that might get truncated because it exceeds the maximum length',
    },
  },
};

export const NoComments = {
  args: {
    thread: {
      ...mockThread,
      totalComments: 0,
      upVotesBy: [],
      downVotesBy: [],
    },
  },
};