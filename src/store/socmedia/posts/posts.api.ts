import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IComment, IPost } from "../../../models";
import { baseUrl } from "../../../envVariables/variables";

export const postsApi = createApi({
    reducerPath: 'posts/api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + 'api/post/'
    }),
    endpoints: build => ({
        getAllPosts: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'getAll',
                params: params,
                headers: {'auth-token': localStorage.getItem('token')!}
            })
        }),
        setLike: build.mutation<any, {}>({
            query: (obj: {}) => ({
                url: 'setLike',
                method: 'put',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: obj
            })
        }),
        getBestPostComment: build.query<IComment, string>({
            query: (id: string) => ({
                url: 'getBestComment',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: {
                    id: id
                }
            })
        }),
        getAllPostComments: build.query<IComment[], string>({
            query: (post_id: string) => ({
                url: 'getAllComments',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: {
                    post_id: post_id
                }
            })
        }),
        pasteCommentToPost: build.mutation<any, {}>({
            query: (obj: {}) => ({
                url: 'pasteComment',
                method: 'post',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: obj
            })
        }),
        setLikeToPostComment: build.mutation<any, {}>({
            query: (obj: {}) => ({
                url: 'setLikeToComment',
                method: 'put',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: obj
            })
        }),
        createPost: build.mutation<any, {}>({
            query: (obj: {}) => ({
                url: 'create',
                method: 'post',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: obj,
            })
        }),
        getAllUserPosts: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'getAllUserPosts',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: params
            })
        }),
        isPostLiked: build.query<boolean, {}>({
            query: (params: {}) => ({
                url: 'isPostLiked',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: params
            })
        }),
        isCommentLiked: build.query<boolean, {}>({
            query: (params: {}) => ({
                url: 'isCommentLiked',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: params
            })
        }),
        removeLikeFromComment: build.query<any, {}>({
            query: (body: {}) => ({
                url: 'removeLikeFromComment',
                method: 'put',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        removeLike: build.query<any, {}>({
            query: (body: {}) => ({
                url: 'removeLike',
                method: 'put',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        getAllFriendsPosts: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'getAllFriendsPosts',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: params
            })
        }),
        getAllLikedPosts:  build.query<any, {}>({
            query: (params: {} ) => ({
                url: 'getAllLikedPosts',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: params
            })
        }),
        getAllLikes:  build.query<any, string>({
            query: (id: string) => ({
                url: 'getAllLikes',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: {
                    id: id
                }
            })
        }),
        updateViewsCount: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateViewsCount',
                headers: {'auth-token': localStorage.getItem('token')!},
                method: 'put',
                body: body
            })
        }),
        findUserPostsByDescription: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'findByDescription',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: params
            })
        }),
        getUserPostsCount: build.query<any, string>({
            query: (id: string) => ({
                url: 'getUserPostsCount',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: {
                    id: id
                }
            })
        }),
        getAllGroupPosts: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'getAllGroupPosts',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: params
            })
        }),
        getAllUserCommentsCount: build.query<any, string>({
            query: (user_id: string) => ({
                url: 'getAllUserCommentsCount',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: {
                    user_id: user_id
                }
            })
        }),
        getAllLikedPostsCount: build.query<any, string>({
            query: (user_id: string) => ({
                url: 'getAllLikedPostsCount',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: {
                    user_id: user_id
                }
            })
        }),
        getUserMostLikedPostCount: build.query<any, string>({
            query: (user_id: string) => ({
                url: 'getUserMostLikedPostCount',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: {
                    user_id: user_id
                }
            })
        }),
        getPostCommentsAmount: build.query<any, string>({
            query: (id: string) => ({
                url: 'getPostCommentsAmount',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: {
                    id: id
                }
            })
        }),
        deletePost: build.mutation<any, {}>({
            query: (obj: {}) => ({
                url: 'deletePost',
                method: 'delete',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: obj
            })
        }),
        deleteComment: build.mutation<any, {}>({
            query: (obj: {}) => ({
                url: 'deleteComment',
                method: 'delete',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: obj
            })
        }),
        getAllPostsCount: build.query<any, string>({
            query: () => ({
                url: 'getAllPostsCount',
                headers: {'auth-token': localStorage.getItem('token')!},
            })
        }),
        getUserMostLikedComment: build.query<any, string>({
            query: (id: string) => ({
                url: 'getUserMostLikedComment',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: {
                    user_id: id
                }
            })
        }),
        getCommentById: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'getCommentById',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: params
            })
        }),
        getPostById: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'getPostById',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: params
            })
        })
    })
});

export const {
    useLazyGetAllPostsQuery, 
    useSetLikeMutation, 
    useLazyGetAllPostCommentsQuery, 
    useGetBestPostCommentQuery, 
    usePasteCommentToPostMutation, 
    useSetLikeToPostCommentMutation, 
    useCreatePostMutation, 
    useLazyGetAllUserPostsQuery, 
    useIsPostLikedQuery, 
    useIsCommentLikedQuery, 
    useLazyRemoveLikeFromCommentQuery, 
    useLazyRemoveLikeQuery, 
    useLazyGetAllFriendsPostsQuery, 
    useGetAllLikesQuery, 
    useLazyGetAllLikedPostsQuery, 
    useUpdateViewsCountMutation, 
    useFindUserPostsByDescriptionQuery, 
    useGetUserPostsCountQuery,
    useLazyGetAllGroupPostsQuery,
    useGetAllUserCommentsCountQuery,
    useGetAllLikedPostsCountQuery,
    useGetUserMostLikedPostCountQuery,
    useLazyGetPostCommentsAmountQuery,
    useDeletePostMutation,
    useGetAllPostsCountQuery,
    useGetUserMostLikedCommentQuery,
    useLazyGetCommentByIdQuery,
    useLazyGetPostByIdQuery,
    useDeleteCommentMutation
} = postsApi;