import { Book } from "./Book";

export type Author = {
  id: number;
  firstName: string;
  lastName: string;
};

export interface AuthorBooks extends Author {
  books: Book[];
}
