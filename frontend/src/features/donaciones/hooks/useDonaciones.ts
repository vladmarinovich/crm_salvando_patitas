import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { donacionesApi } from '../services/donacionesService';
import { DonacionFilters, Donacion } from '../types';

export const useDonaciones = (filters?: DonacionFilters) => {
    return useQuery({
        queryKey: ['donaciones', filters],
        queryFn: () => donacionesApi.getAll(filters),
    });
};

export const useDonacion = (id: number) => {
    return useQuery({
        queryKey: ['donaciones', id],
        queryFn: () => donacionesApi.getById(id),
        enabled: !!id,
    });
};

export const useCreateDonacion = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: donacionesApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['donaciones'] });
        },
    });
};

export const useUpdateDonacion = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Donacion> }) =>
            donacionesApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['donaciones'] });
        },
    });
};

export const useDeleteDonacion = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: donacionesApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['donaciones'] });
        },
    });
};
