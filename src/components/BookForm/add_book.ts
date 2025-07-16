import { UserShelfItemDto } from "../../types";
import { backendRequest } from "../../utils";

export const createBook = async () => {};

export const addBookToShelf = async (bookDto: UserShelfItemDto) => {
  const item: UserShelfItemDto = {
    isbn: bookDto.isbn,
    notes: bookDto.notes,
    difficulty: bookDto.difficulty,
    status: bookDto.status,
  };

  const userShelfItem = await backendRequest<
    UserShelfItemDto,
    UserShelfItemDto
  >("POST", "http://localhost:8080/shelf/add", item);

  return userShelfItem;
};
