# Backend Restaurante

## Descripción
API REST de backend para la gestión del inventario de un restaurante, construida con TypeScript, Express y Supabase.

## Funcionalidades principales
- Gestión de categorías de productos
- Gestión de productos con carga de imágenes en Cloudinary
- Control de inventario con movimientos de entrada y salida
- Reportes de bajo stock, valor de inventario y movimientos por fecha
- Registro e inicio de sesión de usuarios con generación de JWT
- Documentación Swagger para todas las rutas principales

## Stack
- Node.js + Express
- TypeScript
- Supabase como base de datos
- Cloudinary para almacenamiento de imágenes
- JWT para autenticación
- Swagger para documentación de API

## Rutas disponibles
### Categorías
- `POST /api/v1/category`
- `GET /api/v1/category`
- `GET /api/v1/category/{id}`
- `PUT /api/v1/category/{id}`
- `PATCH /api/v1/category/{id}`

### Productos
- `POST /api/v1/product`
- `GET /api/v1/product`
- `GET /api/v1/product/{id}`
- `PUT /api/v1/product/{id}`
- `PATCH /api/v1/product/{id}`

### Inventario
- `POST /api/v1/inventory`
- `GET /api/v1/inventory`
- `GET /api/v1/inventory/{id}`
- `GET /api/v1/inventory/product/{id}`

### Reportes
- `GET /api/v1/reports/low-stock`
- `GET /api/v1/reports/most-used`
- `GET /api/v1/reports/movements-by-date?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

### Usuarios
- `POST /api/v1/register`
- `POST /api/v1/login`
- `GET /api/v1/user/profile`

## Swagger / API Docs
- URL: `https://backend-restaurante-three.vercel.app/api-docs`

