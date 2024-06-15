import { useNavigate } from 'react-router-dom';

import { useDeleteMutation } from '../entities/greenhouse/greenhouseApi.ts';

import type { GreenhouseData } from '../entities/greenhouse/greenhouseTypes.ts';

interface GreenhousesListProps {
    data: GreenhouseData[];
    selected?: number;
    stats?: boolean;
    onClick: (query: string) => void;
}

export const GreenhousesList = ({ data, selected, onClick, stats }: GreenhousesListProps) => {
    const navigate = useNavigate();
    const [deleteGreenhouse] = useDeleteMutation();

    return (
        <div className='flex flex-col gap-4 max-w-80 w-full p-8 border h-full'>
            <h4 className='text-[32px] text-[#141514] text-center'>Оранжереи</h4>

            <div className='flex flex-col gap-4 w-full h-full overflow-hidden'>
                {data.map((greenhouse) => (
                    <div
                        className={`rounded-xl p-4 border flex gap-4 items-center cursor-pointer ${selected === greenhouse.id ? 'bg-success' : ''}`}
                        key={greenhouse.id}
                        onClick={() => onClick('id=' + greenhouse.id)}
                    >
                        <div className='bg-greenhouse size-20 rounded bg-center bg-cover' />

                        <p className={selected === greenhouse.id ? 'text-white' : 'text-[#141514]'}>
                            {greenhouse.name}
                        </p>
                    </div>
                ))}
            </div>

            {!stats && selected ? (
                <div className='flex flex-col gap-4 w-full'>
                    <button
                        className='btn btn-success'
                        onClick={() => navigate(`edit/${selected}`)}
                    >
                        Редактировать
                    </button>

                    <button
                        className='btn btn-error'
                        onClick={() =>
                            deleteGreenhouse?.(selected)
                                .unwrap()
                                .then(() => navigate('/'))
                        }
                    >
                        Удалить
                    </button>
                </div>
            ) : null}
        </div>
    );
};
