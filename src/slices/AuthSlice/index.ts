import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { AUTH_KEY } from "../../app/type.d";
import { IFormLogin } from "../../pages/Login";
import HttpCall from "../../utils/HttpCall";
import { SetToastData } from "../ConfigSlice";

export type UserData = {
  id: string;
  name: string;
  refreshToken: string;
  accessToken: string;
  accesses: string[];
};

export type AuthState = {
  persisting: boolean;
  loggedIn: boolean;
  loading: boolean;
  error: string | null;
  userData: UserData | null;
};

const initialState: AuthState = {
  loggedIn: false,
  persisting: false,
  loading: false,
  error: null,
  userData: null,
};

export const PostLogin = createAsyncThunk(
  "auth/login",
  async ({ username, password }: IFormLogin, { dispatch }) => {
    try {
      const { accessToken, refreshToken, user } = (
        await HttpCall.post("/auth/login", {
          username,
          password,
        })
      ).data.result;

      const userData: UserData = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        id: user.id,
        name: user.name,
        accesses: user.accesses,
      };
      // Store auth token
      localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
      const toastData = {
        type: "success",
        message: "Login Berhasil",
      };
      dispatch(SetToastData(toastData));
      return userData;
    } catch (err: any) {
      // Cannot login!
      const toastData = {
        type: "error",
        message: err.response.data.message || "Error",
      };
      dispatch(SetToastData(toastData));

      throw err;
    }
  }
);

export const PersistLogin = createAsyncThunk("auth/persistLogin", async () => {
  try {
    const storage = localStorage.getItem(AUTH_KEY);
    const authData: UserData = storage ? JSON.parse(storage) : null;
    return authData;
  } catch (err) {
    throw err;
  }
});

export const Logout = createAsyncThunk("auth/logout", async () => {
  try {
    localStorage.removeItem(AUTH_KEY);
    return null;
  } catch (err) {
    throw err;
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login reducer
    builder.addCase(PostLogin.pending, (state: AuthState) => {
      state.loading = true;
    });
    builder.addCase(PostLogin.fulfilled, (state: AuthState, { payload }) => {
      state.loggedIn = payload !== null;
      state.persisting = false;
      state.loading = false;
      state.error = null;
      state.userData = payload;
    });
    builder.addCase(PostLogin.rejected, (state: AuthState, { payload }) => {
      state.loading = false;
    });

    // persistLogin reducer
    builder.addCase(PersistLogin.pending, (state: AuthState) => {
      state.persisting = true;
    });
    builder.addCase(PersistLogin.fulfilled, (state: AuthState, { payload }) => {
      state.loggedIn = payload !== null;
      state.persisting = false;
      state.loading = false;
      state.error = null;
      state.userData = payload;
    });
    builder.addCase(PersistLogin.rejected, (state: AuthState, { payload }) => {
      state.loading = false;
    });
    builder.addCase(Logout.fulfilled, (state: AuthState) => {
      state.loggedIn = false;
      state.persisting = false;
      state.loading = false;
      state.error = null;
      state.userData = null;
    });
  },
});

// Create and export the selector:
export const selectAuth = (state: RootState) => state.auth;

// It is a convention to export reducer as a default export:
export default authSlice.reducer;
