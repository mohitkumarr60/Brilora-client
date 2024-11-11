import { apiSlice } from "../api/apiSlice";

const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (type) => ({
        url: "get-orders",
        method: "GET",
        credentials: "include",
      }),
    }),

  }),
});

export const { useGetAllOrdersQuery } = ordersApi;