import { useParams, useNavigate } from 'react-router-dom';
import { useProveedor, useProveedorGastos } from '../hooks/useProveedores';
import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

export const ProveedorDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: proveedor, isLoading, error } = useProveedor(Number(id));
    const { data: gastos, isLoading: isLoadingGastos } = useProveedorGastos(Number(id));

    if (isLoading) return <div className="p-4">Cargando información...</div>;
    if (error) return <div className="p-4 text-red-500">Error al cargar el proveedor</div>;
    if (!proveedor) return <div className="p-4 text-red-500">Proveedor no encontrado</div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/proveedores')}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                    >
                        <ArrowLeftIcon className="h-6 w-6" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{proveedor.nombre_proveedor}</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {proveedor.tipo_proveedor || 'General'}
                            </span>
                            {proveedor.nit && (
                                <span className="text-sm text-gray-500">NIT: {proveedor.nit}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={() => navigate(`/proveedores/${id}/editar`)}
                        className="flex items-center gap-2"
                    >
                        <PencilIcon className="h-4 w-4" />
                        Editar
                    </Button>
                    <Button
                        variant="danger"
                        className="flex items-center gap-2"
                    >
                        <TrashIcon className="h-4 w-4" />
                        Eliminar
                    </Button>
                </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Info */}
                <div className="card space-y-4 h-fit">
                    <h3 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">Información de Contacto</h3>
                    <div className="space-y-3">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Nombre de Contacto</p>
                            <p className="text-base text-gray-900">{proveedor.nombre_contacto || '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Correo Electrónico</p>
                            <p className="text-base text-gray-900">{proveedor.correo || '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Teléfono</p>
                            <p className="text-base text-gray-900">{proveedor.telefono || '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Ciudad</p>
                            <p className="text-base text-gray-900">{proveedor.ciudad || '-'}</p>
                        </div>
                    </div>
                </div>

                {/* Stats / History */}
                <div className="card space-y-4 flex flex-col h-[500px]">
                    <h3 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">Historial de Pagos</h3>

                    <div className="flex-1 overflow-y-auto pr-2">
                        {isLoadingGastos ? (
                            <p className="text-sm text-gray-500 italic text-center py-4">Cargando historial...</p>
                        ) : gastos && gastos.length > 0 ? (
                            <div className="space-y-3">
                                {gastos.map((gasto: any) => (
                                    <div
                                        key={gasto.id_gasto}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200"
                                        onClick={() => navigate(`/gastos/${gasto.id_gasto}`)}
                                    >
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{gasto.nombre_gasto}</p>
                                            <p className="text-xs text-gray-500">{new Date(gasto.fecha_pago).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-gray-900">${gasto.monto.toLocaleString()}</p>
                                            <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${gasto.estado === 'PAGADO' ? 'bg-green-100 text-green-800' :
                                                    gasto.estado === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {gasto.estado}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-sm text-gray-500 italic">No hay pagos registrados.</p>
                                <Button
                                    variant="outline"
                                    className="mt-4 text-xs"
                                    onClick={() => navigate('/gastos/nuevo')}
                                >
                                    Registrar primer pago
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
