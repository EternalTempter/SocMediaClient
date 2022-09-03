import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { IMessage } from '../../../models';

export const messagesApi = createApi({
    reducerPath: 'messages/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/'
    }),
    endpoints: build => ({
        getMessages: build.query<IMessage[], {}>({
            query: (usersId: {}) => ({
                url: 'messages/getAll',
                params: usersId
            })
        }),
        postMessage: build.mutation<IMessage[], {}>({
            query: (message: {}) => ({
                url: 'messages/create',
                method: 'post',
                body: message
            })
        }),
    })
})

export const {useGetMessagesQuery, usePostMessageMutation} = messagesApi;