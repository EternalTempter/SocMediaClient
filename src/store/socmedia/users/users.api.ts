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
    })
})

export const { 
    useAuthorizeMutation, 
    useRegistrateMutation, 
    useGetUserByEmailQuery, 
    useLazyGetUserByEmailQuery, 
    useFindAllUsersByNameQuery, 
    useLazyGetAllUsersQuery
} = usersApi;