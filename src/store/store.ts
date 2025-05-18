import { configureStore } from "@reduxjs/toolkit";
import { authorsReducer } from "./authorsSlice";

const store = configureStore({
  reducer: {
    authors: authorsReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
