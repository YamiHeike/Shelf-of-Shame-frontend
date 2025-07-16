export enum Status {
  SHAME = "SHAME",
  GLORY = "GLORY",
  READING = "READING",
}

export interface UserShelfItem extends UserShelfItemDto {
  id: number;
}

export type UserShelfItemDto = {
  isbn: string;
  notes: string;
  difficulty: number;
  status: Status;
};

export interface UserShelfItemValues extends UserShelfItemDto {
  title: string;
  id: number;
  firstName: string;
  lastName: string;
  numberOfPages: number;
  genres: string;
}
