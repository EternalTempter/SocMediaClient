import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { IAddInFriendsNotification, IFriend, IUser } from '../../../models';

export const friendsApi = createApi({
    reducerPath: 'friends/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://80.78.245.233:5000/api/friendship/'
    }),
    endpoints: build => ({
        getAllFriends: build.query<IFriend[], string>({
            query: (id: string) => ({
                url: 'getAllFriends',
                params: {
                    id: id
                }
            })
        }),
        getAllNotifications: build.query<IAddInFriendsNotification[], string>({
            query: (id: string) => ({
                url: 'getAllNotifications',
                params: {
                    id: id
                }
            })
        }),
        getAllSubscribers: build.query<any, string>({
            query: (id: string) => ({
                url: 'getAllSubscribers',
                params: {
                    id: id
                }
            })
        }),
        sendFriendRequest: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'sendFriendRequest',
                method: 'post',
                body: body
            })
        }),
        acceptFriendRequest: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'acceptFriendRequest',
                method: 'put',
                body: body
            })
        }),
        rejectFriendRequest: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'rejectFriendRequest',
                method: 'put',
                body: body
            })
        }),
        deleteFriend: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'deleteFriend',
                method: 'delete',
                body: body
            })
        }),
        deleteFriendRequest: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'deleteFriendRequest',
                method: 'delete',
                body: body
            })
        }),
        getUserSubscribersCount: build.query<any, string>({
            query: (id: string) => ({
                url: 'getUserSubscribersCount',
                params: {
                    id: id
                }
            })
        }),
        getUserFriendsCount: build.query<any, string>({
            query: (id: string) => ({
                url: 'getUserFriendsCount',
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
    useGetUserSubscribersCountQuery
} = friendsApi;