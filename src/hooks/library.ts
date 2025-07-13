import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux_utils";
import { fetchAuthors } from "../store/authorThunks";
import { fetchBooks } from "../store/bookThunks";
import { fetchGenres } from "../store/genreThunk";

export const useLibraryData = () => {
  const dispatch = useAppDispatch();
  const authors = useAppSelector((state) => state.authors);
  const books = useAppSelector((state) => state.books);
  const genres = useAppSelector((state) => state.genres);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        await Promise.all([
          dispatch(fetchAuthors()),
          dispatch(fetchBooks()),
          dispatch(fetchGenres()),
        ]);
      } catch (err: any) {
        console.error("Failed to fetch library data");
      }
    };
    fetchAll();
  }, [dispatch]);

  return { authors, books, genres };
};
