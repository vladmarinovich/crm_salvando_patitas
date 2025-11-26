import { DonacionForm } from '../components/DonacionForm';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export const CreateDonacionPage = () => {
    const navigate = useNavigate();

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
                    <h1 className="text-2xl font-bold text-gray-900">Nueva Donación</h1>
                    <p className="text-sm text-gray-500">Registra un nuevo ingreso financiero.</p>
                </div>
            </div>

            <div className="card">
                <DonacionForm />
            </div>
        </div>
    );
};
