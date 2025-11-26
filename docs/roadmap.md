# 🗺️ Roadmap & Mejoras

## 🚀 Próximos Pasos (Inmediatos)
1.  **Limpieza de Seguridad**: Eliminar hardcoded secrets y carpeta `crm_app_legacy`.
2.  **Testing**: Implementar pruebas unitarias y de integración.
    *   Backend: `pytest` para vistas y modelos.
    *   Frontend: `Vitest` + `React Testing Library`.
3.  **CI/CD**: Configurar GitHub Actions para correr linter y tests en cada PR.

## 🔮 Futuras Mejoras
*   **Reportes PDF**: Generar reportes de gastos/ingresos descargables.
*   **Notificaciones**: Alertas por correo cuando un caso requiere atención o el balance es negativo.
*   **Roles y Permisos**: Implementar roles (Admin, Veterinario, Voluntario) con diferentes niveles de acceso.
*   **Auditoría de Cambios**: Historial de quién modificó qué registro (`django-simple-history`).
*   **Upload de Archivos**: Mejorar la gestión de archivos adjuntos (S3 o Supabase Storage) para comprobantes y fotos.

## 🛠️ Deuda Técnica
*   **Refactor de Vistas**: Mover lógica de negocio compleja de las Vistas a Servicios o Managers.
*   **Tipado Frontend**: Completar interfaces TypeScript para todas las respuestas de la API.
*   **Optimización Queries**: Revisar `select_related` y `prefetch_related` en Django para evitar problemas N+1.
