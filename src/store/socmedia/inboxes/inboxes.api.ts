import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { IInbox } from '../../../models';

export const inboxesApi = createApi({
    reducerPath: 'inboxes/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://80.78.245.233:5000/api/inbox/'
    }),
    endpoints: build => ({
        getUserInboxes: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'get',
                params: params
            })
        }),
        updateLastInboxMessage: build.mutation<IInbox[], {}>({
            query: (updatedMessage: {}) => ({
                url: 'updateLastMessage',
                method: 'put',
                body: updatedMessage
            })
        }),
        createInbox: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'create',
                method: 'post',
                body: body
            })
        }),
        getInbox: build.query<IInbox, {}>({
            query: (params: {}) => ({
                url: 'getInbox',
                params: params
            })
        }),
    })
})

export const {
    useLazyGetUserInboxesQuery, 
    useGetUserInboxesQuery, 
    useUpdateLastInboxMessageMutation, 
    useCreateInboxMutation, 
    useGetInboxQuery
} = inboxesApi;