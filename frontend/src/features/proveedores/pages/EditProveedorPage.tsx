import { useParams, useNavigate } from 'react-router-dom';
import { useProveedor } from '../hooks/useProveedores';
import { ProveedorForm } from '../components/ProveedorForm';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const EditProveedorPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: proveedor, isLoading, error } = useProveedor(Number(id));

    if (isLoading) return <div className="p-4">Cargando información...</div>;
    if (error) return <div className="p-4 text-red-500">Error al cargar el proveedor</div>;
    if (!proveedor) return <div className="p-4 text-red-500">Proveedor no encontrado</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/proveedores')}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                >
                    <ArrowLeftIcon className="h-6 w-6" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Editar Proveedor</h1>
                    <p className="text-sm text-gray-500 mt-1">Modifica la información de {proveedor.nombre_proveedor}</p>
                </div>
            </div>

            <div className="card max-w-3xl">
                <ProveedorForm initialData={proveedor} isEditing />
            </div>
        </div>
    );
};
