import { Book, BookDto } from "./Book";

export enum Status {
  SHAME = "SHAME",
  GLORY = "GLORY",
  READING = "READING",
}

export interface UserShelfItem extends UserShelfItemDto {
  id: number;
  book: Book;
}

export type UserShelfItemDto = {
  isbn: string;
  notes: string;
  difficulty: number;
  status: Status;
};

export interface UserShelfItemValues extends UserShelfItemDto {
  title: string;
  authorId: number;
  firstName: string;
  lastName: string;
  numberOfPages: number;
  genre: string;
  description: string;
}

export type UserShelfItemRecord = {
  id: number;
  book: BookDto;
  notes: string;
  difficulty: number;
  status: Status;
};

export type EditShelfItemDto = {
  status: Status;
  notes: string;
  difficulty: number;
};

export type RecommendationsFilter = {
  difficultyMin?: number;
  difficultyMax?: number;
  genres?: string[];
};

export interface ShelfItemFilter extends RecommendationsFilter {
  status?: Status;
}
