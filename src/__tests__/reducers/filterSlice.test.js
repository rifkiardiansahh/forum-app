import filterReducer, { setCategory, resetFilter } from '../../store/slices/filterSlice';

describe('filterSlice Reducer', () => {
  const initialState = { category: 'all' };

  it('should return initial state', () => {
    expect(filterReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setCategory', () => {
    const newState = filterReducer(initialState, setCategory('redux'));
    expect(newState.category).toBe('redux');
  });

  it('should handle resetFilter', () => {
    const stateWithCategory = { category: 'technology' };
    const newState = filterReducer(stateWithCategory, resetFilter());
    expect(newState.category).toBe('all');
  });
});