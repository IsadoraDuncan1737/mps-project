import { configureStore } from '@reduxjs/toolkit';
import sightSlice from '../components/sight-detailed/sightSlice';
import sightCreationSlice from '../components/sight-creation/sightCreationSlice';
import mainSlice from '../components/main/mainSlice';
import headerSlice from '../components/common/header/headerSlice';
import userSightsSlice from '../components/user-sights/userSightsSlice';

export const store = configureStore({
  reducer: {
    sight: sightSlice,
    sightCreation: sightCreationSlice,
    main: mainSlice,
    header: headerSlice,
    userSights: userSightsSlice,
  },
});
