import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../types";
import { fetchBooks } from "./bookThunks";

type BooksState = {
  list: Book[];
  loading: boolean;
  error: string | null;
};

const initialState: BooksState = {
  list: [],
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Book>) => {
      const exists = state.list.find(
        (book) => book.isbn === action.payload.isbn
      );
      if (!exists) {
        state.list.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const bookActions = booksSlice.actions;
export const booksReducer = booksSlice.reducer;
