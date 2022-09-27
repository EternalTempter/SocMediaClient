import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IGroup, IGroupUsers } from "../../../models";

export const groupsApi = createApi({
    reducerPath: 'groups/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/group/'
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
        getAllGroups: build.query<IGroup[], void>({
            query: () => ({
                url: 'getAll',
            })
        }),
        getAllUserGroupSubscriptions: build.query<IGroupUsers[], string>({
            query: (id: string) => ({
                url: 'getAllUserSubscriptions',
                params: {
                    id
                }
            })
        }),
        createGroup: build.mutation<any, {}>({
            query: (body: {}) => ({
                url: 'create',
                method: 'post',
                body: body
            })
        })
    })
})

export const {
    useFindAllGroupsByNameQuery,
    useGetAllUserGroupSubscriptionsQuery,
    useCreateGroupMutation,
    useGetGroupByIdQuery, 
    useLazyGetAllGroupsQuery,
    useLazyGetGroupByIdQuery
} = groupsApi;