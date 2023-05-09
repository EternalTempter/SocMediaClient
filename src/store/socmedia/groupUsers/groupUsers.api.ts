import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../../../envVariables/variables";
import { IGroupUsers } from "../../../models";

export const groupUsersApi = createApi({
    reducerPath: 'groupUsers/api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + 'api/groupUser/'
    }),
    endpoints: build => ({
        getAllGroupSubscribers: build.query<any, string>({
            query: (group_id: string) => ({
                url: 'getAllSubscribers',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: {
                    group_id
                }
            }),
        }),
        subscribeOnGroup: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'subscribe',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: params
            })
        }),
        unsubscribeOnGroup: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'unsubscribe',
                method: 'delete',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        getUserGroupSubsCount: build.query<any, string>({
            query: (id: string) => ({
                url: 'getUserGroupSubsCount',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: {
                    id: id
                }
            }),
        }),
        getGroupSubsCount: build.query<any, string>({
            query: (group_id: string) => ({
                url: 'getGroupSubsCount',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: {
                    group_id: group_id
                }
            }),
        }),
        getFirstGroupSubs: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'getFirstGroupSubs',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: params
            }),
        }),
        getGroupUser: build.query<IGroupUsers, {}>({
            query: (params: {}) => ({
                url: 'getGroupUser',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: params
            }),
        }),
    })
})

export const {
    useGetAllGroupSubscribersQuery,
    useLazySubscribeOnGroupQuery, 
    useUnsubscribeOnGroupMutation, 
    useGetUserGroupSubsCountQuery,
    useGetGroupSubsCountQuery,
    useGetFirstGroupSubsQuery,
    useGetGroupUserQuery,
    useLazyGetGroupUserQuery
} = groupUsersApi;