import AddBookForm from "../components/AddBookForm/AddBookForm";
import { Author, Book, Genre, Status } from "../types";
import { AuthPage } from "./AuthPage";

export const AddBookPage = () => {
  const authors: Author[] = [
    { id: 1, firstName: "F. Scott", lastName: "Fitzgerald" },
    { id: 2, firstName: "George", lastName: "Orwell" },
    { id: 3, firstName: "Leo", lastName: "Tolstoy" },
  ];

  const genres: Genre[] = [
    { id: "1", name: "Fiction" },
    { id: "2", name: "Non-Fiction" },
    { id: "3", name: "Science Fiction" },
  ];

  const handleAddBook = (
    book: Book,
    difficulty: number,
    status: Status,
    notes: string
  ) => {
    console.log("Adding book:", book);
    console.log("Difficulty:", difficulty);
    console.log("Status:", status);
    console.log("Notes:", notes);
  };

  return (
    <AuthPage
      Page={
        <div style={{ padding: "24px" }}>
          <AddBookForm
            onAddBook={handleAddBook}
            authors={authors}
            genres={genres}
          />
        </div>
      }
    />
  );
};
