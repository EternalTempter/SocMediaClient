import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../../../envVariables/variables";

export const userDataApi = createApi({
    reducerPath: 'userData/api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + 'api/userData/'
    }),
    endpoints: build => ({
        getUserData: build.query<any, string>({
            query: (id: string) => ({
                url: 'getOne',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: {
                    id: id
                }
            })
        }),
        setDefaultUserData: build.query<any, string>({
            query: (id: string) => ({
                url: 'setDefaultData',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: {
                    id: id
                }
            })
        }),
        changeUserStatus: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateStatus',
                method: 'put',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        changeUserCity: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateCity',
                method: 'put',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        changeUserDateBirth: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateDateBirth',
                method: 'put',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        changeUserName: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateName',
                method: 'put',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        changeUserSurname: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateSurname',
                method: 'put',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        updateImage: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateImage',
                method: 'put',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        updatePanoramaImage: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updatePanoramaImage',
                method: 'put',
                headers: {'auth-token': localStorage.getItem('token')!},
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
    useLazyGetUserDataQuery,
    useChangeUserNameMutation,
    useChangeUserSurnameMutation
} = userDataApi;