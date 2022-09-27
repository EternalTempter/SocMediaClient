import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const userDataApi = createApi({
    reducerPath: 'userData/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/userData/'
    }),
    endpoints: build => ({
        getUserData: build.query<any, string>({
            query: (id: string) => ({
                url: 'getOne',
                params: {
                    id: id
                }
            })
        }),
        setDefaultUserData: build.query<any, string>({
            query: (id: string) => ({
                url: 'setDefaultData',
                params: {
                    id: id
                }
            })
        }),
        changeUserStatus: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateStatus',
                method: 'put',
                body: body
            })
        }),
        changeUserCity: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateCity',
                method: 'put',
                body: body
            })
        }),
        changeUserDateBirth: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateDateBirth',
                method: 'put',
                body: body
            })
        }),
        updateImage: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateImage',
                method: 'put',
                body: body
            })
        }),
        updatePanoramaImage: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updatePanoramaImage',
                method: 'put',
                body: body
            })
        })
    })
});

export const {
    useGetUserDataQuery,
    useLazySetDefaultUserDataQuery,
    useChangeUserCityMutation,
    useChangeUserDateBirthMutation,
    useChangeUserStatusMutation,
    useUpdateImageMutation,
    useUpdatePanoramaImageMutation,
    useLazyGetUserDataQuery
} = userDataApi;