import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Author } from "../types";

type AuthorState = {
  list: Author[];
};

const initialState: AuthorState = {
  list: [],
};

const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Author>) => {
      if (
        !state.list.find(
          (author) =>
            author.firstName === action.payload.firstName &&
            author.lastName === action.payload.lastName
        )
      ) {
        state.list.push(action.payload);
      }
    },
    delete: (state, action: PayloadAction<{ id: number }>) => {
      state.list = state.list.filter(
        (author) => author.id !== action.payload.id
      );
    },
  },
});

export const authorsReducer = authorsSlice.reducer;
