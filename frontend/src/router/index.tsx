import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from '@/layouts/dashboard/Layout';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { LoginPage } from '@/features/auth/LoginPage';
import { ErrorPage } from '@/components/ui/ErrorPage';
import { DonantesPage } from '@/features/donantes/pages/DonantesPage';
import { CreateDonantePage } from '@/features/donantes/pages/CreateDonantePage';
import { EditDonantePage } from '@/features/donantes/pages/EditDonantePage';
import { DonanteDetailPage } from '@/features/donantes/pages/DonanteDetailPage';
import { CasosPage } from '@/features/casos/pages/CasosPage';
import { CreateCasoPage } from '@/features/casos/pages/CreateCasoPage';
import { EditCasoPage } from '@/features/casos/pages/EditCasoPage';
import { CasoDetailPage } from '@/features/casos/pages/CasoDetailPage';
import { DonacionesPage } from '@/features/donaciones/pages/DonacionesPage';
import { CreateDonacionPage } from '@/features/donaciones/pages/CreateDonacionPage';
import { EditDonacionPage } from '@/features/donaciones/pages/EditDonacionPage';
import { DonacionDetailPage } from '@/features/donaciones/pages/DonacionDetailPage';
import { GastosPage } from '@/features/gastos/pages/GastosPage';
import { CreateGastoPage } from '@/features/gastos/pages/CreateGastoPage';
import { EditGastoPage } from '@/features/gastos/pages/EditGastoPage';
import { GastoDetailPage } from '@/features/gastos/pages/GastoDetailPage';
import { ProveedoresPage } from '@/features/proveedores/pages/ProveedoresPage';
import { CreateProveedorPage } from '@/features/proveedores/pages/CreateProveedorPage';
import { EditProveedorPage } from '@/features/proveedores/pages/EditProveedorPage';
import { ProveedorDetailPage } from '@/features/proveedores/pages/ProveedorDetailPage';

const queryClient = new QueryClient();

import { ProtectedRoute } from './ProtectedRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <Layout />,
                children: [
                    {
                        index: true,
                        element: <DashboardPage />,
                    },
                    {
                        path: 'donantes',
                        element: <DonantesPage />,
                    },
                    {
                        path: 'donantes/nuevo',
                        element: <CreateDonantePage />,
                    },
                    {
                        path: 'donantes/:id',
                        element: <DonanteDetailPage />,
                    },
                    {
                        path: 'donantes/:id/editar',
                        element: <EditDonantePage />,
                    },
                    {
                        path: 'casos',
                        element: <CasosPage />,
                    },
                    {
                        path: 'casos/nuevo',
                        element: <CreateCasoPage />,
                    },
                    {
                        path: 'casos/:id',
                        element: <CasoDetailPage />,
                    },
                    {
                        path: 'casos/:id/editar',
                        element: <EditCasoPage />,
                    },
                    {
                        path: 'donaciones',
                        element: <DonacionesPage />,
                    },
                    {
                        path: 'donaciones/nueva',
                        element: <CreateDonacionPage />,
                    },
                    {
                        path: 'donaciones/:id',
                        element: <DonacionDetailPage />,
                    },
                    {
                        path: 'donaciones/:id/editar',
                        element: <EditDonacionPage />,
                    },
                    {
                        path: 'gastos',
                        element: <GastosPage />,
                    },
                    {
                        path: 'gastos/nuevo',
                        element: <CreateGastoPage />,
                    },
                    {
                        path: 'gastos/:id',
                        element: <GastoDetailPage />,
                    },
                    {
                        path: 'gastos/:id/editar',
                        element: <EditGastoPage />,
                    },
                    {
                        path: 'proveedores',
                        element: <ProveedoresPage />,
                    },
                    {
                        path: 'proveedores/nuevo',
                        element: <CreateProveedorPage />,
                    },
                    {
                        path: 'proveedores/:id',
                        element: <ProveedorDetailPage />,
                    },
                    {
                        path: 'proveedores/:id/editar',
                        element: <EditProveedorPage />,
                    },
                    {
                        path: 'configuracion',
                        element: <div className="p-8 text-center text-gray-500">🚧 Módulo de Configuración en construcción</div>,
                    },
                ],
            },
        ],
    },
    {
        path: '/login',
        element: <LoginPage />,
        errorElement: <ErrorPage />,
    },
]);

export const AppRouter = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
};
