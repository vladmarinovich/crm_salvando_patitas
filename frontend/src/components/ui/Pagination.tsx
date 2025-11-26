import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    className?: string;
}

export const Pagination = ({
    currentPage,
    totalItems,
    pageSize,
    onPageChange,
    onPageSizeChange,
    className,
}: PaginationProps) => {
    const totalPages = Math.ceil(totalItems / pageSize);
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    if (totalItems === 0) return null;

    return (
        <div className={clsx("flex flex-col sm:flex-row items-center justify-between gap-4 py-3", className)}>
            {/* Mobile: Simple Prev/Next */}
            <div className="flex flex-1 justify-between sm:hidden w-full">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Anterior
                </button>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Siguiente
                </button>
            </div>

            {/* Desktop: Full Pagination */}
            <div className="hidden sm:flex flex-1 items-center justify-between">
                <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">{startItem}</span> a <span className="font-medium">{endItem}</span> de{' '}
                        <span className="font-medium">{totalItems}</span> resultados
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Filas por página:</span>
                        <select
                            value={pageSize}
                            onChange={(e) => onPageSizeChange(Number(e.target.value))}
                            className="block w-full rounded-md border-gray-300 py-1.5 text-base leading-5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 sm:text-sm sm:leading-5"
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>

                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="sr-only">Anterior</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>

                        {/* Page Numbers Logic - Simplified for now */}
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            // Logic to show a window of pages around current page could be added here
                            // For now, simple logic or just showing current page context
                            let pageNum = i + 1;
                            if (totalPages > 5) {
                                if (currentPage > 3) {
                                    pageNum = currentPage - 2 + i;
                                }
                                if (pageNum > totalPages) return null;
                            }

                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => onPageChange(pageNum)}
                                    aria-current={currentPage === pageNum ? 'page' : undefined}
                                    className={clsx(
                                        currentPage === pageNum
                                            ? 'relative z-10 inline-flex items-center bg-primary-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
                                            : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                    )}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="sr-only">Siguiente</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};
