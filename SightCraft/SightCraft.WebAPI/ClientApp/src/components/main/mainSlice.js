import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Endpoints } from '../../utils/endpoints';

const initialState = {
  sights: [],
  isLoading: false,
  error: null,
};

export const fetchSights = createAsyncThunk('main/fetchSights', async () => {
  const response = await fetch(Endpoints.SIGHTS_GETALL());
  let body = await response.json();
  const date = body.map(
    (item) =>
      (item.foundingDate = item.foundingDate.slice(
        0,
        item.foundingDate.indexOf('T')
      ))
  );
  for (let i = 0; i < body.lenght; i++) {
    body[i] = { ...body[i], foundingDate: date[i] };
  }
  return { sights: body };
});

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSights.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSights.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sights = [...action.payload.sights];
    });
    builder.addCase(fetchSights.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

// export const {  } = mainSlice.actions;
export const selectors = {
  selectSights: (state) => state.main.sights,
  selectIsLoading: (state) => state.main.isLoading,
  selectError: (state) => state.main.error,
};
export default mainSlice.reducer;
