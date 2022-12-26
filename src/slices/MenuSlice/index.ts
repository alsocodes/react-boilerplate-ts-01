import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { RouteInterface } from "../../components/Sidebar/routes";

export type MenuState = {
  active: RouteInterface | null;
};

const initialState: MenuState = {
  active: null,
};

export const SetMenuActive = createAsyncThunk(
  "menu/menuActive",
  (menu: RouteInterface) => {
    return menu;
  }
);

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      SetMenuActive.fulfilled,
      (state: MenuState, { payload }) => {
        state.active = payload;
      }
    );
  },
});

// Create and export the selector:
export const selectMenu = (state: RootState) => state.menu;

// It is a convention to export reducer as a default export:
export default menuSlice.reducer;
