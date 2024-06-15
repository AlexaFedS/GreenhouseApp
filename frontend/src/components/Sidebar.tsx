import { useLocation, useNavigate } from 'react-router-dom';

import { useLogoutMutation } from '../entities/user/userApi.ts';

export const Sidebar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [logout] = useLogoutMutation();

    const handleLogout = () =>
        logout().then(() => {
            localStorage.removeItem('token');
            window.location.reload();
        });

    return (
        <div className='h-screen flex flex-col items-center w-48 bg-[#141514] p-8 fixed'>
            <div className='bg-white rounded-full size-24 mb-16' />

            <button
                className={`btn btn-square rounded-md ${pathname === '/' ? 'btn-success' : 'btn-ghost'}`}
                onClick={() => navigate('/')}
            >
                <svg
                    fill='none'
                    height='52'
                    viewBox='0 0 52 52'
                    width='52'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <g
                        clipPath='url(#clip0_9_11)'
                        filter='url(#filter0_d_9_11)'
                    >
                        <path
                            d='M44.8571 20.4287H32.2857C31.4178 20.4287 30.7142 21.1323 30.7142 22.0001V40.8573C30.7142 41.725 31.4178 42.4287 32.2857 42.4287H44.8571C45.7248 42.4287 46.4285 41.725 46.4285 40.8573V22.0001C46.4285 21.1323 45.7248 20.4287 44.8571 20.4287Z'
                            stroke='white'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='3'
                        />

                        <path
                            d='M44.8571 1.57153H32.2857C31.4178 1.57153 30.7142 2.27509 30.7142 3.14296V9.4601C30.7142 10.328 31.4178 11.0315 32.2857 11.0315H44.8571C45.7248 11.0315 46.4285 10.328 46.4285 9.4601V3.14296C46.4285 2.27509 45.7248 1.57153 44.8571 1.57153Z'
                            stroke='white'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='3'
                        />

                        <path
                            d='M19.7143 1.57153H7.14284C6.27496 1.57153 5.57141 2.27509 5.57141 3.14296V22.0001C5.57141 22.868 6.27496 23.5715 7.14284 23.5715H19.7143C20.5821 23.5715 21.2857 22.868 21.2857 22.0001V3.14296C21.2857 2.27509 20.5821 1.57153 19.7143 1.57153Z'
                            stroke='white'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='3'
                        />

                        <path
                            d='M19.7143 32.9688H7.14284C6.27496 32.9688 5.57141 33.6721 5.57141 34.5402V40.8573C5.57141 41.7251 6.27496 42.4287 7.14284 42.4287H19.7143C20.5821 42.4287 21.2857 41.7251 21.2857 40.8573V34.5402C21.2857 33.6721 20.5821 32.9688 19.7143 32.9688Z'
                            stroke='white'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='3'
                        />
                    </g>

                    <defs>
                        <filter
                            colorInterpolationFilters='sRGB'
                            filterUnits='userSpaceOnUse'
                            height='52'
                            id='filter0_d_9_11'
                            width='52'
                            x='0'
                            y='0'
                        >
                            <feFlood
                                floodOpacity='0'
                                result='BackgroundImageFix'
                            />

                            <feColorMatrix
                                in='SourceAlpha'
                                result='hardAlpha'
                                type='matrix'
                                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                            />

                            <feOffset dy='4' />
                            <feGaussianBlur stdDeviation='2' />

                            <feComposite
                                in2='hardAlpha'
                                operator='out'
                            />

                            <feColorMatrix
                                type='matrix'
                                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
                            />

                            <feBlend
                                in2='BackgroundImageFix'
                                mode='normal'
                                result='effect1_dropShadow_9_11'
                            />

                            <feBlend
                                in='SourceGraphic'
                                in2='effect1_dropShadow_9_11'
                                mode='normal'
                                result='shape'
                            />
                        </filter>

                        <clipPath id='clip0_9_11'>
                            <rect
                                fill='white'
                                height='44'
                                transform='translate(4)'
                                width='44'
                            />
                        </clipPath>
                    </defs>
                </svg>
            </button>

            <button
                className={`btn btn-square rounded-md ${pathname === '/stats' ? 'btn-success' : 'btn-ghost'}`}
                onClick={() => navigate('/stats')}
            >
                <svg
                    fill='none'
                    height='38'
                    viewBox='0 0 38 38'
                    width='38'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <g clipPath='url(#clip0_9_7)'>
                        <path
                            d='M30.9728 16.127C36.4014 23.7716 32.2485 32.5278 30.24 35.9435C29.9455 36.4212 29.5497 36.8289 29.081 37.138C28.6119 37.4469 28.0813 37.65 27.5257 37.7325C23.5899 38.4102 13.7913 39.1694 8.52559 31.5246C3.3413 24.3138 3.55845 11.627 4.01988 5.58175C4.03806 5.13137 4.16308 4.69174 4.38468 4.29904C4.60627 3.90635 4.91806 3.57183 5.2944 3.32302C5.67073 3.07421 6.10084 2.91822 6.54935 2.86789C6.99785 2.81757 7.45193 2.87434 7.87416 3.03355C13.7099 4.7143 25.8699 8.91612 30.9728 16.127Z'
                            stroke='white'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='3'
                        />

                        <path
                            d='M12.6785 13.606C18.8956 20.9233 24.3522 28.8525 28.9643 37.2717'
                            stroke='white'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='3'
                        />
                    </g>

                    <defs>
                        <clipPath id='clip0_9_7'>
                            <rect
                                fill='white'
                                height='38'
                                width='38'
                            />
                        </clipPath>
                    </defs>
                </svg>
            </button>

            <button
                className={`btn btn-square rounded-md ${pathname === '/new' ? 'btn-success' : 'btn-ghost'}`}
                onClick={() => navigate('/new')}
            >
                <svg
                    fill='none'
                    height='38'
                    viewBox='0 0 38 38'
                    width='38'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <g clipPath='url(#clip0_19_167)'>
                        <path
                            d='M14.1958 6.10718L15.3629 3.09432C15.5598 2.58421 15.9061 2.14544 16.3565 1.83547C16.8069 1.5255 17.3405 1.35879 17.8872 1.35718H20.1129C20.6597 1.35879 21.1932 1.5255 21.6437 1.83547C22.0941 2.14544 22.4404 2.58421 22.6372 3.09432L23.8044 6.10718L27.7671 8.38718L30.97 7.89861C31.5033 7.82622 32.0462 7.914 32.5296 8.15082C33.0127 8.38764 33.4147 8.76278 33.6843 9.22861L34.77 11.1286C35.0482 11.6018 35.1766 12.1483 35.1378 12.6959C35.0989 13.2435 34.8951 13.7664 34.5528 14.1957L32.5714 16.72V21.28L34.6071 23.8043C34.9494 24.2336 35.1532 24.7566 35.192 25.3042C35.2309 25.8518 35.1025 26.3982 34.8243 26.8715L33.7385 28.7715C33.469 29.2372 33.067 29.6123 32.5839 29.8493C32.1005 30.086 31.5576 30.1739 31.0243 30.1015L27.8214 29.6129L23.8586 31.8929L22.6915 34.9057C22.4947 35.4158 22.1484 35.8547 21.6979 36.1646C21.2475 36.4746 20.714 36.6413 20.1672 36.6429H17.8872C17.3405 36.6413 16.8069 36.4746 16.3565 36.1646C15.9061 35.8547 15.5598 35.4158 15.3629 34.9057L14.1958 31.8929L10.2329 29.6129L7.03008 30.1015C6.49677 30.1739 5.95397 30.086 5.47067 29.8493C4.98739 29.6123 4.5854 29.2372 4.31579 28.7715L3.23008 26.8715C2.95186 26.3982 2.82369 25.8518 2.86245 25.3042C2.90121 24.7566 3.10511 24.2336 3.44722 23.8043L5.42865 21.28V16.72L3.39293 14.1957C3.05083 13.7664 2.84693 13.2435 2.80817 12.6959C2.76941 12.1483 2.89758 11.6018 3.17579 11.1286L4.26151 9.22861C4.53112 8.76278 4.9331 8.38764 5.41638 8.15082C5.89969 7.914 6.44249 7.82622 6.97579 7.89861L10.1786 8.38718L14.1958 6.10718ZM13.5715 19C13.5715 20.0737 13.8899 21.1233 14.4864 22.016C15.0829 22.9087 15.9307 23.6045 16.9226 24.0154C17.9146 24.4262 19.0061 24.5338 20.0591 24.3243C21.1122 24.1148 22.0795 23.5978 22.8387 22.8386C23.5979 22.0794 24.1149 21.1121 24.3243 20.0591C24.5338 19.0061 24.4263 17.9146 24.0154 16.9226C23.6046 15.9307 22.9088 15.0828 22.016 14.4863C21.1233 13.8898 20.0737 13.5715 19.0001 13.5715C17.5603 13.5715 16.1796 14.1434 15.1615 15.1615C14.1435 16.1795 13.5715 17.5603 13.5715 19Z'
                            stroke='white'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='3'
                        />
                    </g>

                    <defs>
                        <clipPath id='clip0_19_167'>
                            <rect
                                fill='white'
                                height='38'
                                width='38'
                            />
                        </clipPath>
                    </defs>
                </svg>
            </button>

            <button
                className='btn btn-square rounded-md btn-ghost'
                onClick={handleLogout}
            >
                <svg
                    fill='none'
                    height='35'
                    viewBox='0 0 35 35'
                    width='35'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <g clipPath='url(#clip0_9_17)'>
                        <path
                            d='M23.75 26.25V31.25C23.75 31.913 23.4866 32.549 23.0178 33.0177C22.5489 33.4865 21.913 33.75 21.25 33.75H3.75C3.08695 33.75 2.45107 33.4865 1.98223 33.0177C1.51339 32.549 1.25 31.913 1.25 31.25V3.75C1.25 3.08695 1.51339 2.45107 1.98223 1.98223C2.45107 1.51339 3.08695 1.25 3.75 1.25H21.25C21.913 1.25 22.5489 1.51339 23.0178 1.98223C23.4866 2.45107 23.75 3.08695 23.75 3.75V8.75'
                            stroke='white'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='3'
                        />

                        <path
                            d='M33.75 17.5H13.75'
                            stroke='white'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='3'
                        />

                        <path
                            d='M18.75 12.5L13.75 17.5L18.75 22.5'
                            stroke='white'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='3'
                        />
                    </g>

                    <defs>
                        <clipPath id='clip0_9_17'>
                            <rect
                                fill='white'
                                height='35'
                                width='35'
                            />
                        </clipPath>
                    </defs>
                </svg>
            </button>
        </div>
    );
};
