import { Author } from "../types";

export const reset = (val: string | null) => {
  if (val) {
    val = null;
  }
};

export const toProperCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const truncate = (text: string, maxLength: number) =>
  text.length > maxLength ? text.slice(0, maxLength).trimEnd() + "…" : text;

export const retrieveAuthors = (authors: Author[]) => {
  return authors.map((a) => `${a.firstName} ${a.lastName}`).join(", ");
};
