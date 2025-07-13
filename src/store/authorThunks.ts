import { createAsyncThunk } from "@reduxjs/toolkit";
import { Author } from "../types";
import { getAuthors } from "../utils";

export const fetchAuthors = createAsyncThunk<Author[]>(
  "authors/fetchAuthors",
  async (_, thunkAPI) => {
    try {
      const authors = await getAuthors();
      return authors;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err?.message || "Failed to fetch authors"
      );
    }
  }
);
