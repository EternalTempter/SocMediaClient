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