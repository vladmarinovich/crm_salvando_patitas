import { CasoForm } from '../components/CasoForm';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export const CreateCasoPage = () => {
    const navigate = useNavigate();

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
                    <h1 className="text-2xl font-bold text-gray-900">Nuevo Caso</h1>
                    <p className="text-sm text-gray-500">Registra un nuevo caso de rescate.</p>
                </div>
            </div>

            <div className="card">
                <CasoForm />
            </div>
        </div>
    );
};
