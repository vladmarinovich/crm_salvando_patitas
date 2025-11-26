export interface Donante {
    id_donante: number;
    donante: string;
    tipo_id: string;
    identificacion: string;
    correo: string;
    telefono: string;
    ciudad: string;
    pais: string;
    tipo_donante: string;
    notas?: string;
    fecha_creacion: string;
    total_donado?: number; // From serializer
}

export interface DonanteFilters {
    search?: string;
    tipo_donante?: string;
    ciudad?: string;
    page?: number;
    page_size?: number;
}
