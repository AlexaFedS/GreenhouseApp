import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useLoginMutation, useRegistrationMutation, useUserQuery } from '../entities/user/userApi.ts';

import type { RegistrationBody } from '../entities/user/userTypes.ts';

export const RegistrationPage = () => {
    const { register, handleSubmit } = useForm<RegistrationBody>();
    const [registration, { error, isLoading }] = useRegistrationMutation();
    const [login] = useLoginMutation();
    const { data } = useUserQuery();
    const navigate = useNavigate();
    const handleRegisterSubmit = (data: RegistrationBody) =>
        registration(data)
            .unwrap()
            .then(() => {
                login({
                    username: data.username,
                    password: data.password,
                })
                    .unwrap()
                    .then(({ auth_token }) => {
                        localStorage.setItem('token', auth_token);
                        window.location.reload();
                    });
            });

    useEffect(() => {
        if (data) navigate('/');
    }, [data, navigate]);

    return (
        <div className='flex items-center justify-center h-screen bg-authBg bg-center bg-cover'>
            <form
                className='bg-[#141514] flex flex-col rounded-[16px] p-16 items-center gap-4 max-w-3xl w-full'
                onSubmit={handleSubmit(handleRegisterSubmit)}
            >
                <h1 className='text-[48px]'>Регистрация</h1>

                <input
                    className='input rounded-xl w-full'
                    placeholder='Username'
                    type='text'
                    {...register('username', { required: true })}
                />

                <input
                    className='input rounded-xl w-full'
                    placeholder='Имя'
                    type='text'
                    {...register('firstName', { required: true })}
                />

                <input
                    className='input rounded-xl w-full'
                    placeholder='Фамилия'
                    type='text'
                    {...register('lastName', { required: true })}
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
                    type='submit'
                >
                    Зарегистрироваться
                </button>

                {error && <p className='text-red-500'> Произошла ошибка при регистрации</p>}

                <Link
                    className='link link-hover'
                    to='/login'
                >
                    Авторизация
                </Link>
            </form>
        </div>
    );
};
