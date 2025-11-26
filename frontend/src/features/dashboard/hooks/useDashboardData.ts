import { useQuery } from '@tanstack/react-query';
import http from '@/api/axiosClient';

export const useDashboardData = (startDate?: string, endDate?: string) => {
    return useQuery({
        queryKey: ['dashboard', startDate, endDate],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (startDate) params.append('start_date', startDate);
            if (endDate) params.append('end_date', endDate);

            const { data } = await http.get(`/dashboard/?${params.toString()}`);
            return data;
        },
    });
};
