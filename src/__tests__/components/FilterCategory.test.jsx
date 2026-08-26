import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { describe, beforeEach, it, expect } from 'vitest';
import FilterCategory from '../../components/common/FilterCategory';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('FilterCategory Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      filter: { category: 'all' },
      threads: {
        threads: [
          { id: '1', category: 'redux' },
          { id: '2', category: 'perkenalan' },
          { id: '3', category: 'General' },
          { id: '4', category: 'redux' },
        ],
      },
    });
  });

  it('should render filter buttons with unique categories', () => {
    render(
      <Provider store={store}>
        <FilterCategory />
      </Provider>,
    );

    expect(screen.getByText('Semua')).toBeInTheDocument();
    expect(screen.getByText('redux')).toBeInTheDocument();
    expect(screen.getByText('perkenalan')).toBeInTheDocument();
    expect(screen.getByText('General')).toBeInTheDocument();
  });

  it('should dispatch setCategory when filter button is clicked', () => {
    render(
      <Provider store={store}>
        <FilterCategory />
      </Provider>,
    );

    const reduxButton = screen.getByText('redux');
    fireEvent.click(reduxButton);

    const actions = store.getActions();
    expect(actions[0].type).toBe('filter/setCategory');
    expect(actions[0].payload).toBe('redux');
  });

  it('should highlight active category', () => {
    store = mockStore({
      filter: { category: 'redux' },
      threads: {
        threads: [
          { id: '1', category: 'redux' },
          { id: '2', category: 'perkenalan' },
        ],
      },
    });

    render(
      <Provider store={store}>
        <FilterCategory />
      </Provider>,
    );

    const reduxButton = screen.getByText('redux');
    expect(reduxButton.closest('button')).toHaveClass('bg-blue-600');
  });
});
