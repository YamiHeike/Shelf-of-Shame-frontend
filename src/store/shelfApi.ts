import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PageParams, PaginatedData, UserShelfItemRecord } from "../types";

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
    getShelfPage: builder.query<PaginatedData<UserShelfItemRecord>, PageParams>(
      {
        query: ({ page = 0, size = 20 }: PageParams) => ({
          url: "shelf/pages",
          params: { page, size },
        }),
        providesTags: ["Shelf"],
      }
    ),
    getShelfItem: builder.query<UserShelfItemRecord, number>({
      query: (id: number) => ({
        url: `/shelf/${id}`,
      }),
    }),
  }),
});

export const { useGetShelfQuery, useGetShelfPageQuery, useGetShelfItemQuery } =
  shelfApi;
