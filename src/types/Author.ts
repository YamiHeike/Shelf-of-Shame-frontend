import { Book } from "./Book";

export type CreateAuthorDto = {
  firstName: string;
  lastName: string;
};

export type Author = {
  id: number;
  firstName: string;
  lastName: string;
};

export interface AuthorBooks extends Author {
  books: Book[];
}
