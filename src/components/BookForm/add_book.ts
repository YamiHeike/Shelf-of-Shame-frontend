import {
  Author,
  Book,
  CreateAuthorDto,
  UserShelfItemDto,
  UserShelfItemValues,
} from "../../types";
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

export const addNewBookToShelf = async (
  isAuthorNotFound: boolean,
  values: UserShelfItemValues,
  authors: Author[]
) => {
  let addAuthorResponse;

  if (isAuthorNotFound) {
    addAuthorResponse = await backendRequest<Author, CreateAuthorDto>(
      "POST",
      "http://localhost:8080/authors/new",
      {
        firstName: values.firstName,
        lastName: values.lastName,
      }
    );
  }

  const book: Book = {
    title: values.title,
    authors: isAuthorNotFound
      ? [addAuthorResponse?.data!]
      : authors.filter((author) => author.id === values.authorId),
    numberOfPages: values.numberOfPages,
    isbn: values.isbn,
    description: values.description,
    genres: [parseInt(values.genre)],
  };

  await backendRequest<Book, Book>(
    "POST",
    "http://localhost:8080/books/new",
    book
  );

  await addBookToShelf(values);
};
