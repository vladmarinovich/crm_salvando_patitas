import { useParams, useNavigate } from 'react-router-dom';
import { useDonante } from '../hooks/useDonantes';
import { DonanteForm } from '../components/DonanteForm';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const EditDonantePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: donante, isLoading, error } = useDonante(Number(id));

    if (isLoading) return <div className="p-4">Cargando información del donante...</div>;
    if (error) return <div className="p-4 text-red-500">Error al cargar el donante</div>;
    if (!donante) return <div className="p-4 text-red-500">Donante no encontrado</div>;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/donantes')}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                >
                    <ArrowLeftIcon className="h-6 w-6" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Editar Donante</h1>
                    <p className="text-sm text-gray-500">Actualiza la información de {donante.donante}</p>
                </div>
            </div>

            <div className="card">
                <DonanteForm initialData={donante} isEditing />
            </div>
        </div>
    );
};
