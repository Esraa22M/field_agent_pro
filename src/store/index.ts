import { configureStore } from '@reduxjs/toolkit';
import { shipmentsSlice } from './slices/shipmentsSlice';
export const store = configureStore({
  reducer: {
     shipments: shipmentsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;