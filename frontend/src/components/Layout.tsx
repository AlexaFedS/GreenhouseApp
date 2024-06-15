import { Sidebar } from './Sidebar.tsx';

import type { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
    <div className='flex min-h-screen'>
        <Sidebar />
        <div className='flex flex-col w-full bg-white ml-48'>{children}</div>
    </div>
);
