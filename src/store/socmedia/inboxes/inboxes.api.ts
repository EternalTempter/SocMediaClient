import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { IInbox } from '../../../models';
import { baseUrl } from "../../../envVariables/variables";

export const inboxesApi = createApi({
    reducerPath: 'inboxes/api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + 'api/inbox/'
    }),
    endpoints: build => ({
        getUserInboxes: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'get',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: params
            })
        }),
        updateLastInboxMessage: build.mutation<IInbox[], {}>({
            query: (updatedMessage: {}) => ({
                url: 'updateLastMessage',
                method: 'put',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: updatedMessage
            })
        }),
        createInbox: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'create',
                method: 'post',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        getInbox: build.query<IInbox, {}>({
            query: (params: {}) => ({
                url: 'getInbox',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: params
            })
        }),
        updateLastMessageView: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateLastMessageView',
                method: 'put',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
    })
})

export const {
    useLazyGetUserInboxesQuery, 
    useGetUserInboxesQuery, 
    useUpdateLastInboxMessageMutation, 
    useCreateInboxMutation, 
    useGetInboxQuery,
    useUpdateLastMessageViewMutation
} = inboxesApi;