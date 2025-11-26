# 🔙 Backend Documentation

El backend es una API RESTful construida con **Django** y **Django REST Framework (DRF)**.

## 🏗️ Estructura de Apps
El proyecto está modularizado en "apps" de Django dentro de la carpeta `backend/apps/`:

1.  **`core`**:
    *   Contiene la lógica transversal y el Dashboard.
    *   `DashboardView`: Agrega datos de múltiples modelos para los KPIs.
2.  **`users`**:
    *   Maneja la autenticación personalizada.
    *   `SupabaseAuthentication`: Clase que valida tokens JWT de Supabase.
    *   `SupabaseAuthBackend`: Permite login en Django Admin usando credenciales de Supabase.
3.  **`casos`**:
    *   Modelos: `Caso`, `HogarDePaso`.
    *   Lógica de negocio para seguimiento de rescates.
4.  **`donaciones`**:
    *   Modelos: `Donante`, `Donacion`.
    *   Gestión de ingresos financieros.
5.  **`finanzas`**:
    *   Modelos: `Gasto`, `Proveedor`.
    *   Gestión de egresos financieros.

## 🛡️ Seguridad y Autenticación
*   **No se manejan contraseñas locales**: La autenticación delega completamente en Supabase.
*   **Validación de Token**: Cada request protegido debe incluir un header `Authorization: Bearer <token>`. El backend valida este token contra la API de Supabase (o verificando la firma si se implementa localmente).
*   **Usuarios Django**: Se crean usuarios "shadow" en Django (`User` model) correspondientes a los usuarios de Supabase para mantener la compatibilidad con el ORM y el Admin de Django.

## ⚙️ Configuración
La configuración se maneja en `backend/settings.py` y utiliza `python-dotenv` para cargar variables de entorno.
**Variables Críticas**:
*   `DATABASE_URL` / Credenciales DB.
*   `SUPABASE_URL`
*   `SUPABASE_KEY`
*   `SECRET_KEY`
*   `DEBUG` (Debe ser `False` en producción).
