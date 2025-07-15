import { useState } from "react";
import { motion } from "motion/react";
import { FooterText, Header } from "../../ui";
import { AddBookForm } from "./AddBookForm";
import { AddExistingBookForm } from "./AddExistingBookForm";
import { Author, Book, Genre } from "../../types";
import { CoverPreviewContextProvider } from "./CoverPreviewContext";

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
    <CoverPreviewContextProvider>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
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
      </motion.div>
    </CoverPreviewContextProvider>
  );
};
