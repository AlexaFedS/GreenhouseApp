import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Layout } from '../components/Layout.tsx';
import { useEditGreenhouseMutation, useGreenhouseQuery } from '../entities/greenhouse/greenhouseApi.ts';
import { useUserQuery } from '../entities/user/userApi.ts';

import type { EditGreenhouseBody } from '../entities/greenhouse/greenhouseTypes.ts';

export const EditPage = () => {
    const params = useParams();
    const { data } = useGreenhouseQuery(Number(params?.id || 0));
    const { data: user } = useUserQuery();
    const { resetField, register, handleSubmit, setValue, getValues } = useForm<Omit<EditGreenhouseBody, 'id'>>({
        defaultValues: {
            newSensors: [],
            deleteSensors: [],
        },
    });
    const [newSensors, setNewSensors] = useState([
        {
            name: '',
            standart: undefined,
        },
    ]);
    const [editGreenhouse] = useEditGreenhouseMutation();
    const [more, setMore] = useState(false);

    useEffect(() => {
        if (data) {
            setValue('description', data.description);
            setValue('name', data.name);
            setValue('width', data.width);
            setValue('hight', data.hight);
            setValue('length', data.length);
            setValue('sensors', data.sensors);
            setValue(
                'deleteSensors',
                data.sensors.map((sensor) => ({
                    ...sensor,
                    delete: false,
                }))
            );
        }
    }, [data, setValue]);

    const handleAddNewSensor = () => {
        setNewSensors((prev) => [
            ...prev,
            {
                name: '',
                standart: undefined,
            },
        ]);
    };

    const handleEdit = (data: Omit<EditGreenhouseBody, 'id'>) => {
        user &&
            editGreenhouse({
                ...data,
                newSensors: data.newSensors
                    .filter((sensor) => sensor.standart && sensor.name)
                    .map((sensor) => ({
                        ...sensor,
                        idGreenHouse: Number(params?.id || 0),
                    })),
                deleteSensors: data.deleteSensors.filter((sensor) => sensor.delete),
                id: Number(params?.id || 0),
                idUser: user.id,
            })
                .unwrap()
                .then(() => {
                    resetField('newSensors');
                    setNewSensors([
                        {
                            name: '',
                            standart: undefined,
                        },
                    ]);
                });
    };

    if (!data) return;

    return (
        <Layout>
            <div className='bg-white w-full p-8 gap-4 flex justify-center px-16'>
                <p className='text-[36px]'>Редактирование </p>
            </div>

            <form
                className='flex h-full w-full'
                onSubmit={handleSubmit(handleEdit)}
            >
                <div className='flex max-w-80 w-full h-full p-4 flex-col border gap-4 items-center'>
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

                    <div className='input input-bordered flex gap-2 p-2 px-4 h-auto items-center'>
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

                    <div className='input input-bordered flex gap-2 p-2 px-4 h-auto items-center'>
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

                    <div className='input input-bordered flex gap-2 px-4 p-2 h-auto items-center'>
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

                    <button
                        className='mt-auto btn btn-primary'
                        type='submit'
                    >
                        Сохранить
                    </button>
                </div>

                <div className='flex flex-col items-center p-4 gap-4 border w-full h-full'>
                    <p className='text-[32px]'>Датчики</p>

                    {data.sensors.map((sensor, index) => (
                        <div
                            className='flex justify-between items-center gap-2'
                            key={sensor.id}
                        >
                            <input
                                className='input input-bordered'
                                placeholder='Название'
                                type='text'
                                {...register(`sensors.${index}.name`, {
                                    required:
                                        !!getValues(`sensors.${index}.standart`) &&
                                        !getValues(`deleteSensors.${index}.delete`),
                                })}
                            />

                            <input
                                className='input input-bordered'
                                placeholder='Значение'
                                type='number'
                                {...register(`sensors.${index}.standart`, {
                                    required:
                                        !!getValues(`sensors.${index}.name`) &&
                                        !getValues(`deleteSensors.${index}.delete`),
                                })}
                            />

                            <input
                                className='checkbox checkbox-error'
                                type='checkbox'
                                {...register(`deleteSensors.${index}.delete`)}
                            />
                        </div>
                    ))}

                    {newSensors.map((_, index) => (
                        <div
                            className='flex justify-between items-center gap-2 mr-8'
                            key={Math.random()}
                        >
                            <input
                                className='input input-bordered'
                                placeholder='Название'
                                type='text'
                                {...register(`newSensors.${index}.name`, {
                                    required: !!getValues(`newSensors.${index}.standart`),
                                })}
                            />

                            <input
                                className='input input-bordered'
                                placeholder='Значение'
                                type='number'
                                {...register(`newSensors.${index}.standart`, {
                                    required: !!getValues(`newSensors.${index}.name`),
                                })}
                            />
                        </div>
                    ))}

                    <button
                        className='btn btn-primary'
                        type='button'
                        onClick={handleAddNewSensor}
                    >
                        Добавить новый датчик
                    </button>
                </div>
            </form>
        </Layout>
    );
};
