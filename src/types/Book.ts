import { Author } from "./Author";

export type BookOutline = {
  title: string;
  authors: Author[];
  numberOfPages: number;
};

export interface Book extends BookOutline {
  isbn: string;
  description: string;
  genres: number[];
}

export type Genre = {
  id: number;
  name: string;
};

export interface GenreBooks extends Genre {
  books: Book[];
}
