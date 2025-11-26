# 🎨 Frontend Documentation

El frontend está construido con **React 18**, **TypeScript** y **Vite**.

## 🛠️ Stack Tecnológico
*   **Build Tool**: Vite
*   **Framework**: React
*   **Lenguaje**: TypeScript
*   **Estilos**: Tailwind CSS + clsx + tailwind-merge
*   **Estado Global**: Zustand (`useUIStore`)
*   **Estado Servidor**: TanStack Query (React Query)
*   **Routing**: React Router DOM v6
*   **Iconos**: Heroicons
*   **Gráficos**: Recharts
*   **HTTP Client**: Axios

## 📂 Estructura por Features
El proyecto sigue una arquitectura basada en **features** (características), donde cada módulo de negocio tiene su propia carpeta encapsulada.

```text
src/features/
├── auth/           # Login y manejo de sesión
├── casos/          # Vistas y lógica de Casos
├── dashboard/      # Vista principal y widgets
├── donaciones/     # Vistas de Donaciones
├── donantes/       # Vistas de Donantes
├── gastos/         # Vistas de Gastos
└── proveedores/    # Vistas de Proveedores
```

Cada feature suele contener:
*   `components/`: Componentes UI específicos del feature.
*   `hooks/`: Custom hooks (generalmente queries de React Query).
*   `pages/`: Componentes de página (vistas completas).
*   `services/`: Definición de llamadas a la API.
*   `types/`: Interfaces TypeScript.

## 🔐 Autenticación
La autenticación se maneja mediante el hook `useAuth` y el componente `ProtectedRoute`.
1.  Al iniciar, `useAuth` verifica la sesión en Supabase.
2.  Si no hay sesión, `ProtectedRoute` redirige a `/login`.
3.  Axios tiene un interceptor (`src/api/axiosClient.ts`) que inyecta automáticamente el token `Bearer` en cada petición.

## 🚀 Scripts Disponibles
*   `npm run dev`: Inicia el servidor de desarrollo.
*   `npm run build`: Compila el proyecto para producción.
*   `npm run preview`: Vista previa del build localmente.
*   `npm run lint`: Ejecuta el linter.
