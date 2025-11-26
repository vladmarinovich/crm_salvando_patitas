export interface Gasto {
    id_gasto: number;
    nombre_gasto: string;
    fecha_pago: string;
    id_caso: number;
    caso_nombre?: string; // For display
    medio_pago: string;
    monto: number;
    estado: 'PAGADO' | 'PENDIENTE' | 'ANULADO';
    comprobante?: string;
    id_proveedor: number;
    proveedor_nombre?: string; // For display
}

export interface GastoFilters {
    search?: string;
    estado?: string;
    fecha_inicio?: string;
    fecha_fin?: string;
    page?: number;
    page_size?: number;
}

export interface Proveedor {
    id_proveedor: number;
    nombre_proveedor: string;
    tipo_proveedor?: string;
    nit?: string;
    nombre_contacto?: string;
    correo?: string;
    telefono?: string;
    ciudad?: string;
}
