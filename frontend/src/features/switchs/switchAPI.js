import { createApi } from "@reduxjs/toolkit/query/react";
// import axiosInstance, { setAxiosAuthToken } from "../../Utils/axios";
import { axiosBaseQuery } from "../axiosBaseQuery";


const switchs_root = '/switchs'

export const switchApi = createApi({
    reducerPath: "switchApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({

        switchBackup: builder.mutation({
            query: ({switch_id}) => {
                return {
                    url: `${switchs_root}/backup/${switch_id}/`,
                    method: "get",
                    data: {},
                };
            },
        }),
        createService: builder.mutation({
            query: (body) => {
                console.log(body)
                return {
                    url: `${switchs_root}/create/`,
                    method: "post",
                    data: body,
                };
            },
        }),
        switchsEnvironmentsList: builder.query({
            query: () => {
                return {
                    url: `${switchs_root}/environments/`,
                    method: "get",
                    data: {},
                };
            },
        }),
        // switchEnvironmentHistory: builder.query({
        //     query: (body) => {
        //         return {
        //         url: `${switchs_root}/${body.id}/history/?date=2022-08-03`,
        //         method: "get",
        //         data:{},
        //         };
        //     },
        // }),
        switchEnvironmentHistory: builder.mutation({
            query: (body) => {
                return {
                    url: `${switchs_root}/${body.id}/history/?date=${body.date}`,
                    method: "get",
                    data: {},
                };
            },
        }),
        getSwitchsList: builder.query({
            query: () => {
                return {
                    url: `${switchs_root}/`,
                    method: "get",
                    data: {},
                };
            },
        }),
        getUserService: builder.query({
            query: (id) => {
                return {
                    url: `${switchs_root}/${id}/edit/`,
                    method: "get",
                    data: {},
                };
            },
        }),
        updateUserService: builder.mutation({
            query: ({ id, body }) => {
                return {
                    url: `${switchs_root}/${id}/edit/`,
                    method: "PUT",
                    data: body,
                };
            },
        }),

        getServiceById: builder.query({
            query: (id) => {
                return {
                    url: `${switchs_root}/${id}`,
                    method: "get",
                    data: {},
                };
            },
        }),
    })
})

export const {
    useSwitchBackupMutation,
    useCreateServiceMutation,
    useSwitchsEnvironmentsListQuery,
    useGetSwitchsListQuery,
    // useSwitchEnvironmentHistoryQuery,
    useSwitchEnvironmentHistoryMutation,
    // useUserServicesListQuery,
    useGetUserServiceQuery,
    useUpdateUserServiceMutation,
    useGetServiceByIdQuery,

} = switchApi