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
