import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { proveedoresApi } from '../services/proveedoresService';
import { ProveedorFilters, Proveedor } from '../types';

export const useProveedores = (filters?: ProveedorFilters) => {
    return useQuery({
        queryKey: ['proveedores', filters],
        queryFn: () => proveedoresApi.getAll(filters),
    });
};

export const useProveedor = (id: number) => {
    return useQuery({
        queryKey: ['proveedores', id],
        queryFn: () => proveedoresApi.getById(id),
        enabled: !!id,
    });
};

export const useCreateProveedor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: proveedoresApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['proveedores'] });
        },
    });
};

export const useUpdateProveedor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Proveedor> }) =>
            proveedoresApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['proveedores'] });
        },
    });
};

export const useDeleteProveedor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: proveedoresApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['proveedores'] });
        },
    });
};

export const useProveedorGastos = (id: number) => {
    return useQuery({
        queryKey: ['proveedores', id, 'gastos'],
        queryFn: () => proveedoresApi.getGastos(id),
        enabled: !!id,
    });
};
