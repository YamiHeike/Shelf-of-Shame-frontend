import {
  BookFormPanel,
  ErrorMessage,
  FeatureUnavailableNotice,
} from "../components";
import { AuthPage } from "./AuthPage";
import { FormValidationContextProvider } from "../components/BookForm/FormValidationContext";
import { useLibraryData } from "../hooks";
import { Loading } from "../ui/Loading";

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
    content = <Loading fullscreen />;
  } else if (isError) {
    content = <ErrorMessage fullscreen />;
  } else if (!genresLoading && genresList.length === 0) {
    content = (
      <FeatureUnavailableNotice
        title="Adding Books Unavailable"
        message="Functionality currently unavailable, try again later"
      />
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

  return (
    <FormValidationContextProvider>
      <AuthPage
        Page={
          <div style={{ padding: isLoading || isError ? 0 : "24px" }}>
            {content}
          </div>
        }
      />
    </FormValidationContextProvider>
  );
};
