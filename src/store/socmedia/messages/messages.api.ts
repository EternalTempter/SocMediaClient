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
                params: usersId
            })
        }),
        postMessage: build.mutation<IMessage[], {}>({
            query: (message: {}) => ({
                url: 'create',
                method: 'post',
                body: message
            })
        }),
        updateMessage: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateMessage',
                method: 'put',
                body: body
            })
        }),
        deleteMessage: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'deleteMessage',
                method: 'delete',
                body: body
            })
        }),
        findMessages: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'findMessages',
                params: params
            })
        }),
        updateView: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateView',
                method: 'put',
                body: body
            })
        }),
        getMessagesCount: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'getMessagesCount',
                params: params
            })
        }),
        getAllUserMessagesCount: build.query<any, string>({
            query: (user_id: string) => ({
                url: 'getAllUserMessagesCount',
                params: {
                    user_id: user_id
                }
            })
        }),
        checkForNewMessages: build.query<any, string>({
            query: (user_id: string) => ({
                url: 'checkForNewMessages',
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