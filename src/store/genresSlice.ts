import { createSlice } from "@reduxjs/toolkit";
import { Genre } from "../types";
import { fetchGenres } from "./genreThunk";

type GenresState = {
  list: Genre[];
  loading: boolean;
  error: string | null;
};

const initialState: GenresState = {
  list: [],
  loading: false,
  error: null,
};

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const genresReducer = genresSlice.reducer;
