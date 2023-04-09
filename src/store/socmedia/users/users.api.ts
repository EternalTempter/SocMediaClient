import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IToken, IUser } from '../../../models';
import { baseUrl } from "../../../envVariables/variables";

export const usersApi = createApi({
    reducerPath: 'socmedia/api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + 'api/user/'
    }),
    endpoints: build => ({
        registrate: build.mutation<IToken, IUser>({
            query: (user: IUser) => ({
                url: 'registration',
                method: 'post',
                body: user
            })
        }),      
        authorize: build.mutation<IToken, {}>({
            query: (user: {}) => ({
                url: 'login',
                method: 'post',
                body: user
            })
        }),
        getUserByEmail: build.query<IUser, string>({
            query: (email: string) => ({
                url: 'getByEmail',
                params: {
                    email: email
                }
            })
        }),
        getById: build.query<IUser, string>({
            query: (id: string) => ({
                url: 'getById',
                params: {
                    id: id
                }
            })
        }),
        findAllUsersByName: build.query<IUser[], string>({
            query: (name: string) => ({
                url: 'findAllByName',
                params: {
                    queryParameter: name
                }
            })
        }),
        getAllUsers: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'getAll',
                params: params
            })
        }),
        deleteComment: build.mutation<any, {}>({
            query: (obj: {}) => ({
                url: 'deleteComment',
                method: 'delete',
                body: obj
            })
        }),
        deleteUserByEmail: build.mutation<any, {}>({
            query: (obj: {}) => ({
                url: 'deleteComment',
                method: 'delete',
                body: obj
            })
        }),
        changeUserRole: build.mutation<any, {}>({
            query: (obj: {}) => ({
                url: 'changeUserRole',
                method: 'put',
                body: obj
            })
        }),
    })
})

export const { 
    useAuthorizeMutation, 
    useRegistrateMutation, 
    useGetUserByEmailQuery, 
    useLazyGetUserByEmailQuery, 
    useFindAllUsersByNameQuery, 
    useLazyGetAllUsersQuery,
    useLazyGetByIdQuery,
    useDeleteUserByEmailMutation,
    useChangeUserRoleMutation
} = usersApi;