import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { IAddInFriendsNotification, IFriend, IUser } from '../../../models';
import { baseUrl } from "../../../envVariables/variables";

export const friendsApi = createApi({
    reducerPath: 'friends/api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + 'api/friendship/'
    }),
    endpoints: build => ({
        getAllFriends: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'getAllFriends',
                params: params,
                headers: {'auth-token': localStorage.getItem('token')!}
            })
        }),
        getAllNotifications: build.query<IAddInFriendsNotification[], string>({
            query: (id: string) => ({
                url: 'getAllNotifications',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: {
                    id: id
                }
            })
        }),
        getAllSubscribers: build.query<any, string>({
            query: (id: string) => ({
                url: 'getAllSubscribers',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: {
                    id: id
                }
            })
        }),
        sendFriendRequest: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'sendFriendRequest',
                method: 'post',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        acceptFriendRequest: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'acceptFriendRequest',
                method: 'put',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        rejectFriendRequest: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'rejectFriendRequest',
                method: 'put',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        deleteFriend: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'deleteFriend',
                method: 'delete',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        deleteFriendRequest: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'deleteFriendRequest',
                method: 'delete',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        getUserSubscribersCount: build.query<any, string>({
            query: (id: string) => ({
                url: 'getUserSubscribersCount',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: {
                    id: id
                }
            })
        }),
        getUserFriendsCount: build.query<any, string>({
            query: (id: string) => ({
                url: 'getUserFriendsCount',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: {
                    id: id
                }
            })
        })
    })
})

export const {
    useGetAllFriendsQuery,
    useGetAllNotificationsQuery,
    useGetAllSubscribersQuery,
    useSendFriendRequestMutation,
    useRejectFriendRequestMutation,
    useAcceptFriendRequestMutation,
    useDeleteFriendMutation,
    useDeleteFriendRequestMutation,
    useGetUserFriendsCountQuery,
    useGetUserSubscribersCountQuery,
    useLazyGetAllFriendsQuery
} = friendsApi;