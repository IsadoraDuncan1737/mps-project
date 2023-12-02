import { configureStore } from '@reduxjs/toolkit';
import sightSlice from '../components/sight-detailed/sightSlice';

export const store = configureStore({
  reducer: { sight: sightSlice },
});
