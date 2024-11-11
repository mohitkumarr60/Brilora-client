import { apiSlice } from "../api/apiSlice";

const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "get-admin-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getUsersAllCourses: builder.query({
      query: () => ({
        url: "get-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseContent: builder.query({
      query: (id) => ({
        url: `get-course-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getFeaturedCourse: builder.query({
      query: () => ({
        url: `get-featured`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    addFeaturedCourse: builder.mutation({
      query: (data) => ({
        url: `edit-featured`,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    deleteFeaturedCourse: builder.mutation({
      query: (data) => ({
        url: `delete-featured`,
        method: "DELETE",
        body: data,
        credentials: "include" as const,
      }),
    }),
    addNewQuestion: builder.mutation({
      query: ({ question, courseId, contentId }) => ({
        url: `add-question`,
        method: "PUT",
        body: { question, courseId, contentId },
        credentials: "include" as const,
      }),
    }),
    addAnswerInQuestion: builder.mutation({
      query: ({ answer, courseId, contentId, questionId }) => ({
        url: `add-answer`,
        method: "PUT",
        body: { answer, courseId, contentId, questionId },
        credentials: "include" as const,
      }),
    }),
    addReview: builder.mutation({
      query: ({ review, rating, courseId }) => ({
        url: `add-review/${courseId}`,
        method: "PUT",
        body: { review, rating },
        credentials: "include" as const,
      }),
    }),
    addReply: builder.mutation({
      query: ({ comment, courseId, reviewId }) => ({
        url: `add-reply`,
        method: "PUT",
        body: { comment, courseId, reviewId },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useCreateCourseMutation,
  useGetCourseContentQuery, useAddReplyMutation, useAddReviewMutation, useAddAnswerInQuestionMutation, useGetCourseDetailsQuery, useGetAllCoursesQuery, useGetUsersAllCoursesQuery, useDeleteCourseMutation, useEditCourseMutation, useGetFeaturedCourseQuery, useAddFeaturedCourseMutation, useDeleteFeaturedCourseMutation, useAddNewQuestionMutation } = courseApi;