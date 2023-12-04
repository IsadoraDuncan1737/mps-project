import { configureStore } from '@reduxjs/toolkit';
import sightSlice from '../components/sight-detailed/sightSlice';
import sightCreationSlice from '../components/sight-creation/sightCreationSlice';

export const store = configureStore({
  reducer: { sight: sightSlice, sightCreation: sightCreationSlice },
});
