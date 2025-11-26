import { z } from 'zod';

export const donacionSchema = z.object({
    id_donante: z.coerce.number({ required_error: 'Seleccione un donante' }).min(1, 'Seleccione un donante'),
    id_caso: z.coerce.number().optional(),
    fecha_donacion: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Ingrese una fecha válida',
    }),
    monto: z.coerce.number().min(1, 'El monto debe ser mayor a 0'),
    medio_pago: z.enum(['EFECTIVO', 'TRANSFERENCIA', 'TARJETA', 'WOMPI', 'PAYU', 'OTRO'], {
        errorMap: () => ({ message: 'Seleccione un medio de pago válido' })
    }),
    estado: z.enum(['APROBADA', 'PENDIENTE', 'RECHAZADA'], {
        errorMap: () => ({ message: 'Seleccione un estado válido' })
    }),
    comprobante: z.string().optional(),
});

export type DonacionFormData = z.infer<typeof donacionSchema>;
