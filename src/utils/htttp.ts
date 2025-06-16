import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { Author, Book } from "../types";

axios.defaults.baseURL = "https://localhost:8080";
axios.defaults.headers.post["Content-type"] = "application/json";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export const getAuthToken = () => {
  return localStorage.getItem("auth_token");
};

export const setAuthToken = (token: string) => {
  localStorage.setItem("auth_token", token);
};

export const backendRequest = <T, D = undefined>(
  method: HttpMethod,
  url: string,
  data?: D
): Promise<AxiosResponse<T>> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const authToken = getAuthToken();
  if (authToken && authToken !== "null") {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const config: AxiosRequestConfig<D> = {
    method,
    headers,
    url,
    ...(method !== "GET" && method !== "DELETE" && { data }),
  };
  return axios(config);
};

export const getAuthors = async () => {
  const authors = await backendRequest<Author[]>(
    "GET",
    "http://localhost:8080/authors"
  );
  return authors?.data ?? [];
};

export const getBooks = async () => {
  const books = await backendRequest<Book[]>(
    "GET",
    "http://localhost:8080/books"
  );
  return books?.data ?? [];
};
