import { AddBookForm } from "../components/AddBookForm";
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

  const books: Book[] = [
    {
      title: "War and Peace",
      author: [{ id: 1, firstName: "Leo", lastName: "Tolstoy" }],
      numberOfPages: 1225,
      isbn: "0199232765",
      description:
        "A historical novel that intertwines the lives of five aristocratic families during the Napoleonic Wars.",
    },
    {
      title: "1984",
      author: [{ id: 2, firstName: "George", lastName: "Orwell" }],
      numberOfPages: 328,
      isbn: "0451524935",
      description:
        "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.",
    },
    {
      title: "Pride and Prejudice",
      author: [{ id: 3, firstName: "Jane", lastName: "Austen" }],
      numberOfPages: 279,
      isbn: "1503290563",
      description:
        "A romantic novel that critiques the British landed gentry at the end of the 18th century.",
    },
    {
      title: "Moby-Dick",
      author: [{ id: 4, firstName: "Herman", lastName: "Melville" }],
      numberOfPages: 635,
      isbn: "0142437247",
      description:
        "A narrative of Captain Ahab's obsessive quest to avenge the giant white whale that bit off his leg.",
    },
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
            books={books}
          />
        </div>
      }
    />
  );
};
