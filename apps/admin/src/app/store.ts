import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import KioskSlice from "../feature/Kiosk/KioskSlice";

export const store = configureStore({
  reducer: {
    kiosks: KioskSlice,
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
