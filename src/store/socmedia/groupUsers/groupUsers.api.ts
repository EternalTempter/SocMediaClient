import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const groupUsersApi = createApi({
    reducerPath: 'groupUsers/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/groupUser/'
    }),
    endpoints: build => ({
        getAllGroupSubscribers: build.query<any, string>({
            query: (group_id: string) => ({
                url: 'getAllSubscribers',
                params: {
                    group_id
                }
            }),
        }),
        subscribeOnGroup: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'subscribe',
                params: params
            })
        }),
        unsubscribeOnGroup: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'unsubscribe',
                method: 'delete',
                body: body
            })
        }),
        getUserGroupSubsCount: build.query<any, string>({
            query: (id: string) => ({
                url: 'getUserGroupSubsCount',
                params: {
                    id: id
                }
            }),
        })
    })
})

export const {
    useGetAllGroupSubscribersQuery,
    useLazySubscribeOnGroupQuery, 
    useUnsubscribeOnGroupMutation, 
    useGetUserGroupSubsCountQuery
} = groupUsersApi;