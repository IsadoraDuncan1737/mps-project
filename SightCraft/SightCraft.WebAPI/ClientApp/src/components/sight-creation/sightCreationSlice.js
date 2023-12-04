import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import checkTokenExpiration from '../../check-token-expiration/checkTokenExpiration';
import axios from 'axios';
import { Endpoints } from '../../utils/endpoints';

const initialState = {
  sightData: {
    Title: '',
    Image: '',
    Summary: '',
    Location: '',
    FoundingDate: '',
    Type: '',
    History: '',
  },
  isLoading: false,
  error: null,
};

export const postSightData = createAsyncThunk(
  'sightCreation/postSightData',
  async (postData) => {
    let token = checkTokenExpiration() ? sessionStorage.getItem('token') : null;
    console.log(postData);
    if (token) {
      axios
        .post(Endpoints.SIGHT_CREATE(), postData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => console.log(res.data))
        .catch((e) => console.log(e));
    }
  }
);

export const sightCreationSlice = createSlice({
  name: 'sightCreation',
  initialState,
  reducers: {
    changePostSightData(state, action) {
      state.sightData = { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postSightData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postSightData.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(postSightData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default sightCreationSlice.reducer;
export const { changePostSightData } = sightCreationSlice.actions;
export const selectors = {
  selectSightData: (state) => state.sightCreation.sightData,
  selectIsLoading: (state) => state.sightCreation.isLoading,
  selectError: (state) => state.sightCreation.error,
};
