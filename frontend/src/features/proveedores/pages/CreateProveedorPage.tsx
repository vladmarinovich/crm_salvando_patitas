import { ProveedorForm } from '../components/ProveedorForm';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export const CreateProveedorPage = () => {
    const navigate = useNavigate();

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
                    <h1 className="text-2xl font-bold text-gray-900">Registrar Nuevo Proveedor</h1>
                    <p className="text-sm text-gray-500 mt-1">Ingresa los datos de la empresa o persona</p>
                </div>
            </div>

            <div className="card max-w-3xl">
                <ProveedorForm />
            </div>
        </div>
    );
};
