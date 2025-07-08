import { useState } from "react";
import { FooterText, Header } from "../../ui";
import { AddBookForm } from "./AddBookForm";
import { AddExistingBookForm } from "./AddExistingBookForm";
import { Author, Book, Genre } from "../../types";

type BookFormPanelProps = {
  authorList: Author[];
  bookList: Book[];
  genresList: Genre[];
};

export const BookFormPanel = ({
  authorList,
  bookList,
  genresList,
}: BookFormPanelProps) => {
  const [isBookNotFound, setIsBookNotFound] = useState(false);
  const handleToggle = () => {
    setIsBookNotFound((prev) => !prev);
  };

  return (
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
  );
};
