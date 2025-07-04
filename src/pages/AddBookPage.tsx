import { useState } from "react";
import {
  FooterText,
  Header,
  AddBookForm,
  AddExistingBookForm,
} from "../components";
import { AuthPage } from "./AuthPage";
import { FormValidationContextProvider } from "../components/BookForm/FormValidationContext";
import { Typography } from "antd";
import { useLibraryData } from "../hooks";

export const AddBookPage = () => {
  const [isBookNotFound, setIsBookNotFound] = useState(false);
  const { authors, books, genres } = useLibraryData();

  const {
    list: authorList,
    loading: authorLoading,
    error: authorError,
  } = authors;
  const { list: bookList, loading: bookLoading, error: bookError } = books;
  const {
    list: genresList,
    loading: genresLoading,
    error: genresError,
  } = genres;

  const handleToggle = () => {
    setIsBookNotFound((prev) => !prev);
  };

  const isLoading = authorLoading || bookLoading || genresLoading;
  const isError = authorError || bookError || genresError;

  // TODO: Loader component
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // TODO: Error component

  if (isError) {
    return (
      <>
        {authorError && <p>{authorError}</p>}
        {bookError && <p>{bookError}</p>}
        {genresError && <p>{genresError}</p>}
      </>
    );
  }

  if (!genresLoading && genresList.length === 0) {
    return (
      <>
        <Header level={3} text="Adding Books Unavailable" />
        <Typography.Paragraph>
          Functionality currently unavailable, try again later
        </Typography.Paragraph>
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
              {isBookNotFound || bookList.length === 0 ? (
                <AddBookForm
                  authors={authorList}
                  genres={genresList}
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
