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
                params: {
                    name
                }
            })
        }),
        getGroupById: build.query<IGroup, string>({
            query: (id: string) => ({
                url: 'getById',
                params: {
                    id
                }
            })
        }),
        getAllGroups: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'getAll',
                params: params
            })
        }),
        getAllUserGroupSubscriptions: build.query<any, {}>({
            query: (params: {}) => ({
                url: 'getAllUserSubscriptions',
                params: params
            })
        }),
        createGroup: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'create',
                method: 'post',
                body: body
            })
        }),
        updateDescription: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateDescription',
                method: 'put',
                body: body
            })
        }),
        updateImage: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updateImage',
                method: 'put',
                body: body
            })
        }),
        updatePanoramaImage: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'updatePanoramaImage',
                method: 'put',
                body: body
            })
        }),
        deleteGroup: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'deleteGroup',
                method: 'delete',
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
} = groupsApi;