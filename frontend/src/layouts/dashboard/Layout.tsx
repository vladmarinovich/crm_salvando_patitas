import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useUIStore } from '@/core/stores/useUIStore';
import clsx from 'clsx';

export const Layout = () => {
    const { isSidebarOpen } = useUIStore();

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <Topbar />

            <main className={clsx(
                "pt-16 transition-all duration-300 ease-in-out",
                isSidebarOpen ? "pl-64" : "pl-0"
            )}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
