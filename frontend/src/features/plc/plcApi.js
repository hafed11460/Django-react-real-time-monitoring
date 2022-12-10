import { createApi } from "@reduxjs/toolkit/query/react";
// import axiosInstance, { setAxiosAuthToken } from "../../Utils/axios";
import { axiosBaseQuery } from "../axiosBaseQuery";


const plc_root = '/plcs'

export const plcApi = createApi({
    reducerPath: 'plcApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Plc'],
    endpoints: (builder) => ({
        getPlcs: builder.query({
            query: () => {
                return {
                    url: `${plc_root}/`,
                    method: "get",
                    data: {},
                };
            },
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                    [
                        ...result.map(({ id }) => ({ type: 'Plcs', id })),
                        { type: 'Plcs', id: 'LIST' },
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    [{ type: 'Plcs', id: 'LIST' }],
        }),

        addPlc: builder.mutation({
            query: (body) => {
                return {
                    url: `${plc_root}/`,
                    method: 'POST',
                    data: body,
                };
            },
            invalidatesTags: ["Plcs"]
            // invalidatesTags: [{ type: 'Plcs', id: 'LIST' }],
        })
    })
})

export const {
    useGetPlcsQuery,
    useAddPlcMutation,
} = plcApi