import { createAsyncThunk } from "@reduxjs/toolkit";
import { Genre } from "../types";
import { getGenres } from "../utils";

export const fetchGenres = createAsyncThunk<Genre[]>(
  "genres/fetchGenres",
  async (_, thunkAPI) => {
    try {
      const genres = await getGenres();
      return genres;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message || "Failed to fetch genres");
    }
  }
);
