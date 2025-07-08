import { Header, BookFormPanel } from "../components";
import { AuthPage } from "./AuthPage";
import { FormValidationContextProvider } from "../components/BookForm/FormValidationContext";
import { Typography } from "antd";
import { useLibraryData } from "../hooks";

export const AddBookPage = () => {
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

  const isLoading = authorLoading || bookLoading || genresLoading;
  const isError = authorError || bookError || genresError;

  let content: React.ReactNode;

  // TODO: Loader & Error component
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = (
      <>
        {authorError && <p>{authorError}</p>}
        {bookError && <p>{bookError}</p>}
        {genresError && <p>{genresError}</p>}
      </>
    );
  } else {
    content = (
      <BookFormPanel
        authorList={authorList}
        bookList={bookList}
        genresList={genresList}
      />
    );
  }

  // TODO: move into separate component
  if (!genresLoading && genresList.length === 0) {
    content = (
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
      <AuthPage Page={<div style={{ padding: "24px" }}>{content}</div>} />
    </FormValidationContextProvider>
  );
};
