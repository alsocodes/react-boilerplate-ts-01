import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { APP_CONFIG_KEY } from '../../app/type.d';
// import { APP_CONFIG_KEY } from "../../app/type.d";
// import HttpCall from "../../utils/HttpCall";

export type CabangData = {
  id: string;
  name: string;
  address: string;
};

export type ToastData = {
  type: string;
  message: string;
};
export type AppConfigState = {
  themeSelected?: string | null;
  sidebarMode?: string | null;
  toastData?: ToastData | null;
  progress: boolean;
};

const initialState: AppConfigState = {
  themeSelected: null,
  sidebarMode: null,
  toastData: null,
  progress: false,
};

export const SetToastData = createAsyncThunk(
  'appConfig/toastData',
  (toastData: ToastData) => {
    return toastData;
  }
);

export const SetProgress = createAsyncThunk(
  'appConfig/progress',
  (progress: boolean) => {
    return progress;
  }
);

export const SetThemeSelected = createAsyncThunk(
  'appConfig/themeSelected',
  (theme: string, thunkApi) => {
    const { appConfig } = thunkApi.getState() as RootState;
    localStorage.setItem(
      APP_CONFIG_KEY,
      JSON.stringify({ ...appConfig, themeSelected: theme })
    );
    return theme;
  }
);

export const PersistConfig = createAsyncThunk(
  'auth/persistConfig',
  async () => {
    try {
      const storage = localStorage.getItem(APP_CONFIG_KEY);
      const config: AppConfigState = storage ? JSON.parse(storage) : null;
      return config;
    } catch (err) {
      throw err;
    }
  }
);

export const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      SetToastData.fulfilled,
      (state: AppConfigState, { payload }) => {
        state.toastData = payload;
      }
    );
    builder.addCase(
      SetThemeSelected.fulfilled,
      (state: AppConfigState, { payload }) => {
        state.themeSelected = payload;
      }
    );
    builder.addCase(
      PersistConfig.fulfilled,
      (state: AppConfigState, { payload }) => {
        state.sidebarMode = payload?.sidebarMode || null;
        state.themeSelected = payload?.themeSelected || null;
      }
    );
    builder.addCase(
      SetProgress.fulfilled,
      (state: AppConfigState, { payload }) => {
        state.progress = payload;
      }
    );
  },
});

// Create and export the selector:
export const selectAppConfig = (state: RootState) => state.appConfig;

// It is a convention to export reducer as a default export:
export default appConfigSlice.reducer;
