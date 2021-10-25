import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import gistReducer from "../store/gist.reducer";

export const store = configureStore({
  reducer: {
    gist: gistReducer,
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
