import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';
import { reduceErrorHandler } from '../../../utils';

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  isAuthenticated: false,
  message: '',
  token: null,
};

// login

export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const resp = await authService.login(userData);
      console.log('====================================');
      console.log(resp);
      console.log('====================================');
      return resp;
    } catch (error) {
      const message = reduceErrorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getUserInfo = createAsyncThunk(
  'auth/user-info',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const resp = await authService.getUserInfo({ token });
      return resp;
    } catch (error) {
      const message = reduceErrorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const logOut = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const forgotPassword = createAsyncThunk(
  'auth/forgot-password',
  async (userData, thunkAPI) => {
    try {
      await authService.forgotPassword(userData);
      return 'Email was sent successfully';
    } catch (error) {
      const message = reduceErrorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const changePassword = createAsyncThunk(
  'auth/change-password',
  async (userData, thunkAPI) => {
    try {
      const resp = await authService.changePassword(userData);
      return resp;
    } catch (error) {
      const message = reduceErrorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const resetPassword = createAsyncThunk(
  'auth/reset-password',
  async (userData, thunkAPI) => {
    try {
      const resp = await authService.resetPassword(userData);
      return resp;
    } catch (error) {
      const message = reduceErrorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const confirmUser = createAsyncThunk(
  'auth/confirm-user',
  async (userData, thunkAPI) => {
    try {
      const resp = await authService.confirmUser(userData);
      return resp;
    } catch (error) {
      const message = reduceErrorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const resendCode = createAsyncThunk(
  'auth/resend-code',
  async (email, thunkAPI) => {
    try {
      const resp = await authService.resendOtp(email);
      return resp;
    } catch (error) {
      const message = reduceErrorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(confirmUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(confirmUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(resendCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resendCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(resendCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
