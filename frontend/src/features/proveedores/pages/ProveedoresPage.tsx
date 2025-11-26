import { useState } from 'react';
import { useProveedores } from '../hooks/useProveedores';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@/components/ui/Pagination';
import { useDebounce } from '@/hooks/useDebounce';

export const ProveedoresPage = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    const { data, isLoading, error } = useProveedores({
        page,
        page_size: pageSize,
        search: debouncedSearch
    });

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        setPage(1);
    };

    if (isLoading) return <div className="p-4">Cargando proveedores...</div>;
    if (error) return <div className="p-4 text-red-500">Error al cargar proveedores</div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Proveedores</h1>
                    <p className="text-sm text-gray-500 mt-1">Gestiona la base de datos de proveedores y servicios</p>
                </div>
                <button
                    onClick={() => navigate('/proveedores/nuevo')}
                    className="btn-primary flex items-center justify-center gap-2"
                >
                    <PlusIcon className="h-5 w-5" />
                    Nuevo Proveedor
                </button>
            </div>

            {/* Filters */}
            <div className="card flex items-center gap-4">
                <div className="relative flex-1">
                    <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, NIT, contacto..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="card overflow-hidden p-0">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proveedor</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Acciones</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data?.results.map((proveedor) => (
                                <tr key={proveedor.id_proveedor} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{proveedor.nombre_proveedor}</div>
                                        <div className="text-xs text-gray-500">{proveedor.nit}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {proveedor.tipo_proveedor || 'General'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{proveedor.nombre_contacto}</div>
                                        <div className="text-xs text-gray-500">{proveedor.telefono}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {proveedor.ciudad || '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => navigate(`/proveedores/${proveedor.id_proveedor}`)}
                                            className="text-gray-600 hover:text-primary-900 mr-3"
                                        >
                                            Ver
                                        </button>
                                        <button
                                            onClick={() => navigate(`/proveedores/${proveedor.id_proveedor}/editar`)}
                                            className="text-primary-600 hover:text-primary-900"
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {data && (
                    <Pagination
                        currentPage={page}
                        totalItems={data.count}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                        className="px-6 border-t border-gray-200"
                    />
                )}
            </div>
        </div>
    );
};
