import { useSearchParams } from 'react-router-dom';

import { GreenhousesList } from '../components/GreenhousesList.tsx';
import { Info } from '../components/Info.tsx';
import { Layout } from '../components/Layout';
import { useGreenhousesQuery } from '../entities/greenhouse/greenhouseApi.ts';
import { useUserQuery } from '../entities/user/userApi.ts';

interface HomePageProps {
    id: number;
}

export const HomePage = ({ id }: HomePageProps) => {
    const [params, setParams] = useSearchParams();
    const { data } = useGreenhousesQuery(id);
    const { data: user } = useUserQuery();

    return (
        <Layout>
            <div className='bg-white w-full p-8 gap-4 flex justify-between px-16'>
                {user && <p className='text-black text-[36px]'>{user.username}</p>}
                <p className='text-black text-[36px]'>Информация</p>
            </div>

            <div className='flex h-full w-full'>
                {data ? (
                    <GreenhousesList
                        data={data}
                        selected={+(params.get('id') ?? 0)}
                        onClick={setParams}
                    />
                ) : null}

                {params.get('id') && data ? <Info id={+(params.get('id') ?? 0)} /> : null}
            </div>
        </Layout>
    );
};
