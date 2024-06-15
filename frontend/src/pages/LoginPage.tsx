import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useLoginMutation, useUserQuery } from '../entities/user/userApi.ts';

import type { LoginBody } from '../entities/user/userTypes.ts';

export const LoginPage = () => {
    const { register, handleSubmit } = useForm<LoginBody>();
    const [login, { error, isLoading }] = useLoginMutation();
    const { data } = useUserQuery();
    const navigate = useNavigate();
    const handleLoginSubmit = (data: LoginBody) =>
        login(data)
            .unwrap()
            .then(({ auth_token }) => {
                localStorage.setItem('token', auth_token);
                window.location.reload();
            });

    useEffect(() => {
        if (data) navigate('/');
    }, [data, navigate]);

    return (
        <div className='flex items-center justify-center h-screen bg-authBg bg-center bg-cover'>
            <form
                className='bg-[#141514] flex flex-col rounded-[16px] p-16 items-center gap-4 max-w-3xl w-full'
                onSubmit={handleSubmit(handleLoginSubmit)}
            >
                <h1 className='text-[48px]'>Вход</h1>

                <input
                    className='input rounded-xl w-full'
                    placeholder='Username'
                    type='text'
                    {...register('username', { required: true })}
                />

                <input
                    className='input rounded-xl w-full'
                    placeholder='Пароль'
                    type='password'
                    {...register('password', { required: true })}
                />

                <button
                    className='btn btn-success w-full'
                    disabled={isLoading}
                >
                    Войти
                </button>

                {error && <p className='text-red-500'> Произошла ошибка при авторизации</p>}

                <Link
                    className='link link-hover'
                    to='/registration'
                >
                    Регистрация
                </Link>
            </form>
        </div>
    );
};
