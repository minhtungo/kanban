import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: [] };

export const starredSlice = createSlice({
  name: 'stars',
  initialState,
  reducers: {
    setStarredList: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setStarredList } = starredSlice.actions;

export default starredSlice.reducer;
