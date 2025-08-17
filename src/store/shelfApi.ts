import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  EditShelfItemDto,
  PageParams,
  PaginatedData,
  RecommendationsFilter,
  ShelfItemFilter,
  UserShelfItemRecord,
} from "../types";

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
        query: ({
          page = 0,
          size = 20,
          status,
          difficultyMin,
          difficultyMax,
          genres,
        }: PageParams & ShelfItemFilter) => {
          const params: PageParams & ShelfItemFilter = { page, size };
          if (status) params.status = status;
          if (difficultyMin) params.difficultyMin = difficultyMin;
          if (difficultyMax) params.difficultyMax = difficultyMax;
          if (genres && genres.length > 0) params.genres = genres;
          return {
            url: "shelf/pages",
            params,
          };
        },
        providesTags: ["Shelf"],
      }
    ),
    getShelfItem: builder.query<UserShelfItemRecord, number>({
      query: (id: number) => ({
        url: `/shelf/${id}`,
      }),
      providesTags: ["Shelf"],
    }),
    getRecommendations: builder.query<
      UserShelfItemRecord[],
      RecommendationsFilter & { limit: number }
    >({
      query: ({
        difficultyMin,
        difficultyMax,
        genres,
        limit,
      }: ShelfItemFilter & { limit: number }) => ({
        url: "/shelf/recommendations",
        params: {
          difficultyMin,
          difficultyMax,
          genres,
          limit,
        },
      }),
    }),

    markAsRead: builder.mutation<UserShelfItemRecord, number>({
      query: (id: number) => ({
        url: `/shelf/${id}`,
        method: "PATCH",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(shelfApi.util.invalidateTags(["Shelf"]));
        } catch {}
      },
    }),
    editShelfItemDetails: builder.mutation<
      UserShelfItemRecord,
      {
        id: number;
        body: EditShelfItemDto;
      }
    >({
      query: ({ id, body }) => ({
        url: `shelf/${id}/edit-details`,
        method: "PATCH",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(shelfApi.util.invalidateTags(["Shelf"]));
        } catch {}
      },
    }),
    deleteShelfItem: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `shelf/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(shelfApi.util.invalidateTags(["Shelf"]));
        } catch {}
      },
    }),
  }),
});

export const {
  useGetShelfQuery,
  useGetShelfPageQuery,
  useGetShelfItemQuery,
  useGetRecommendationsQuery,
  useMarkAsReadMutation,
  useEditShelfItemDetailsMutation,
  useDeleteShelfItemMutation,
} = shelfApi;
