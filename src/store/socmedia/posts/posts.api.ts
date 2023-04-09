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
                params: params
            })
        }),
        setLike: build.mutation<any, {}>({
            query: (obj: {}) => ({
                url: 'setLike',
                method: 'put',
                body: obj
            })
        }),
        getBestPostComment: build.query<IComment, string>({
            query: (id: string) => ({
                url: 'getBestComment',
                params: {
                    id: id
                }
            })
        }),
        getAllPostComments: build.query<IComment[], string>({
            query: (post_id: string) => ({
                url: 'getAllComments',
                params: {
                    post_id: post_id
                }
            })
        }),
        pasteCommentToPost: build.mutation<any, {}>({
            query: (obj: {}) => ({
                url: 'pasteComment',
                method: 'post',
                body: obj
            })
        }),
        setLikeToPostComment: build.mutation<any, {}>({
            query: (obj: {}) => ({
                url: 'setLikeToComment',
                method: 'put',
                body: obj
            })
        }),
        createPost: build.mutation<any, {}>({
            query: (obj: {}) => ({
                url: 'create',
                method: 'post',
                body: obj
            })
        }),
        getAllUserPosts: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'getAllUserPosts',
                params: params
            })
        }),
        isPostLiked: build.query<boolean, {}>({
            query: (params: {}) => ({
                url: 'isPostLiked',
                params: params
            })
        }),
        isCommentLiked: build.query<boolean, {}>({
            query: (params: {}) => ({
                url: 'isCommentLiked',
                params: params
            })
        }),
        removeLikeFromComment: build.query<any, {}>({
            query: (body: {}) => ({
                url: 'removeLikeFromComment',
                method: 'put',
                body: body
            })
        }),
        removeLike: build.query<any, {}>({
            query: (body: {}) => ({
                url: 'removeLike',
                method: 'put',
                body: body
            })
        }),
        getAllFriendsPosts: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'getAllFriendsPosts',
                params: params
            })
        }),
        getAllLikedPosts:  build.query<any, {}>({
            query: (params: {} ) => ({
                url: 'getAllLikedPosts',
                params: params
            })
        }),
        getAllLikes:  build.query<any, string>({
            query: (id: string) => ({
                url: 'getAllLikes',
                params: {
                    id: id
                }
            })
        }),
        updateViewsCount: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateViewsCount',
                method: 'put',
                body: body
            })
        }),
        findUserPostsByDescription: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'findByDescription',
                params: params
            })
        }),
        getUserPostsCount: build.query<any, string>({
            query: (id: string) => ({
                url: 'getUserPostsCount',
                params: {
                    id: id
                }
            })
        }),
        getAllGroupPosts: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'getAllGroupPosts',
                params: params
            })
        }),
        getAllUserCommentsCount: build.query<any, string>({
            query: (user_id: string) => ({
                url: 'getAllUserCommentsCount',
                params: {
                    user_id: user_id
                }
            })
        }),
        getAllLikedPostsCount: build.query<any, string>({
            query: (user_id: string) => ({
                url: 'getAllLikedPostsCount',
                params: {
                    user_id: user_id
                }
            })
        }),
        getUserMostLikedPostCount: build.query<any, string>({
            query: (user_id: string) => ({
                url: 'getUserMostLikedPostCount',
                params: {
                    user_id: user_id
                }
            })
        }),
        getPostCommentsAmount: build.query<any, string>({
            query: (id: string) => ({
                url: 'getPostCommentsAmount',
                params: {
                    id: id
                }
            })
        }),
        deletePost: build.mutation<any, {}>({
            query: (obj: {}) => ({
                url: 'deletePost',
                method: 'delete',
                body: obj
            })
        }),
        deleteComment: build.mutation<any, {}>({
            query: (obj: {}) => ({
                url: 'deleteComment',
                method: 'delete',
                body: obj
            })
        }),
        getAllPostsCount: build.query<any, string>({
            query: () => ({
                url: 'getAllPostsCount',
            })
        }),
        getUserMostLikedComment: build.query<any, string>({
            query: (id: string) => ({
                url: 'getUserMostLikedComment',
                params: {
                    user_id: id
                }
            })
        }),
        getCommentById: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'getCommentById',
                params: params
            })
        }),
        getPostById: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'getPostById',
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