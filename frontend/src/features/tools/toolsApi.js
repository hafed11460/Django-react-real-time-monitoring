import { createApi } from "@reduxjs/toolkit/query/react";
// import axiosInstance, { setAxiosAuthToken } from "../../Utils/axios";
import { axiosBaseQuery } from "../axiosBaseQuery";


const switchs_root = '/switchs'

export const toolsApi = createApi({
    reducerPath: "toolsApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        loadBackup: builder.mutation({
            query: (body) => {
                console.log(body)
                return {
                    url: `${switchs_root}/backup/`,
                    method: "get",
                    data: {},
                };
            },
        }),

    })
})

export const {
    useLoadBackupMutation,
} = toolsApi