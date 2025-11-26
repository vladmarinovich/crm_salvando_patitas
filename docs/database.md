# 🗄️ Base de Datos

El sistema utiliza **PostgreSQL** (alojado en Supabase) como motor de base de datos relacional.

## 🗺️ Modelo Entidad-Relación (ERD)

### Entidades Principales

#### 1. `Donante` (`donantes`)
Representa a una persona o entidad que realiza donaciones.
*   **PK**: `id_donante`
*   **Datos**: Nombre, identificación, contacto, ubicación.
*   **Relaciones**: Un Donante puede tener múltiples `Donaciones`.

#### 2. `Caso` (`casos`)
Representa un animal rescatado o un proyecto de ayuda.
*   **PK**: `id_caso`
*   **Datos**: Nombre, estado (Abierto, Adoptado, etc.), fechas, veterinaria, diagnóstico.
*   **Relaciones**:
    *   Pertenece a un `HogarDePaso` (FK).
    *   Recibe múltiples `Donaciones`.
    *   Genera múltiples `Gastos`.

#### 3. `Donacion` (`donaciones`)
Registro financiero de un ingreso.
*   **PK**: `id_donacion`
*   **Datos**: Monto, fecha, medio de pago, estado, comprobante.
*   **Relaciones**:
    *   Vinculada a un `Donante` (FK).
    *   Asignada a un `Caso` (FK).

#### 4. `Gasto` (`gastos`)
Registro financiero de un egreso.
*   **PK**: `id_gasto`
*   **Datos**: Monto, concepto, fecha, estado.
*   **Relaciones**:
    *   Pagado a un `Proveedor` (FK).
    *   Asignado a un `Caso` (FK).

#### 5. `Proveedor` (`proveedores`)
Entidad que suministra bienes o servicios (ej. Veterinarias, Tiendas).
*   **PK**: `id_proveedor`
*   **Datos**: Nombre, NIT, contacto.
*   **Relaciones**: Un Proveedor recibe múltiples pagos (`Gastos`).

#### 6. `HogarDePaso` (`hogar_de_paso`)
Lugar temporal donde se alojan los casos.
*   **PK**: `id_hogar_de_paso`
*   **Datos**: Nombre, ubicación, capacidad.
*   **Relaciones**: Alberga múltiples `Casos`.

## 🔗 Diagrama de Relaciones (Texto)

*   **Donante** `1` ---- `N` **Donacion**
*   **Caso** `1` ---- `N` **Donacion**
*   **Caso** `1` ---- `N` **Gasto**
*   **Proveedor** `1` ---- `N` **Gasto**
*   **HogarDePaso** `1` ---- `N` **Caso**

## 📝 Notas de Diseño
*   **Integridad Referencial**: Se utiliza `on_delete=models.CASCADE` en la mayoría de las relaciones, lo que significa que si se elimina un Caso, se eliminan sus donaciones y gastos asociados (esto debe manejarse con cuidado en producción, considerar `PROTECT` o `SET_NULL` para historial financiero).
*   **Auditoría**: Los campos `fecha_creacion` existen en varias tablas para trazabilidad.
