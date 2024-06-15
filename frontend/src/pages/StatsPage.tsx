import dayjs from 'dayjs';
import { Fragment, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { GreenhousesList } from '../components/GreenhousesList.tsx';
import { Layout } from '../components/Layout';
import { useGreenhouseQuery, useGreenhousesQuery, useStatsQuery } from '../entities/greenhouse/greenhouseApi.ts';
import { useUserQuery } from '../entities/user/userApi.ts';

interface StatsPageProps {
    id: number;
}

export const StatsPage = ({ id }: StatsPageProps) => {
    const [params, setParams] = useSearchParams();
    const { data } = useGreenhousesQuery(id);
    const { data: user } = useUserQuery();
    const { data: greenhouse } = useGreenhouseQuery(Number(params.get('id') ?? 0));
    const [sensor, setSensor] = useState<number | null>(null);
    const { data: stats, refetch } = useStatsQuery(+(params.get('id') ?? 0));

    useEffect(() => {
        greenhouse &&
            stats &&
            setSensor(
                greenhouse.sensors.length
                    ? greenhouse.sensors.filter((sensor) => stats?.[sensor.id]?.length)[0].id
                    : null
            );
    }, [greenhouse, stats]);

    useEffect(() => {
        setInterval(() => refetch(), 10000);
    }, [refetch]);

    return (
        <Layout>
            <div className='bg-white w-full p-8 gap-4 flex justify-between px-16'>
                {user && <p className='text-black text-[36px]'>{user.username}</p>}
                <p className='text-black text-[36px]'>Статистика</p>
            </div>

            <div className='flex h-full'>
                {data ? (
                    <GreenhousesList
                        stats
                        data={data}
                        selected={+(params.get('id') ?? 0)}
                        onClick={setParams}
                    />
                ) : null}

                <div className='flex border w-full h-full p-8 flex-col items-center gap-16'>
                    {greenhouse ? (
                        sensor ? (
                            <Fragment>
                                <select
                                    value={sensor}
                                    onChange={(e) => setSensor(Number(e.target.value))}
                                >
                                    {greenhouse.sensors
                                        .filter((sensor) => stats?.[sensor.id].length)
                                        .map((sensor) => (
                                            <option
                                                key={sensor.id}
                                                value={sensor.id}
                                            >
                                                {sensor.name}
                                            </option>
                                        ))}
                                </select>

                                {stats?.[sensor].length ? (
                                    <LineChart
                                        compact
                                        height={500}
                                        width={800}
                                        data={stats?.[sensor].map((stat) => ({
                                            ...stat,
                                            time: dayjs(stat.time).format('HH:mm:ss'),
                                        }))}
                                    >
                                        <XAxis
                                            allowDuplicatedCategory={false}
                                            dataKey='time'
                                        />

                                        <Line
                                            dataKey='value'
                                            stroke='#8884d8'
                                            type='monotone'
                                        />

                                        <YAxis />

                                        <CartesianGrid
                                            stroke='#ccc'
                                            strokeDasharray='5 5'
                                        />
                                    </LineChart>
                                ) : (
                                    <p>Нет данных</p>
                                )}
                            </Fragment>
                        ) : (
                            <p>Нет датчиков</p>
                        )
                    ) : null}
                </div>
            </div>
        </Layout>
    );
};
