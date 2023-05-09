import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../../../envVariables/variables";

export const reportsApi = createApi({
    reducerPath: 'reports/api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + 'api/report/'
    }),
    endpoints: build => ({
        getAll: build.query<any, string>({
            query: () => ({
                url: 'getAll',
                headers: {'auth-token': localStorage.getItem('token')!},
            })
        }),
        create: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'create',
                method: 'post',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        deleteById: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'deleteById',
                method: 'delete',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
    })
});

export const {
    useGetAllQuery,
    useCreateMutation,
    useDeleteByIdMutation
} = reportsApi;