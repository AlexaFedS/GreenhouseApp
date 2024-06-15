import { useForm } from 'react-hook-form';

import { Layout } from '../components/Layout.tsx';
import { useCreateGreenhouseMutation } from '../entities/greenhouse/greenhouseApi.ts';
import { useUserQuery } from '../entities/user/userApi.ts';

import type { NewGreenhouseBody } from '../entities/greenhouse/greenhouseTypes.ts';

export const NewGreenhousePage = () => {
    const { register, handleSubmit, reset } = useForm<Omit<NewGreenhouseBody, 'idUser'>>();
    const [createGreenhouse] = useCreateGreenhouseMutation();
    const { data: user } = useUserQuery();
    const handleAdd = (data: Omit<NewGreenhouseBody, 'idUser'>) =>
        user &&
        createGreenhouse({
            ...data,
            idUser: user.id,
        }).then(() => reset());

    return (
        <Layout>
            <div className='bg-white w-full p-8 gap-4 flex justify-center px-16 border-b'>
                <p className='text-[36px]'>Добавление оранжереи</p>
            </div>

            <form
                className='flex flex-col items-center gap-4 p-4 justify-center h-full'
                onSubmit={handleSubmit(handleAdd)}
            >
                <p className='text-[32px]'>Оранжерея</p>
                <p>Введите данные теплицы:</p>

                <div className='flex gap-4 items-center'>
                    <label className='form-control'>
                        <span className='label'>
                            <p className='label-text'>Название:</p>
                        </span>

                        <input
                            className='input input-bordered'
                            placeholder='Название'
                            type='text'
                            {...register('name', { required: true })}
                        />
                    </label>

                    <label className='form-control'>
                        <span className='label'>
                            <p className='label-text'>Описание:</p>
                        </span>

                        <input
                            className='input input-bordered'
                            placeholder='Описание'
                            type='text'
                            {...register('description', { required: true })}
                        />
                    </label>
                </div>

                <div className='flex gap-4 items-center'>
                    <div className='input input-bordered flex gap-2 p-2 h-auto items-center'>
                        <p>Высота:</p>

                        <input
                            className='input input-bordered input-sm w-20'
                            min={1}
                            placeholder='Высота'
                            type='number'
                            {...register('hight', { required: true })}
                        />

                        <p>
                            <b>М</b>
                        </p>
                    </div>

                    <div className='input input-bordered flex gap-2 p-2 h-auto items-center'>
                        <p>Ширина:</p>

                        <input
                            className='input input-bordered input-sm w-20'
                            min={1}
                            placeholder='Ширина'
                            type='number'
                            {...register('width', { required: true })}
                        />

                        <p>
                            <b>М</b>
                        </p>
                    </div>

                    <div className='input input-bordered flex gap-2 p-2 h-auto items-center'>
                        <p>Длина:</p>

                        <input
                            className='input input-bordered input-sm w-20'
                            min={1}
                            placeholder='Длина'
                            type='number'
                            {...register('length', { required: true })}
                        />

                        <p>
                            <b>М</b>
                        </p>
                    </div>
                </div>

                <button
                    className='btn btn-primary'
                    type='submit'
                >
                    Добавить
                </button>
            </form>
        </Layout>
    );
};
