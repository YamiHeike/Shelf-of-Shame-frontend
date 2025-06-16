import { createAsyncThunk } from "@reduxjs/toolkit";
import { Book } from "../types";
import { getBooks } from "../utils";

export const fetchBooks = createAsyncThunk<Book[]>(
  "books/fetchBooks",
  async (_, thunkAPI) => {
    try {
      const books = await getBooks();
      return books;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message || "Failed to fetch books");
    }
  }
);
