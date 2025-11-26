import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { donantesApi } from '../services/donantesService';
import { DonanteFilters, Donante } from '../types';

export const useDonantes = (filters?: DonanteFilters) => {
    return useQuery({
        queryKey: ['donantes', filters],
        queryFn: () => donantesApi.getAll(filters),
    });
};

export const useDonante = (id: number) => {
    return useQuery({
        queryKey: ['donantes', id],
        queryFn: () => donantesApi.getById(id),
        enabled: !!id,
    });
};

export const useDonanteDonaciones = (id: number) => {
    return useQuery({
        queryKey: ['donantes', id, 'donaciones'],
        queryFn: () => donantesApi.getDonaciones(id),
        enabled: !!id,
    });
};

export const useCreateDonante = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: donantesApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['donantes'] });
        },
    });
};

export const useUpdateDonante = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Donante> }) =>
            donantesApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['donantes'] });
        },
    });
};

export const useDeleteDonante = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: donantesApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['donantes'] });
        },
    });
};
