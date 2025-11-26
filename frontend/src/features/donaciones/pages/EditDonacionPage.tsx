import { useParams, useNavigate } from 'react-router-dom';
import { useDonacion } from '../hooks/useDonaciones';
import { DonacionForm } from '../components/DonacionForm';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const EditDonacionPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: donacion, isLoading, error } = useDonacion(Number(id));

    if (isLoading) return <div className="p-4">Cargando información...</div>;
    if (error) return <div className="p-4 text-red-500">Error al cargar la donación</div>;
    if (!donacion) return <div className="p-4 text-red-500">Donación no encontrada</div>;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/donaciones')}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                >
                    <ArrowLeftIcon className="h-6 w-6" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Editar Donación</h1>
                    <p className="text-sm text-gray-500">Donación #{donacion.id_donacion}</p>
                </div>
            </div>

            <div className="card">
                <DonacionForm initialData={donacion} isEditing />
            </div>
        </div>
    );
};
