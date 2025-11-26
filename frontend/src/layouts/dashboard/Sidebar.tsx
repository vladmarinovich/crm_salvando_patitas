import { NavLink } from 'react-router-dom';
import {
    HomeIcon,
    UsersIcon,
    HeartIcon,
    CurrencyDollarIcon,
    BriefcaseIcon,
    BuildingStorefrontIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Donantes', href: '/donantes', icon: UsersIcon },
    { name: 'Casos', href: '/casos', icon: HeartIcon },
    { name: 'Donaciones', href: '/donaciones', icon: CurrencyDollarIcon },
    { name: 'Gastos', href: '/gastos', icon: BriefcaseIcon },
    { name: 'Proveedores', href: '/proveedores', icon: BuildingStorefrontIcon },
];

import { useUIStore } from '@/core/stores/useUIStore';

export const Sidebar = () => {
    const { isSidebarOpen } = useUIStore();

    return (
        <div className={clsx(
            "flex flex-col w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 transition-transform duration-300 ease-in-out z-20",
            !isSidebarOpen && "-translate-x-full"
        )}>
            <div className="flex items-center justify-center h-16 border-b border-gray-200">
                <h1 className="text-xl font-bold text-primary-600">Salvando Patitas</h1>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1">
                {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                            clsx(
                                isActive
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors'
                            )
                        }
                    >
                        <item.icon
                            className={clsx(
                                'mr-3 flex-shrink-0 h-6 w-6',
                                'text-gray-400 group-hover:text-gray-500'
                            )}
                            aria-hidden="true"
                        />
                        {item.name}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-200">
                <NavLink
                    to="/configuracion"
                    className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
                >
                    <Cog6ToothIcon className="mr-3 h-6 w-6 text-gray-400" />
                    Configuración
                </NavLink>
            </div>
        </div>
    );
};
