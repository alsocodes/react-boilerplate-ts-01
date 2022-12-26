import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice";
import appConfigReducer from "../slices/ConfigSlice";
import menuReducer from "../slices/MenuSlice";
import cabangReducer from "../slices/CabangSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appConfig: appConfigReducer,
    menu: menuReducer,
    cabang: cabangReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
