import { useEffect } from 'react';

import { useGreenhouseClimateQuery, useGreenhouseQuery } from '../entities/greenhouse/greenhouseApi.ts';

interface InfoProps {
    id: number;
}

export const Info = ({ id }: InfoProps) => {
    const { data } = useGreenhouseQuery(id);
    const { data: climates, refetch } = useGreenhouseClimateQuery(id);

    useEffect(() => {
        setInterval(() => {
            refetch();
        }, 10000);
    }, [refetch]);

    if (!data) return;

    return (
        <div className='flex h-full w-full'>
            <div className='border w-full flex flex-col items-center p-8 gap-8'>
                <p className='text-[32px] text-[#141514] text-center'>Показатели</p>

                {climates &&
                    climates.map((climate) => (
                        <div
                            className='border rounded-xl p-8 flex gap-8 items-center'
                            key={climate.id}
                        >
                            <p className='text-primary border rounded-xl p-4'>{climate.value}</p>

                            <p className='text-[32px]'>
                                {data.sensors.find((sensor) => sensor.id === climate.idSensor)?.name}
                            </p>
                        </div>
                    ))}
            </div>

            <div className='border h-full w-full flex flex-col items-center p-8'>
                <p className='text-[32px] text-[#141514] text-center'>Параметры</p>

                <div className='flex flex-col w-full gap-12 h-full'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex gap-8 items-center mt-10'>
                            <p>Высота: </p>
                            <span className='input input-sm w-auto input-bordered'>{data.hight}</span>
                        </div>

                        <div className='flex gap-8 items-center'>
                            <p>Ширина: </p>
                            <span className='input input-sm w-auto input-bordered'>{data.width}</span>
                        </div>

                        <div className='flex gap-8 items-center'>
                            <p>Длина: </p>
                            <span className='input input-sm w-auto input-bordered'>{data.length}</span>
                        </div>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <p className='font-bold'>Описание:</p>
                        <p>{data.description}</p>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <p className='font-bold'>Эталон:</p>

                        {data.sensors?.map((sensor) => (
                            <div
                                className='flex gap-4 justify-between'
                                key={sensor.id}
                            >
                                <p>{'№ '+sensor.id + ' '+sensor.name}</p>
                                <p className='text-primary'>{sensor.standart}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
