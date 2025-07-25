import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserShelfItemRecord } from "../types";

export const shelfApi = createApi({
  reducerPath: "shelfApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Shelf"],
  endpoints: (builder) => ({
    getShelf: builder.query<UserShelfItemRecord[], void>({
      query: () => "shelf",
      providesTags: ["Shelf"],
    }),
  }),
});

export const { useGetShelfQuery } = shelfApi;
