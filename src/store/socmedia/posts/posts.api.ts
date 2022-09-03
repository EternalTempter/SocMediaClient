import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IComment, IPost } from "../../../models";

export const postsApi = createApi({
    reducerPath: 'posts/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/post/'
    }),
    endpoints: build => ({
        getAllPosts: build.query<IPost[], void>({
            query: () => ({
                url: 'getAll',
            })
        }),
        setLike: build.mutation<any, {}>({
            query: (obj: {}) => ({
                url: 'setLike',
                method: 'put',
                body: obj
            })
        }),
        getBestPostComment: build.query<IPost[], string>({
            query: (id: string) => ({
                url: 'getBestComment',
                params: {
                    id: id
                }
            })
        }),
        getAllPostComments: build.query<IComment[], string>({
            query: (group_id: string) => ({
                url: 'getAllComments',
                params: {
                    group_id: group_id
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
                url: 'pasteComment',
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
        getAllUserPosts: build.query<any,string>({
            query: (id: string) => ({
                url: 'getAllUserPosts',
                params: {
                    id: id
                }
            })
        })
    })
});

export const {useGetAllPostsQuery, useSetLikeMutation, useLazyGetAllPostCommentsQuery, useGetBestPostCommentQuery, usePasteCommentToPostMutation, useSetLikeToPostCommentMutation, useCreatePostMutation, useGetAllUserPostsQuery} = postsApi;