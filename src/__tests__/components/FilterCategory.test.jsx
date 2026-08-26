import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../../store/slices/filterSlice';
import threadsReducer from '../../store/slices/threadsSlice';
import FilterCategory from '../../components/common/FilterCategory';

describe('FilterCategory Component', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        filter: filterReducer,
        threads: threadsReducer,
      },
      preloadedState: {
        filter: { category: 'all' },
        threads: {
          threads: [
            { id: '1', category: 'redux' },
            { id: '2', category: 'perkenalan' },
            { id: '3', category: 'General' },
            { id: '4', category: 'redux' },
          ],
        },
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

    const state = store.getState();
    expect(state.filter.category).toBe('redux');
  });

  it('should highlight active category', () => {
    // Buat store dengan active category 'redux'
    const storeWithActive = configureStore({
      reducer: {
        filter: filterReducer,
        threads: threadsReducer,
      },
      preloadedState: {
        filter: { category: 'redux' },
        threads: {
          threads: [
            { id: '1', category: 'redux' },
            { id: '2', category: 'perkenalan' },
          ],
        },
      },
    });

    render(
      <Provider store={storeWithActive}>
        <FilterCategory />
      </Provider>,
    );

    const reduxButton = screen.getByText('redux');
    expect(reduxButton.closest('button')).toHaveClass('bg-blue-600');
  });
});
