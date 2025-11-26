# 🔐 Seguridad

## ⚠️ Auditoría de Seguridad (Nov 2025)

### ✅ Historial de Auditoría (Nov 2025)

1.  **Credenciales Hardcodeadas**: Se detectaron credenciales de base de datos y llaves de API en `backend/settings.py` y `frontend/src/core/lib/supabase.ts`.
    *   **Estado**: ✅ **Corregido**.
    *   **Acción Tomada**: Se movieron todas las credenciales a archivos `.env` y se eliminaron los valores por defecto inseguros. El sistema ahora falla explícitamente si no encuentra las variables de entorno.

2.  **Código Legacy**: La carpeta `crm_app_legacy` contenía código antiguo no utilizado.
    *   **Estado**: ✅ **Corregido**.
    *   **Acción Tomada**: Carpeta eliminada completamente del repositorio.

### 🛡️ Prácticas Implementadas
*   **Autenticación Robusta**: Uso de Supabase Auth (JWT) en lugar de un sistema de auth casero.
*   **HTTPS**: El frontend y backend deben servirse exclusivamente sobre HTTPS en producción.
*   **CORS**: Configurado para permitir orígenes específicos (actualmente `*` en dev, debe restringirse en prod).

## 📝 Variables de Entorno Requeridas

### Backend (`.env`)
```bash
DEBUG=False
SECRET_KEY=tu_secret_key_segura
ALLOWED_HOSTS=api.tudominio.com

# Base de Datos
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=tu_password_seguro
DB_HOST=db.supabase.co
DB_PORT=5432

# Supabase
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu_service_role_key_o_anon_key
```

### Frontend (`.env`)
```bash
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_KEY=tu_anon_key
```
