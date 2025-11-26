import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { casosApi } from '../services/casosService';
import { CasoFilters, Caso } from '../types';

export const useCasos = (filters?: CasoFilters) => {
    return useQuery({
        queryKey: ['casos', filters],
        queryFn: () => casosApi.getAll(filters),
    });
};

export const useCaso = (id: number) => {
    return useQuery({
        queryKey: ['casos', id],
        queryFn: () => casosApi.getById(id),
        enabled: !!id,
    });
};

export const useCasoBalance = (id: number) => {
    return useQuery({
        queryKey: ['casos', id, 'balance'],
        queryFn: () => casosApi.getBalance(id),
        enabled: !!id,
    });
};

export const useCreateCaso = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: casosApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['casos'] });
        },
    });
};

export const useUpdateCaso = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Caso> }) =>
            casosApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['casos'] });
        },
    });
};

export const useDeleteCaso = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: casosApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['casos'] });
        },
    });
};
