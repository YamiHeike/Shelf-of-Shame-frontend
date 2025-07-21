import { configureStore } from "@reduxjs/toolkit";
import { authorsReducer } from "./authorsSlice";
import { booksReducer } from "./booksSlice";
import { genresReducer } from "./genresSlice";
import { shelfApi } from "./shelfApi";

export const store = configureStore({
  reducer: {
    authors: authorsReducer,
    books: booksReducer,
    genres: genresReducer,
    [shelfApi.reducerPath]: shelfApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shelfApi.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
