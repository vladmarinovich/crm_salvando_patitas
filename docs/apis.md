# 🔌 API REST Reference

La API está construida con **Django REST Framework**. Todas las respuestas son en formato JSON.

**Base URL**: `/api/`
**Autenticación**: Bearer Token (JWT de Supabase) en header `Authorization`.

---

## 📊 Core / Dashboard
*   `GET /api/dashboard/`
    *   **Descripción**: Obtiene KPIs consolidados, top ciudades y casos destacados.
    *   **Parámetros**: `start_date` (YYYY-MM-DD), `end_date` (YYYY-MM-DD).

---

## 🐾 Casos
*   `GET /api/casos/` - Listar todos los casos (paginado, filtros: search, estado).
*   `POST /api/casos/` - Crear nuevo caso.
*   `GET /api/casos/{id}/` - Detalle de un caso.
*   `PUT /api/casos/{id}/` - Actualizar caso.
*   `DELETE /api/casos/{id}/` - Eliminar caso.
*   `GET /api/casos/activos/` - Listar solo casos activos (no cerrados/fallecidos/adoptados).
*   `GET /api/casos/{id}/balance/` - Obtener balance financiero (donaciones vs gastos) de un caso.

---

## 🏠 Hogares de Paso
*   `GET /api/hogares/` - Listar hogares.
*   `POST /api/hogares/` - Crear hogar.
*   `GET /api/hogares/{id}/` - Detalle.
*   `PUT /api/hogares/{id}/` - Actualizar.
*   `DELETE /api/hogares/{id}/` - Eliminar.

---

## 🤝 Donantes
*   `GET /api/donantes/` - Listar donantes.
*   `POST /api/donantes/` - Crear donante.
*   `GET /api/donantes/{id}/` - Detalle.
*   `PUT /api/donantes/{id}/` - Actualizar.
*   `DELETE /api/donantes/{id}/` - Eliminar.

---

## 💰 Donaciones
*   `GET /api/donaciones/` - Listar donaciones.
*   `POST /api/donaciones/` - Registrar donación.
*   `GET /api/donaciones/{id}/` - Detalle.
*   `PUT /api/donaciones/{id}/` - Actualizar.
*   `DELETE /api/donaciones/{id}/` - Eliminar.

---

## 💸 Gastos
*   `GET /api/gastos/` - Listar gastos.
*   `POST /api/gastos/` - Registrar gasto.
*   `GET /api/gastos/{id}/` - Detalle.
*   `PUT /api/gastos/{id}/` - Actualizar.
*   `DELETE /api/gastos/{id}/` - Eliminar.

---

## 🚚 Proveedores
*   `GET /api/proveedores/` - Listar proveedores.
*   `POST /api/proveedores/` - Crear proveedor.
*   `GET /api/proveedores/{id}/` - Detalle.
*   `PUT /api/proveedores/{id}/` - Actualizar.
*   `DELETE /api/proveedores/{id}/` - Eliminar.
