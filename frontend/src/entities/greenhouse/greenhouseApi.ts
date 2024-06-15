import { api } from '../../api';

import type {
    EditGreenhouseBody,
    GreenhouseClimateData,
    GreenhouseData,
    NewGreenhouseBody,
    StatsData,
} from './greenhouseTypes.ts';

const greenhouseApi = api.injectEndpoints({
    endpoints: (build) => ({
        greenhouses: build.query<GreenhouseData[], number>({
            query: (id) => ({
                url: `/${id}/greenhouses`,
                method: 'GET',
            }),
            providesTags: ['greenhouses'],
        }),
        greenhouse: build.query<GreenhouseData, number>({
            query: (id) => ({
                url: `/greenhouse/${id}`,
                method: 'GET',
            }),
            providesTags: ['greenhouse'],
        }),
        greenhouseClimate: build.query<GreenhouseClimateData[], number>({
            query: (id) => ({
                url: `/greenhouse/${id}/climates`,
                method: 'GET',
            }),
            providesTags: ['climate'],
        }),
        createGreenhouse: build.mutation<unknown, NewGreenhouseBody>({
            query: (body) => ({
                url: '/greenhouse/add',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['greenhouses'],
        }),
        editGreenhouse: build.mutation<unknown, EditGreenhouseBody>({
            query: ({ id, ...body }) => ({
                url: `/greenhouse/${id}/edit`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['greenhouse'],
        }),
        stats: build.query<StatsData, number>({
            query: (id) => ({
                url: `/statistic/${id}/get`,
                method: 'GET',
            }),
        }),
        delete: build.mutation<unknown, number>({
            query: (id) => ({
                url: `/greenhouse/${id}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: ['greenhouses'],
        }),
    }),
});

export const {
    useGreenhousesQuery,
    useEditGreenhouseMutation,
    useDeleteMutation,
    useGreenhouseClimateQuery,
    useGreenhouseQuery,
    useCreateGreenhouseMutation,
    useStatsQuery,
} = greenhouseApi;
