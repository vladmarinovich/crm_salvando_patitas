import { useState } from 'react';
import { useDashboardData } from './hooks/useDashboardData';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/utils/formatCurrency';
import {
    CurrencyDollarIcon,
    HeartIcon,
    BanknotesIcon
} from '@heroicons/react/24/outline';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

export const DashboardPage = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { data, isLoading, isError } = useDashboardData(startDate, endDate);

    if (isLoading) return <div className="p-8 text-center">Cargando dashboard...</div>;
    if (isError) return <div className="p-8 text-center text-red-500">Error cargando datos.</div>;

    const { kpis, top_ciudades, casos_destacados } = data;

    const stats = [
        { name: 'Total Donado', value: formatCurrency(kpis.total_donado), icon: CurrencyDollarIcon, color: 'text-green-600', bg: 'bg-green-100' },
        { name: 'Total Gastado', value: formatCurrency(kpis.total_gastado), icon: BanknotesIcon, color: 'text-red-600', bg: 'bg-red-100' },
        { name: 'Balance Neto', value: formatCurrency(kpis.balance_neto), icon: CurrencyDollarIcon, color: 'text-blue-600', bg: 'bg-blue-100' },
        { name: 'Casos Activos', value: kpis.casos_activos_count, icon: HeartIcon, color: 'text-pink-600', bg: 'bg-pink-100' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard General</h1>
                <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
                    <span className="text-sm text-gray-500 font-medium pl-2">Filtrar por fecha:</span>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border-0 focus:ring-0 text-sm text-gray-600"
                    />
                    <span className="text-gray-400">→</span>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border-0 focus:ring-0 text-sm text-gray-600"
                    />
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <Card key={item.name} className="flex flex-col items-start p-5">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full ${item.bg} mb-4`}>
                            <item.icon className={`h-5 w-5 ${item.color} mr-2`} />
                            <span className={`text-sm font-medium ${item.color}`}>{item.name}</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{item.value}</p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Ciudades Chart */}
                <Card title="Donaciones por Ciudad">
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={top_ciudades}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="ciudad" />
                                <YAxis />
                                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                                <Bar dataKey="total_dinero" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Casos Destacados Table */}
                <Card title="Casos con Mayor Actividad">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Caso</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Movimientos</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {casos_destacados.map((caso: any) => (
                                    <tr key={caso.id_caso}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{caso.nombre_caso}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${caso.estado === 'ABIERTO' ? 'bg-green-100 text-green-800' :
                                                    caso.estado === 'EN_TRATAMIENTO' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {caso.estado}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{caso.movimientos}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};
