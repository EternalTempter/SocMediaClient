import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IGroup, IGroupUsers } from "../../../models";
import { baseUrl } from "../../../envVariables/variables";

export const groupsApi = createApi({
    reducerPath: 'groups/api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + 'api/group/'
    }),
    endpoints: build => ({
        findAllGroupsByName: build.query<IGroup[], string>({
            query: (name: string) => ({
                url: 'findAllByName',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: {
                    name
                }
            })
        }),
        getGroupById: build.query<IGroup, string>({
            query: (id: string) => ({
                url: 'getById',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: {
                    id
                }
            })
        }),
        getAllGroups: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'getAll',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: params
            })
        }),
        getAllUserGroupSubscriptions: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'getAllUserSubscriptions',
                headers: {'auth-token': localStorage.getItem('token')!},
                params: params
            })
        }),
        createGroup: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'create',
                method: 'post',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        updateDescription: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateDescription',
                method: 'put',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        updateName: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateName',
                method: 'put',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        updateType: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateType',
                method: 'put',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        updateImage: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateImage',
                method: 'put',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        updatePanoramaImage: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updatePanoramaImage',
                method: 'put',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
        deleteGroup: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'deleteGroup',
                method: 'delete',
                headers: {'auth-token': localStorage.getItem('token')!},
                body: body
            })
        }),
    })
})

export const {
    useFindAllGroupsByNameQuery,
    useGetAllUserGroupSubscriptionsQuery,
    useCreateGroupMutation,
    useGetGroupByIdQuery, 
    useLazyGetAllGroupsQuery,
    useLazyGetGroupByIdQuery,
    useUpdateDescriptionMutation,
    useUpdateImageMutation,
    useUpdatePanoramaImageMutation,
    useLazyGetAllUserGroupSubscriptionsQuery,
    useDeleteGroupMutation,
    useUpdateNameMutation, 
    useUpdateTypeMutation
} = groupsApi;