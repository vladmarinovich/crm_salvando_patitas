import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { gastosApi, proveedoresApi } from '../services/gastosService';
import { GastoFilters, Gasto } from '../types';

export const useGastos = (filters?: GastoFilters) => {
    return useQuery({
        queryKey: ['gastos', filters],
        queryFn: () => gastosApi.getAll(filters),
    });
};

export const useGasto = (id: number) => {
    return useQuery({
        queryKey: ['gastos', id],
        queryFn: () => gastosApi.getById(id),
        enabled: !!id,
    });
};

export const useCreateGasto = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: gastosApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gastos'] });
        },
    });
};

export const useUpdateGasto = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Gasto> }) =>
            gastosApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gastos'] });
        },
    });
};

export const useDeleteGasto = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: gastosApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gastos'] });
        },
    });
};

export const useProveedores = (search?: string) => {
    return useQuery({
        queryKey: ['proveedores', search],
        queryFn: () => proveedoresApi.getAll(search),
    });
};
