import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../../../envVariables/variables";

export const groupUsersApi = createApi({
    reducerPath: 'groupUsers/api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + 'api/groupUser/'
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
        }),
        getGroupSubsCount: build.query<any, string>({
            query: (group_id: string) => ({
                url: 'getGroupSubsCount',
                params: {
                    group_id: group_id
                }
            }),
        })
    })
})

export const {
    useGetAllGroupSubscribersQuery,
    useLazySubscribeOnGroupQuery, 
    useUnsubscribeOnGroupMutation, 
    useGetUserGroupSubsCountQuery,
    useGetGroupSubsCountQuery
} = groupUsersApi;