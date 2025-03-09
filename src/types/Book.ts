import { Author } from "./Author";

export type BookOutline = {
  title: string;
  author: Author[];
  numberOfPages: number;
};

export interface Book extends BookOutline {
  coverUrl: string;
  isbn: string;
  description: string;
}

export type Genre = {
  id: string;
  name: string;
};

export interface GenreBooks extends Genre {
  books: Book[];
}
