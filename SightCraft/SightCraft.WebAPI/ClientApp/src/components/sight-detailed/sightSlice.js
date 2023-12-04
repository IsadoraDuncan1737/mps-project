import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import checkTokenExpiration from '../../check-token-expiration/checkTokenExpiration';
import { sights } from '../main/data/sights'; // test
import { users } from '../main/data/users';
// import axios from 'axios';

export const MOD = { REMOVE: 'REMOVE', UPDATE: 'UPDATE', READ: 'READ' };
export const SIGHT_TYPES = ['Замок', 'Памятник', 'Сооружение'];

const initialState = {
  sightData: {},
  newSightData: {},
  currentUserId: 0, //test
  authorData: { ID: 0, Login: '' },
  isCurrentUserTheAuthor: false,
  currentSightType: '',
  mod: MOD.READ,
  isLoading: false,
  error: null,
};

export const fetchSightById = createAsyncThunk(
  'sight/fetchSightById',
  async (id) => {
    let sight = sights.find((item) => item.ID === id);
    return { sight: sight, newSightData: sight };
    //
    // const resSightData = await axios
    //   .get('../data/sight.js')
    //   .then((res) => console.log(res.data))
    //   .catch((e) => console.log(e));
    // return resSightData.data;
  }
);

export const fetchAuthorById = createAsyncThunk(
  'sight/fetchAuthorById',
  async (id) => {
    let sight = sights.find((item) => item.ID === id);
    let authorId = sight.UserID;
    let author = users.find((item) => item.ID === authorId);
    return author;
  }
);

export const compareAuthorAndUserIds = createAsyncThunk(
  'sight/compareAuthorAndUserIds',
  async (authorId) => {
    let token = checkTokenExpiration() ? sessionStorage.getItem('token') : null;
    // УБРАТЬ "!" ПОСТАВИЛА ЕГО ДЛЯ ТЕСТА
    if (!token) {
      // Д. ПОЛУЧИТЬ ЗДЕСЬ ID ЮЗЕРА ПО ТОКЕНУ //
      let currentUserId = 101;
      if (Number(authorId) === Number(currentUserId)) {
        return true;
      } else {
        return false;
      }
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
    remove(state, action) {
      // нужно запрос на сервер кидать
      console.log('removing sight with id = ' + action.payload);
    },
    submit(state, action) {
      // работает через жопу, но вроде работает. нужно тестить совместно с бд
      state.sightData = { ...action.payload };
      state.mod = MOD.READ;
    },
    changeNewSight(state, action) {
      state.newSightData = action.payload;
    },
    setCurrentSightType(state, action) {
      state.currentSightType = action.payload;
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
    });
    builder.addCase(fetchSightById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchAuthorById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAuthorById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authorData = action.payload;
    });
    builder.addCase(fetchAuthorById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(compareAuthorAndUserIds.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(compareAuthorAndUserIds.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isCurrentUserTheAuthor = action.payload;
    });
    builder.addCase(compareAuthorAndUserIds.rejected, (state, action) => {
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
  remove,
  submit,
  changeNewSight,
  setCurrentSightType,
} = sightSlice.actions;
export const selectors = {
  selectInfo: (state) => state.sight.sightData,
  selectNewInfo: (state) => state.sight.newSightData,
  selectMod: (state) => state.sight.mod,
  selectAuthorInfo: (state) => state.sight.authorData,
  selectIsCurrentUserTheAuthor: (state) => state.sight.isCurrentUserTheAuthor,
  selectCurrentSightType: (state) => state.sight.currentSightType,
  selectIsLoading: (state) => state.sight.isLoading,
  selectError: (state) => state.sight.error,
};
