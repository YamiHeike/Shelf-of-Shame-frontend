import { UserDto } from "../components";
import { Book } from "./Book";

export enum Status {
  SHAME,
  GLORY,
  READING,
}

export type UserShelfItem = {
  id: number;
  book: Book;
  notes: string;
  difficulty: number;
  status: Status;
};

export type UserShelfItemDto = {
  user: UserDto;
  book: Book;
  notes: string;
  difficulty: number;
  status: Status;
};
