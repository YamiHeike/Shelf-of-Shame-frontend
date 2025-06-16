import { useEffect, useState } from "react";
import {
  FooterText,
  Header,
  AddBookForm,
  AddExistingBookForm,
} from "../components";
import { Genre } from "../types";
import { AuthPage } from "./AuthPage";
import { useAppDispatch, useAppSelector } from "../hooks/redux_utils";
import { fetchAuthors } from "../store/authorThunks";
import { FormValidationContextProvider } from "../components/BookForm/FormValidationContext";
import { fetchBooks } from "../store/bookThunks";
import { fetchGenres } from "../store/genreThunk";

const genres: Genre[] = [
  { id: 1, name: "Fiction" },
  { id: 2, name: "Non-Fiction" },
  { id: 3, name: "Science Fiction" },
  { id: 4, name: "Fantasy" },
];

export const AddBookPage = () => {
  const [isBookNotFound, setIsBookNotFound] = useState(false);
  const dispatch = useAppDispatch();
  const {
    list: authorList,
    loading: authorLoading,
    error: authorError,
  } = useAppSelector((state) => state.authors);
  const {
    list: bookList,
    loading: bookLoading,
    error: bookError,
  } = useAppSelector((state) => state.books);

  const {
    list: genresLit,
    loading: genresLoading,
    error: genresError,
  } = useAppSelector((state) => state.genres);

  const handleToggle = () => {
    setIsBookNotFound((prev) => !prev);
  };

  useEffect(() => {
    dispatch(fetchAuthors());
    dispatch(fetchBooks());
    dispatch(fetchGenres());
  }, [dispatch]);

  // TODO: Loader component
  if (authorLoading || bookLoading || genresLoading) {
    return <p>Loading...</p>;
  }

  // TODO: Error component

  if (authorError || bookError || genresError) {
    return (
      <>
        {authorError && <p>{authorError}</p>}
        {bookError && <p>{bookError}</p>}
        {genresError && <p>{genresError}</p>}
      </>
    );
  }

  return (
    <FormValidationContextProvider>
      <AuthPage
        Page={
          <div style={{ padding: "24px" }}>
            <div
              style={{
                padding: "1.5rem",
                width: "90%",
                maxWidth: !isBookNotFound ? "50rem" : "70rem",
                margin: "0 auto",
              }}
            >
              <Header level={3} text="Add Book to Your Shelf" />
              {isBookNotFound ? (
                <AddBookForm
                  authors={authorList}
                  genres={genresLit}
                  onToggle={handleToggle}
                  isBookNotFound={isBookNotFound}
                />
              ) : (
                <AddExistingBookForm
                  isBookNotFound={isBookNotFound}
                  onToggle={handleToggle}
                  books={bookList}
                />
              )}

              <FooterText text="Tracking all of your unread books makes creating a reading plan way easier! ✨" />
            </div>
          </div>
        }
      />
    </FormValidationContextProvider>
  );
};
