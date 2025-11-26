import { DonanteForm } from '../components/DonanteForm';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export const CreateDonantePage = () => {
    const navigate = useNavigate();

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
                    <h1 className="text-2xl font-bold text-gray-900">Nuevo Donante</h1>
                    <p className="text-sm text-gray-500">Complete la información para registrar un nuevo donante.</p>
                </div>
            </div>

            <div className="card">
                <DonanteForm />
            </div>
        </div>
    );
};
