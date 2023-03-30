import {configureStore} from '@reduxjs/toolkit'
import { friendsApi } from './socmedia/friends/friends.api';
import { groupsApi } from './socmedia/groups/groups.api';
import { groupUsersApi } from './socmedia/groupUsers/groupUsers.api';
import { inboxesApi } from './socmedia/inboxes/inboxes.api';
import { messagesApi } from './socmedia/messages/messages.api';
import { newsApi } from './socmedia/news/news.api';
import { postsApi } from './socmedia/posts/posts.api';
import { userDataApi } from './socmedia/userData/userData.api';
import { usersApi } from './socmedia/users/users.api';

export const store = configureStore({
    reducer: {
        [inboxesApi.reducerPath]: inboxesApi.reducer,
        [messagesApi.reducerPath]: messagesApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [postsApi.reducerPath]: postsApi.reducer,
        [userDataApi.reducerPath]: userDataApi.reducer,
        [friendsApi.reducerPath]: friendsApi.reducer,
        [groupsApi.reducerPath]: groupsApi.reducer,
        [groupUsersApi.reducerPath]: groupUsersApi.reducer,
        [newsApi.reducerPath]: newsApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
        inboxesApi.middleware, 
        messagesApi.middleware, 
        usersApi.middleware, 
        postsApi.middleware, 
        userDataApi.middleware, 
        friendsApi.middleware, 
        groupsApi.middleware,
        groupUsersApi.middleware,
        newsApi.middleware
    ) 
});

export type TypeRootState = ReturnType<typeof store.getState>