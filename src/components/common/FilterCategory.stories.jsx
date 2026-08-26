import FilterCategory from './FilterCategory';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

export default {
  title: 'Common/FilterCategory',
  component: FilterCategory,
};

const store = mockStore({
  filter: { category: 'all' },
  threads: {
    threads: [
      { id: '1', category: 'redux' },
      { id: '2', category: 'perkenalan' },
      { id: '3', category: 'General' },
    ],
  },
});

export const Default = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export const WithActiveCategory = {
  decorators: [
    (Story) => (
      <Provider store={mockStore({
        filter: { category: 'redux' },
        threads: {
          threads: [
            { id: '1', category: 'redux' },
            { id: '2', category: 'perkenalan' },
          ],
        },
      })}>
        <Story />
      </Provider>
    ),
  ],
};