import { configureStore } from '@reduxjs/toolkit';
import authorizationSlice from '../components/authorization/authorizationSlice';

export const store = configureStore({
  reducer: {
    authorization: authorizationSlice,
  },
});
