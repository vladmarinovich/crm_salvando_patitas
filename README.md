# 🐾 Salvando Patitas CRM

> Sistema de Gestión de Relaciones (CRM) para fundaciones de rescate animal.

![Status](https://img.shields.io/badge/Status-En%20Desarrollo-yellow)
![Backend](https://img.shields.io/badge/Backend-Django%20REST-green)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)
![Database](https://img.shields.io/badge/Database-Supabase%20%28PostgreSQL%29-3ecf8e)

## 📖 Descripción
Este proyecto es una solución integral para gestionar las operaciones de una fundación de rescate animal. Permite administrar **Casos** (animales rescatados), **Donantes**, **Donaciones**, **Gastos** y **Proveedores**, ofreciendo un dashboard financiero y operativo en tiempo real.

El objetivo es centralizar la información, transparentar las finanzas y facilitar la toma de decisiones.

---

## ⚙️ Arquitectura
El sistema consta de dos aplicaciones principales:
1.  **Backend**: API RESTful desarrollada en Python con Django REST Framework.
2.  **Frontend**: SPA (Single Page Application) desarrollada en React con TypeScript y Vite.

Para más detalles técnicos, consulta la documentación en `/docs`:
*   [Arquitectura](/docs/arquitectura.md)
*   [Base de Datos](/docs/database.md)
*   [API Reference](/docs/apis.md)

---

## 🚀 Guía de Instalación

### Prerrequisitos
*   Python 3.10+
*   Node.js 18+
*   Cuenta en Supabase (para DB y Auth)

### 1. Backend (Django)

```bash
# 1. Clonar repositorio
git clone <repo-url>
cd backend

# 2. Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Mac/Linux
# venv\Scripts\activate  # Windows

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Configurar variables de entorno
# Crea un archivo .env en la carpeta raíz del backend basado en el ejemplo de /docs/seguridad.md

# 5. Migraciones
python manage.py migrate

# 6. Correr servidor
python manage.py runserver
```

### 2. Frontend (React)

```bash
cd frontend

# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
# Crea un archivo .env en frontend/ con VITE_SUPABASE_URL y VITE_SUPABASE_KEY

# 3. Correr servidor de desarrollo
npm run dev
```

---

## 📊 Dashboard & KPIs

El Dashboard principal agrega información de múltiples fuentes para mostrar:

*   **Total Donado**: Suma de todas las donaciones con estado `APROBADA`.
*   **Total Gastado**: Suma de todos los gastos (excluyendo `ANULADO`).
*   **Balance**: `Total Donado` - `Total Gastado`.
*   **Casos Activos**: Casos que no están cerrados, adoptados o fallecidos.
*   **Top Ciudades**: Ciudades con mayor volumen de donaciones.
*   **Casos Destacados**: Casos con mayor actividad financiera reciente.

---

## 👤 Autenticación

El sistema utiliza **Supabase Auth**.
1.  El usuario se loguea en el frontend.
2.  Supabase devuelve un JWT (Access Token).
3.  El frontend envía este token en el header `Authorization` a la API de Django.
4.  Django valida el token y permite el acceso a los recursos protegidos.

---

## 🧪 Testing

### Backend
```bash
cd backend
pytest
```

### Frontend
```bash
cd frontend
npm run test
```

---

## 📦 Build & Deploy

### Backend (Render / Railway / AWS)
El backend es una aplicación WSGI estándar. Asegúrate de configurar las variables de entorno en tu proveedor de hosting y ejecutar `collectstatic`.

### Frontend (Vercel / Netlify / Firebase)
```bash
cd frontend
npm run build
# El resultado estará en la carpeta dist/
```

---

## 📄 Documentación Adicional
*   [Frontend Guide](/docs/frontend.md)
*   [Backend Guide](/docs/backend.md)
*   [Seguridad](/docs/seguridad.md)
*   [Roadmap](/docs/roadmap.md)
