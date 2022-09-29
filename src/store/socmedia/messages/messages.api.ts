import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { IMessage } from '../../../models';

export const messagesApi = createApi({
    reducerPath: 'messages/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://80.78.245.233:5000/api/messages/'
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
    })
})

export const {
    useGetMessagesQuery, 
    usePostMessageMutation, 
    useUpdateMessageMutation, 
    useDeleteMessageMutation, 
    useFindMessagesQuery
} = messagesApi;