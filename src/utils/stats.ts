import { BookOutline, Status, UserShelfItemRecord } from "../types";

export const getStats = (data: UserShelfItemRecord[]) => {
  const unreadBooks = data.filter(
    (item) => item.status !== Status.GLORY
  ).length;
  const booksFinished = data.length - unreadBooks;
  const longestBookItemData = data.reduce((max, current) =>
    current.book.numberOfPages > max.book.numberOfPages ? current : max
  );
  const longestBook = data
    ? `${longestBookItemData.book.title} (${longestBookItemData.book.numberOfPages} pages)`
    : "-";

  const genreCounts: Record<number, number> = {};
  let maxCount = 0;
  let maxCountGenreName;

  for (const item of data) {
    for (const genre of item.book.genres) {
      if (!genreCounts[genre.id]) {
        genreCounts[genre.id] = 0;
      }
      genreCounts[genre.id]++;
      if (genreCounts[genre.id] > maxCount) {
        maxCount = genreCounts[genre.id];
        maxCountGenreName = genre.name;
      }
    }
  }

  const favoriteGenre = maxCountGenreName ? maxCountGenreName : "-";

  return {
    unreadBooks,
    booksFinished,
    longestBook,
    favoriteGenre,
  };
};

export const getCurrentReads = (data: UserShelfItemRecord[]): BookOutline[] => {
  return data
    .filter((item) => item.status === Status.READING)
    .map((item) => ({
      title: item.book.title,
      authors: item.book.authors,
      numberOfPages: item.book.numberOfPages,
    }));
};
