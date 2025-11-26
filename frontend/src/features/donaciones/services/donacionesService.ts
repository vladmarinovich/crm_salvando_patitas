import http from '@/api/axiosClient';
import { ENDPOINTS } from '@/api/endpoints';
import { Donacion, DonacionFilters } from '../types';
import { PaginatedResponse } from '@/types/api';

export const donacionesApi = {
    getAll: async (params?: DonacionFilters) => {
        const { data } = await http.get<PaginatedResponse<Donacion>>(ENDPOINTS.DONACIONES.LIST, { params });
        return data;
    },

    getById: async (id: number) => {
        const { data } = await http.get<Donacion>(ENDPOINTS.DONACIONES.DETAIL(id));
        return data;
    },

    create: async (donacion: Partial<Donacion>) => {
        const { data } = await http.post<Donacion>(ENDPOINTS.DONACIONES.CREATE, donacion);
        return data;
    },

    update: async (id: number, donacion: Partial<Donacion>) => {
        const { data } = await http.put<Donacion>(ENDPOINTS.DONACIONES.UPDATE(id), donacion);
        return data;
    },

    delete: async (id: number) => {
        await http.delete(ENDPOINTS.DONACIONES.DELETE(id));
    },
};
