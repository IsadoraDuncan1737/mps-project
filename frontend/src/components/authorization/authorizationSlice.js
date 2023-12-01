import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NavPathes } from '../../utils/navpathes';
import { Endpoints } from '../../utils/endpoints';
import axios from 'axios';

const initialState = { isLoading: false, error: '' };

export const registration = createAsyncThunk(
  'authorization/registration',
  async ({ value, navigate }) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const userData = {
      Login: value.login,
      Password: value.password,
      RegistrationDate: formattedDate,
      AboutSelf: value.desc,
    };

    axios
      .post(Endpoints.USER_REGISTRATION(), userData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert('Успешная регистрация');
          navigate(NavPathes.MAIN_PAGE());
        } else {
          alert('Ошибка');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
);

export const login = createAsyncThunk(
  'authorization/login',
  async ({ value, navigate }) => {
    const userData = {
      Login: value.login,
      Password: value.password,
    };

    axios
      .post(Endpoints.USER_LOGIN(), userData)
      .then((res) => {
        console.log(res);
        navigate(NavPathes.MAIN_PAGE());
        sessionStorage.setItem('token', res.data.token);
      })
      .catch((e) => console.log(e));
  }
);

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  // будем чисто данные на сервер кидать и пихать получаемый токен в сторагу
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registration.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(registration.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const selectors = {
  selectIsLoading: (state) => state.authorization.isLoading,
  selectError: (state) => state.authorization.error,
};
export default authorizationSlice.reducer;
