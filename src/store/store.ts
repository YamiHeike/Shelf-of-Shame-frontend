import { configureStore } from "@reduxjs/toolkit";
import { authorsReducer } from "./authorsSlice";
import { booksReducer } from "./booksSlice";

export const store = configureStore({
  reducer: {
    authors: authorsReducer,
    books: booksReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
