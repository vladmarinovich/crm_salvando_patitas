import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';
import ErrorImage from '@/assets/404_error.svg';

export const ErrorPage = () => {
    const error = useRouteError();
    let errorMessage: string;
    let errorTitle: string;

    if (isRouteErrorResponse(error)) {
        // Errores conocidos de React Router (404, 401, etc)
        errorTitle = `${error.status} - ${error.statusText}`;
        errorMessage = error.data?.message || 'Lo sentimos, no pudimos encontrar lo que buscabas.';
    } else if (error instanceof Error) {
        // Errores inesperados (bugs)
        errorTitle = '¡Ups! Algo salió mal';
        errorMessage = error.message;
    } else {
        errorTitle = 'Error desconocido';
        errorMessage = 'Ha ocurrido un error inesperado.';
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100 flex flex-col items-center">
                <img src={ErrorImage} alt="Error Illustration" className="w-48 h-48 mb-6" />

                <h1 className="text-2xl font-bold text-gray-900 mb-2">{errorTitle}</h1>
                <p className="text-gray-500 mb-8">{errorMessage}</p>

                <div className="flex flex-col gap-3">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                    >
                        <HomeIcon className="w-5 h-5 mr-2" />
                        Volver al Inicio
                    </Link>

                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center justify-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                    >
                        Intentar recargar
                    </button>
                </div>
            </div>
        </div>
    );
};
