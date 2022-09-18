import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IToken, IUser } from '../../../models';

export const usersApi = createApi({
    reducerPath: 'socmedia/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/'
    }),
    endpoints: build => ({
        registrate: build.mutation<IToken, IUser>({
            query: (user: IUser) => ({
                url: 'user/registration',
                method: 'post',
                body: user
            })
        }),      
        authorize: build.mutation<IToken, {}>({
            query: (user: {}) => ({
                url: 'user/login',
                method: 'post',
                body: user
            })
        }),
        getUserByEmail: build.query<IUser, string>({
            query: (email: string) => ({
                url: 'user/getByEmail',
                params: {
                    email: email
                }
            })
        }),
        findAllUsersByName: build.query<IUser[], string>({
            query: (name: string) => ({
                url: 'user/findAllByName',
                params: {
                    queryParameter: name
                }
            })
        }),
        getAllUsers: build.query<IUser[], void>({
            query: () => ({
                url: 'user/getAll',
            })
        }),
    })
})

export const { useAuthorizeMutation, useRegistrateMutation, useGetUserByEmailQuery, useLazyGetUserByEmailQuery, useFindAllUsersByNameQuery, useLazyGetAllUsersQuery} = usersApi;