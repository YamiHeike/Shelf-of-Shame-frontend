import { Book } from "./Book";

export enum Status {
  SHAME = "Shame",
  GLORY = "Glory",
  READING = "Reading",
}

export interface UserShelfItem extends UserShelfItemDto {
  id: number;
}

export type UserShelfItemDto = {
  book: Book;
  notes: string;
  difficulty: number;
  status: Status;
};

export type AddExistingBookDto = {
  isbn: string;
  notes: string;
  difficulty: number;
  status: Status;
};
