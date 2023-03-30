import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../../../envVariables/variables";

export const newsApi = createApi({
    reducerPath: 'news/api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + 'api/news/'
    }),
    endpoints: build => ({
        getAll: build.query<any, string>({
            query: () => ({
                url: 'getAll',
            })
        }),
        create: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'create',
                method: 'post',
                body: body
            })
        }),
        deleteById: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'deleteById',
                method: 'delete',
                body: body
            })
        }),
    })
});

export const {
    useGetAllQuery,
    useCreateMutation,
    useDeleteByIdMutation
} = newsApi;