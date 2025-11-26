import { useParams, useNavigate } from 'react-router-dom';
import { useGasto } from '../hooks/useGastos';
import { GastoForm } from '../components/GastoForm';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const EditGastoPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: gasto, isLoading, error } = useGasto(Number(id));

    if (isLoading) return <div className="p-4">Cargando información...</div>;
    if (error) return <div className="p-4 text-red-500">Error al cargar el gasto</div>;
    if (!gasto) return <div className="p-4 text-red-500">Gasto no encontrado</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/gastos')}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                >
                    <ArrowLeftIcon className="h-6 w-6" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Editar Gasto</h1>
                    <p className="text-sm text-gray-500 mt-1">Modifica la información del egreso #{id}</p>
                </div>
            </div>

            <div className="card max-w-3xl">
                <GastoForm initialData={gasto} isEditing />
            </div>
        </div>
    );
};
