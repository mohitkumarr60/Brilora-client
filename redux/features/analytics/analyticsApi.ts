import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseAnalytics: builder.query({
      query: () => ({
        url: 'get-course-analytics',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    getUsersAnalytics: builder.query({
      query: () => ({
        url: 'get-user-analytics',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    getOrdersAnalytics: builder.query({
      query: () => ({
        url: 'get-order-analytics',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    getTotalUsers: builder.query({
      query: () => ({
        url: 'get-total-users',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    getTotalOrders: builder.query({
      query: () => ({
        url: 'get-total-orders',
        method: 'GET',
        credentials: 'include' as const,
      }),
    })
  })
})

export const { useGetCourseAnalyticsQuery, useGetUsersAnalyticsQuery, useGetTotalOrdersQuery, useGetTotalUsersQuery, useGetOrdersAnalyticsQuery } = analyticsApi;