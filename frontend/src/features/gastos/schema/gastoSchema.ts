import { z } from 'zod';

export const gastoSchema = z.object({
    nombre_gasto: z.string().min(3, 'El nombre del gasto es requerido'),
    fecha_pago: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', {
        message: 'Fecha inválida',
    }),
    id_caso: z.number({ invalid_type_error: 'Seleccione un caso' }).positive('Seleccione un caso'),
    id_proveedor: z.number({ invalid_type_error: 'Seleccione un proveedor' }).positive('Seleccione un proveedor'),
    medio_pago: z.string().min(1, 'Seleccione un medio de pago'),
    monto: z.number().positive('El monto debe ser mayor a 0'),
    estado: z.enum(['PAGADO', 'PENDIENTE', 'ANULADO'], {
        errorMap: () => ({ message: 'Seleccione un estado válido' })
    }),
    comprobante: z.string().optional(),
});

export type GastoFormData = z.infer<typeof gastoSchema>;
