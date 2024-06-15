import { api } from '../../api';

import type { LoginBody, LoginData, RegistrationBody, UserData } from './userTypes.ts';

const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        registration: build.mutation<UserData, RegistrationBody>({
            query: (body) => ({
                url: '/auth/users/',
                method: 'POST',
                body,
            }),
            invalidatesTags: (data) => (data ? ['user'] : []),
        }),
        login: build.mutation<LoginData, LoginBody>({
            query: (body) => ({
                url: '/auth/token/login',
                method: 'POST',
                body,
            }),
            invalidatesTags: (data) => (data ? ['user'] : []),
        }),
        user: build.query<UserData, void>({
            query: () => ({
                url: '/auth/users/me',
                method: 'GET',
            }),
            providesTags: ['user'],
        }),
        logout: build.mutation<void, void>({
            query: () => ({
                url: '/auth/token/logout',
                method: 'POST',
            }),
            invalidatesTags: ['user', 'greenhouse'],
        }),
    }),
});

export const { useRegistrationMutation, useLoginMutation, useLogoutMutation, useUserQuery } = userApi;
