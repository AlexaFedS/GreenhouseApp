import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/',
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) headers.set('Authorization', 'Token ' + token);

            return headers;
        },
    }),
    endpoints: () => ({}),
    tagTypes: ['user', 'greenhouse', 'climate', 'greenhouses'],
});
