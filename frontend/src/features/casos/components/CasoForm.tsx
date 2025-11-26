import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { CasoFormData, casoSchema } from '../schema/casoSchema';
import { useCreateCaso, useUpdateCaso } from '../hooks/useCasos';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Caso } from '../types';

interface CasoFormProps {
    initialData?: Caso;
    isEditing?: boolean;
}

export const CasoForm = ({ initialData, isEditing = false }: CasoFormProps) => {
    const navigate = useNavigate();
    const createMutation = useCreateCaso();
    const updateMutation = useUpdateCaso();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CasoFormData>({
        resolver: zodResolver(casoSchema),
        defaultValues: (initialData as any) || {
            estado: 'ABIERTO',
            fecha_ingreso: new Date().toISOString().split('T')[0],
        },
    });

    const onSubmit: SubmitHandler<CasoFormData> = async (data) => {
        try {
            // Clean up empty optional fields
            const cleanData = {
                ...data,
                fecha_salida: data.fecha_salida || null,
                id_hogar_de_paso: data.id_hogar_de_paso || null,
            };

            if (isEditing && initialData) {
                await updateMutation.mutateAsync({ id: initialData.id_caso, data: cleanData as any });
            } else {
                await createMutation.mutateAsync(cleanData as any);
            }
            navigate('/casos');
        } catch (error) {
            console.error('Error saving caso:', error);
        }
    };

    const isLoading = createMutation.isPending || updateMutation.isPending || isSubmitting;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                    <Input
                        label="Nombre del Caso"
                        {...register('nombre_caso')}
                        error={errors.nombre_caso?.message}
                        placeholder="Ej: Rescate de Luna"
                    />
                </div>

                <Select
                    label="Estado"
                    {...register('estado')}
                    error={errors.estado?.message}
                    options={[
                        { value: 'ABIERTO', label: 'Abierto' },
                        { value: 'EN_TRATAMIENTO', label: 'En Tratamiento' },
                        { value: 'ADOPTADO', label: 'Adoptado' },
                        { value: 'FALLECIDO', label: 'Fallecido' },
                        { value: 'CERRADO', label: 'Cerrado' },
                    ]}
                />

                <Input
                    label="Fecha de Ingreso"
                    type="date"
                    {...register('fecha_ingreso')}
                    error={errors.fecha_ingreso?.message}
                />

                <Input
                    label="Fecha de Salida (Opcional)"
                    type="date"
                    {...register('fecha_salida')}
                    error={errors.fecha_salida?.message}
                />

                <Input
                    label="Veterinaria (Opcional)"
                    {...register('veterinaria')}
                    error={errors.veterinaria?.message}
                    placeholder="Ej: Vet. San Francisco"
                />

                {/* TODO: Replace with a proper Select fetching Hogares de Paso */}
                <Input
                    label="ID Hogar de Paso (Opcional)"
                    type="number"
                    {...register('id_hogar_de_paso')}
                    error={errors.id_hogar_de_paso?.message}
                    placeholder="ID del hogar"
                />
            </div>

            <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Diagnóstico / Descripción
                </label>
                <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    rows={4}
                    {...register('diagnostico')}
                    placeholder="Detalles del caso, diagnóstico médico, historia..."
                ></textarea>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/casos')}
                    disabled={isLoading}
                >
                    Cancelar
                </Button>
                <Button type="submit" isLoading={isLoading}>
                    {isEditing ? 'Actualizar Caso' : 'Crear Caso'}
                </Button>
            </div>
        </form>
    );
};
