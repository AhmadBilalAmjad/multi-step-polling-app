import { configureStore } from '@reduxjs/toolkit';
import pollReducer from './pollSlice';
import { pollApi } from '../services/pollApi';

export const store = configureStore({
  reducer: {
    poll: pollReducer,
    [pollApi.reducerPath]: pollApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pollApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 