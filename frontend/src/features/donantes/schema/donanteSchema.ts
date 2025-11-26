import { z } from 'zod';

export const donanteSchema = z.object({
    donante: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    tipo_id: z.enum(['CC', 'CE', 'NIT', 'PASAPORTE'], {
        errorMap: () => ({ message: 'Seleccione un tipo de identificación válido' })
    }),
    identificacion: z.string().min(5, 'La identificación debe tener al menos 5 caracteres'),
    correo: z.string().email('Ingrese un correo electrónico válido'),
    telefono: z.string().min(7, 'El teléfono debe tener al menos 7 dígitos'),
    ciudad: z.string().min(3, 'Ingrese una ciudad válida'),
    pais: z.string().min(3, 'Ingrese un país válido').default('Colombia'),
    tipo_donante: z.enum(['PERSONA_NATURAL', 'EMPRESA', 'FUNDACION', 'OTRO'], {
        errorMap: () => ({ message: 'Seleccione un tipo válido' })
    }),
    notas: z.string().optional(),
});

export type DonanteFormData = z.infer<typeof donanteSchema>;
