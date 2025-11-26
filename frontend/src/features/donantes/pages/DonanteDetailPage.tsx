import { useParams, useNavigate } from 'react-router-dom';
import { useDonante, useDonanteDonaciones } from '../hooks/useDonantes';
import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

export const DonanteDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: donante, isLoading, error } = useDonante(Number(id));
    const { data: donaciones, isLoading: isLoadingDonaciones } = useDonanteDonaciones(Number(id));

    if (isLoading) return <div className="p-4">Cargando información...</div>;
    if (error) return <div className="p-4 text-red-500">Error al cargar el donante</div>;
    if (!donante) return <div className="p-4 text-red-500">Donante no encontrado</div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/donantes')}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                    >
                        <ArrowLeftIcon className="h-6 w-6" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{donante.donante}</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${donante.tipo_donante === 'RECURRENTE' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                }`}>
                                {donante.tipo_donante}
                            </span>
                            <span className="text-sm text-gray-500">Registrado el {new Date(donante.fecha_creacion).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={() => navigate(`/donantes/${id}/editar`)}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Contact Info */}
                <div className="card md:col-span-2 space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">Información de Contacto</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Identificación</p>
                            <p className="text-base text-gray-900">{donante.tipo_id} {donante.identificacion}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Correo Electrónico</p>
                            <p className="text-base text-gray-900">{donante.correo}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Teléfono</p>
                            <p className="text-base text-gray-900">{donante.telefono}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Ubicación</p>
                            <p className="text-base text-gray-900">{donante.ciudad}, {donante.pais}</p>
                        </div>
                    </div>
                    {donante.notas && (
                        <div className="pt-2">
                            <p className="text-sm font-medium text-gray-500">Notas</p>
                            <p className="text-base text-gray-900 mt-1 bg-gray-50 p-3 rounded-lg">{donante.notas}</p>
                        </div>
                    )}
                </div>

                {/* Stats Summary & History */}
                <div className="card space-y-4 flex flex-col h-full">
                    <h3 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">Resumen</h3>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Donado</p>
                        <p className="text-3xl font-bold text-primary-600 mt-1">
                            ${donante.total_donado?.toLocaleString() || '0'}
                        </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex-1 flex flex-col">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Historial de Donaciones</h4>
                        {isLoadingDonaciones ? (
                            <p className="text-sm text-gray-500 italic">Cargando historial...</p>
                        ) : donaciones && donaciones.length > 0 ? (
                            <div className="space-y-3 overflow-y-auto max-h-[300px] pr-2">
                                {donaciones.map((d: any) => (
                                    <div
                                        key={d.id_donacion}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                        onClick={() => navigate(`/donaciones/${d.id_donacion}`)}
                                    >
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">${d.monto.toLocaleString()}</p>
                                            <p className="text-xs text-gray-500">{new Date(d.fecha_donacion).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${['APROBADA', 'completado', 'confirmado'].includes(d.estado) ? 'bg-green-100 text-green-800' :
                                                    ['PENDIENTE', 'pendiente'].includes(d.estado) ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {d.estado}
                                            </span>
                                            {d.caso_nombre && (
                                                <p className="text-[10px] text-gray-500 mt-1 truncate max-w-[100px]" title={d.caso_nombre}>
                                                    {d.caso_nombre}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 italic">No hay donaciones registradas.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
