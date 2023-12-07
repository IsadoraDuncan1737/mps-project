import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import checkTokenExpiration from '../../check-token-expiration/checkTokenExpiration';
import axios from 'axios';
import { Endpoints } from '../../utils/endpoints';

const initialState = {
  currentUserId: '',
  isCurrentUserTheAuthor: false,
  authorData: {},
  sights: [],
  isLoading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  'userSights/fetchData',
  async (userIdFromParams) => {
    let token = checkTokenExpiration() ? sessionStorage.getItem('token') : null;
    if (!!token) {
      let currUserResponse = await axios.get(Endpoints.USER_GETCURRENT(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let currUserData = currUserResponse.data;

      let authorRes = await axios.get(Endpoints.USER_GETBYID(userIdFromParams));
      let authorData = authorRes.data;

      let isCurrentUserTheAuthor;
      userIdFromParams === currUserData
        ? (isCurrentUserTheAuthor = true)
        : (isCurrentUserTheAuthor = false);

      let allUserSightsRes = await axios.get(
        Endpoints.SIGHT_GETBYUSERID(userIdFromParams),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let allUserSights = allUserSightsRes.data;
      const date = allUserSights.map(
        (item) =>
          (item.foundingDate = item.foundingDate.slice(
            0,
            item.foundingDate.indexOf('T')
          ))
      );
      for (let i = 0; i < allUserSights.lenght; i++) {
        allUserSights[i] = { ...allUserSights[i], foundingDate: date[i] };
      }

      return {
        currentUserId: currUserData,
        sights: allUserSights,
        isCurrentUserTheAuthor: isCurrentUserTheAuthor,
        authorData: { id: userIdFromParams, login: authorData.login },
      };
    }
  }
);

export const userSightsSlice = createSlice({
  name: 'userSights',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUserId = action.payload.currentUserId;
      state.sights = action.payload.sights;
      state.authorData = action.payload.authorData;
      state.isCurrentUserTheAuthor = action.payload.isCurrentUserTheAuthor;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default userSightsSlice.reducer;
// export const {  } = userSightsSlice.actions;
export const selectors = {
  selectCurrentUserId: (state) => state.userSights.currentUserId,
  selectSights: (state) => state.userSights.sights,
  selectAuthorData: (state) => state.userSights.authorData,
  selectIsCurrentUserTheAuthor: (state) =>
    state.userSights.isCurrentUserTheAuthor,
  selectIsLoading: (state) => state.userSights.isLoading,
  selectError: (state) => state.userSights.error,
};
