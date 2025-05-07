import { Author } from "./Author";

export type BookOutline = {
  title: string;
  authors: Author[];
  numberOfPages: number;
};

export interface Book extends BookOutline {
  isbn: string;
  description: string;
  genre: string;
}

export type Genre = {
  id: string;
  name: string;
};

export interface GenreBooks extends Genre {
  books: Book[];
}
