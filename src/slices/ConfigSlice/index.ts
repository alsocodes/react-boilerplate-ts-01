import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
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
  listCabang: CabangData[];
  cabangSelected: CabangData | null;
  themeSelected?: string | null;
  sidebarMode?: string | null;
  toastData?: ToastData | null;
};

const initialState: AppConfigState = {
  listCabang: [],
  cabangSelected: null,
  themeSelected: null,
  sidebarMode: null,
  toastData: null,
};

export const SetToastData = createAsyncThunk(
  "appConfig/toastData",
  (toastData: ToastData) => {
    console.log("here 2");
    return toastData;
  }
);

export const appConfigSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      SetToastData.fulfilled,
      (state: AppConfigState, { payload }) => {
        state.toastData = payload;
      }
    );
  },
});

// Create and export the selector:
export const selectAppConfig = (state: RootState) => state.appConfig;

// It is a convention to export reducer as a default export:
export default appConfigSlice.reducer;
