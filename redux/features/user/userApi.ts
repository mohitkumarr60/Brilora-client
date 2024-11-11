import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "update-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      })
    }),
    editProfile: builder.mutation({
      query: ({ name }) => ({
        url: "update-user-info",
        method: "PUT",
        body: { name },
        credentials: "include" as const,
      })
    }),
    updateUserPassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "update-user-password",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      })
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "get-users",
        method: "GET",
        credentials: "include" as const,
      })
    }),
    updateUserRole: builder.mutation({
      query: ({
        email, role
      }) => ({
        url: "update-user-role",
        method: "PUT",
        body: { email, role },
        credentials: "include" as const,
      })
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      })
    }),
    markModuleComplete: builder.mutation({
      query: ({ courseId, moduleId }) => ({
        url: "mark-complete",
        method: "PUT",
        body: { courseId, moduleId },
        credentials: "include" as const,
      })
    }),
    markModuleInComplete: builder.mutation({
      query: ({ courseId, moduleId }) => ({
        url: "mark-incomplete",
        method: "PUT",
        body: { courseId, moduleId },
        credentials: "include" as const,
      })
    }),
    getCourseProgress: builder.query({
      query: (courseId) => ({
        url: `course-progress/${courseId}`,
        method: "GET",
        credentials: "include" as const,
      })
    })
  })
});

export const { useUpdateAvatarMutation, useEditProfileMutation, useUpdateUserPasswordMutation, useGetAllUsersQuery, useUpdateUserRoleMutation, useDeleteUserMutation, useMarkModuleCompleteMutation, useMarkModuleInCompleteMutation, useGetCourseProgressQuery } = userApi;