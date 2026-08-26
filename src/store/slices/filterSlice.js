import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    resetFilter: (state) => {
      state.category = 'all';
    },
  },
});

export const { setCategory, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
