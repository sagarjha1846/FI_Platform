import { configureStore } from '@reduxjs/toolkit';
import persistedReducer from './persistReducer';

export const store = configureStore({
  reducer: persistedReducer,
});
