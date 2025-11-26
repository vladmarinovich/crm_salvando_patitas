import { z } from 'zod';

export const proveedorSchema = z.object({
    nombre_proveedor: z.string().min(3, 'El nombre es requerido'),
    tipo_proveedor: z.string().optional(),
    nit: z.string().optional(),
    nombre_contacto: z.string().optional(),
    correo: z.string().email('Correo inválido').optional().or(z.literal('')),
    telefono: z.string().optional(),
    ciudad: z.string().optional(),
});

export type ProveedorFormData = z.infer<typeof proveedorSchema>;
