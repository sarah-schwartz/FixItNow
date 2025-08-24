import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import ticketsSlice from '../features/tickets/ticketsSlice';
import requestsSlice from '../features/requests/requestsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tickets: ticketsSlice,
    requests: requestsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
