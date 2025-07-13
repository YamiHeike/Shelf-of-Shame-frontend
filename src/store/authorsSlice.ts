import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Author } from "../types";
import { fetchAuthors } from "./authorThunks";

type AuthorState = {
  list: Author[];
  loading: boolean;
  error: string | null;
};

const initialState: AuthorState = {
  list: [],
  loading: false,
  error: null,
};

const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Author>) => {
      const exists = state.list.find(
        (author) =>
          author.firstName === action.payload.firstName &&
          author.lastName === action.payload.lastName
      );
      if (!exists) {
        state.list.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        (state.loading = false), (state.list = action.payload);
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const authorActions = authorsSlice.actions;
export const authorsReducer = authorsSlice.reducer;
