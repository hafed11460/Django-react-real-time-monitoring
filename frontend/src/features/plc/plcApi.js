// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from 'features/baseUrl'

export const plcApi = createApi({
  reducerPath: 'plcApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Plcs'],
  endpoints: (builder) => ({
    getPlcs: builder.query({
      query: () => 'plcs/',
      providesTags: (result) =>
      result ? result.map(({ id }) => ({ type: 'Plcs', id })) : ['Plcs'],
    }),
    getPlc: builder.query({
      query: (id) => `plcs/${id}`,
      providesTags: (result, error, id) => [{ type: 'Plcs', id }],
    }),
    addPlc: builder.mutation({
      query: (body) => ({
        url: `plcs/`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Plcs']
    }),
    updatePlc: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `plcs/${id}/`,
          method: 'PUT',
          body: body
      }),
      invalidatesTags: ['Plcs']
    }),
    deletePlc: builder.mutation({
      query: ({ id}) => ({
        url: `plcs/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Plcs']
    }),
  }),
})

export const {
  useGetPlcsQuery,
  useAddPlcMutation,
  useGetPlcQuery,
  useUpdatePlcMutation,
  useDeletePlcMutation,
} = plcApi
