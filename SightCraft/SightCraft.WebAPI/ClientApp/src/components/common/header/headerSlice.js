import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import checkTokenExpiration from '../../../check-token-expiration/checkTokenExpiration';
import axios from 'axios';
import { Endpoints } from '../../../utils/endpoints';

const initialState = {
  isTokenAlive: false,
  currentUserId: '',
  isLoading: false,
  error: null,
};

export const getCurrentUserId = createAsyncThunk(
  'header/getCurrentUserId',
  async () => {
    let token = checkTokenExpiration() ? sessionStorage.getItem('token') : null;
    if (!!token) {
      let currUserResponse = await axios.get(Endpoints.USER_GETCURRENT(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let currUserData = currUserResponse.data;
      return { isTokenAlive: true, currentUserId: currUserData };
    } else
      return {
        isTokenAlive: false,
        currentUserId: '',
      };
  }
);

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    exit(state, action) {
      sessionStorage.removeItem('token');
      state.isTokenAlive = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUserId.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentUserId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isTokenAlive = action.payload.isTokenAlive;
      state.currentUserId = action.payload.currentUserId;
    });
    builder.addCase(getCurrentUserId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default headerSlice.reducer;
export const { exit } = headerSlice.actions;
export const selectors = {
  selectIsTokenAlive: (state) => state.header.isTokenAlive,
  selectCurrentUserId: (state) => state.header.currentUserId,
  selectIsLoading: (state) => state.header.isLoading,
  selectError: (state) => state.header.error,
};
