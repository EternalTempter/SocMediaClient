import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { IMessage } from '../../../models';
import { baseUrl } from "../../../envVariables/variables";

export const messagesApi = createApi({
    reducerPath: 'messages/api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + 'api/messages/'
    }),
    endpoints: build => ({
        getMessages: build.query<any, {}>({
            query: (usersId: {}) => ({
                url: 'getAll',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: usersId
            })
        }),
        postMessage: build.mutation<IMessage[], {}>({
            query: (message: {}) => ({
                url: 'create',
                method: 'post',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: message
            })
        }),
        updateMessage: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateMessage',
                method: 'put',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        deleteMessage: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'deleteMessage',
                method: 'delete',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        findMessages: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'findMessages',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: params
            })
        }),
        updateView: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateView',
                method: 'put',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        getMessagesCount: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'getMessagesCount',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: params
            })
        }),
        getAllUserMessagesCount: build.query<any, string>({
            query: (user_id: string) => ({
                url: 'getAllUserMessagesCount',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: {
                    user_id: user_id
                }
            })
        }),
        checkForNewMessages: build.query<any, string>({
            query: (user_id: string) => ({
                url: 'checkForNewMessages',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: {
                    user_id: user_id
                }
            })
        }),
    })
})

export const {
    useGetMessagesQuery, 
    usePostMessageMutation, 
    useUpdateMessageMutation, 
    useDeleteMessageMutation, 
    useFindMessagesQuery,
    useUpdateViewMutation,
    useLazyGetMessagesQuery,
    useGetMessagesCountQuery,
    useGetAllUserMessagesCountQuery,
    useCheckForNewMessagesQuery
} = messagesApi;