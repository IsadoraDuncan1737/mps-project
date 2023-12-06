import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import checkTokenExpiration from '../../check-token-expiration/checkTokenExpiration';
import axios from 'axios';
import { Endpoints } from '../../utils/endpoints';

const initialState = {
  currentUserId: '',
  sights: [],
  isLoading: false,
  error: null,
};

export const getCurrentUserId = createAsyncThunk(
  'userSights/getCurrentUserId',
  async () => {
    let token = checkTokenExpiration() ? sessionStorage.getItem('token') : null;
    if (!!token) {
      let currUserResponse = await axios.get(Endpoints.USER_GETCURRENT(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let currUserData = currUserResponse.data;
      console.log(currUserData);
      return currUserData;
    }
  }
);

export const userSightsSlice = createSlice({
  name: 'userSights',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentUserId.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentUserId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUserId = action.payload;
    });
    builder.addCase(getCurrentUserId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default userSightsSlice.reducer;
// export const {  } = userSightsSlice.actions;
export const selectors = {
  selectCurrentUserId: (state) => state.userSights.currentUserId,
  selectIsLoading: (state) => state.userSights.isLoading,
  selectError: (state) => state.userSights.error,
};
