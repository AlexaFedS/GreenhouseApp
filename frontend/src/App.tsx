import { Fragment } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useUserQuery } from './entities/user/userApi.ts';
import { HomePage, LoginPage, RegistrationPage } from './pages';
import { EditPage } from './pages/EditPage.tsx';
import { NewGreenhousePage } from './pages/NewGreenhousePage.tsx';
import { StatsPage } from './pages/StatsPage.tsx';

export const App = () => {
    const { data, isLoading } = useUserQuery();

    if (isLoading) return;

    return (
        <Routes>
            {!data ? (
                <Fragment>
                    <Route
                        element={<LoginPage />}
                        path='/login'
                    />

                    <Route
                        element={<RegistrationPage />}
                        path='/registration'
                    />

                    <Route
                        element={<Navigate to='/login' />}
                        path='*'
                    />
                </Fragment>
            ) : (
                <Fragment>
                    <Route
                        element={<HomePage id={data.id} />}
                        path='/'
                    />

                    <Route
                        element={<EditPage />}
                        path='/edit/:id'
                    />

                    <Route
                        element={<StatsPage id={data.id} />}
                        path='/stats'
                    />

                    <Route
                        element={<NewGreenhousePage />}
                        path='/new'
                    />

                    <Route
                        element={<Navigate to='/' />}
                        path='*'
                    />
                </Fragment>
            )}
        </Routes>
    );
};
