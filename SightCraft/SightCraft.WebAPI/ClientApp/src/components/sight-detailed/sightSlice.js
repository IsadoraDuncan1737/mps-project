import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import checkTokenExpiration from '../../check-token-expiration/checkTokenExpiration';
import axios from 'axios';
import { Endpoints } from '../../utils/endpoints';

export const MOD = { REMOVE: 'REMOVE', UPDATE: 'UPDATE', READ: 'READ' };
export const SIGHT_TYPES = ['Замок', 'Памятник', 'Сооружение'];

const initialState = {
  sightData: {},
  newSightData: {},
  authorData: {},
  isCurrentUserTheAuthor: false,
  mod: MOD.READ,
  isLoading: false,
  error: null,
};

export const fetchSightById = createAsyncThunk(
  'sight/fetchSightById',
  async (id) => {
    const response = await fetch(Endpoints.SIGHT_GETBYID(id));
    let data = await response.json();
    // console.log(data)
    const date = data.foundingDate.slice(0, data.foundingDate.indexOf('T'));
    data = { ...data, foundingDate: date };

    let authorId = data.userId;
    const authorResponse = await fetch(Endpoints.USER_GETBYID(authorId));
    const authorDat = await authorResponse.json();
    let isCurrentTheAuthor;

    let token = checkTokenExpiration() ? sessionStorage.getItem('token') : null;
    if (!!token) {
      const currUserResponse = await axios.get(Endpoints.USER_GETCURRENT(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let currentUserId = currUserResponse.data;
      // console.log('author: ' + authorDat.id + '\ncurrent: ' + currentUserId);
      if (authorDat.id === currentUserId) {
        isCurrentTheAuthor = true;
      } else {
        isCurrentTheAuthor = false;
      }
    }

    return {
      sight: data,
      newSightData: data,
      authorData: { id: authorDat.id, login: authorDat.login },
      isCurrentUserTheAuthor: isCurrentTheAuthor,
    };
  }
);

export const removeSight = createAsyncThunk('sight/removeSight', async (id) => {
  let token = checkTokenExpiration() ? sessionStorage.getItem('token') : null;
  if (!!token) {
    console.log('removing sight with id = ' + id);
    axios
      .delete(Endpoints.SIGHT_DELETE(id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) =>
        res.status === 200 ? alert('Удалено') : alert('Произошла ошибка')
      )
      .catch((e) => console.log(e));
  }
});

export const updateSight = createAsyncThunk(
  'sight/updateSight',
  async (postData) => {
    let token = checkTokenExpiration() ? sessionStorage.getItem('token') : null;
    console.log(postData);
    if (!!token) {
      console.log('updating sight with id = ' + postData.Id);
      axios
        .put(Endpoints.SIGHT_PUT(), postData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) =>
          res.status === 200 ? alert('Обновлено') : alert('Произошла ошибка')
        )
        .catch((e) => console.log(e));
    }
  }
);

export const sightSlice = createSlice({
  name: 'sight',
  initialState,
  reducers: {
    changeModToUpdate(state, action) {
      state.mod = MOD.UPDATE;
    },
    changeModToRemove(state, action) {
      state.mod = MOD.REMOVE;
    },
    changeModToRead(state, action) {
      state.mod = MOD.READ;
    },
    changeNewSight(state, action) {
      state.newSightData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSightById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSightById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sightData = action.payload.sight;
      state.newSightData = action.payload.newSightData;
      state.authorData = action.payload.authorData;
      state.isCurrentUserTheAuthor = action.payload.isCurrentUserTheAuthor;
    });
    builder.addCase(fetchSightById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(updateSight.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateSight.fulfilled, (state, action) => {
      state.isLoading = false;
      state.mod = MOD.READ;
    });
    builder.addCase(updateSight.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default sightSlice.reducer;
export const {
  changeModToUpdate,
  changeModToRemove,
  changeModToRead,
  changeNewSight,
} = sightSlice.actions;
export const selectors = {
  selectInfo: (state) => state.sight.sightData,
  selectNewInfo: (state) => state.sight.newSightData,
  selectMod: (state) => state.sight.mod,
  selectAuthorInfo: (state) => state.sight.authorData,
  selectIsCurrentUserTheAuthor: (state) => state.sight.isCurrentUserTheAuthor,
  selectIsLoading: (state) => state.sight.isLoading,
  selectError: (state) => state.sight.error,
};
