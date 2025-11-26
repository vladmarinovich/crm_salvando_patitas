import { useParams, useNavigate } from 'react-router-dom';
import { useCaso } from '../hooks/useCasos';
import { CasoForm } from '../components/CasoForm';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const EditCasoPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: caso, isLoading, error } = useCaso(Number(id));

    if (isLoading) return <div className="p-4">Cargando información del caso...</div>;
    if (error) return <div className="p-4 text-red-500">Error al cargar el caso</div>;
    if (!caso) return <div className="p-4 text-red-500">Caso no encontrado</div>;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/casos')}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                >
                    <ArrowLeftIcon className="h-6 w-6" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Editar Caso</h1>
                    <p className="text-sm text-gray-500">Actualiza la información de {caso.nombre_caso}</p>
                </div>
            </div>

            <div className="card">
                <CasoForm initialData={caso} isEditing />
            </div>
        </div>
    );
};
