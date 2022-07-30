import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import boardReducer from './features/boardSlice';
import starsReducer from './features/starredSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    stars: starsReducer
  },
});
