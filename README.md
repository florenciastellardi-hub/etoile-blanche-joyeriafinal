# Etoile Blanche

Segunda parte del proyecto final: ecommerce para clientes construido con React.

## Que incluye

- Home comercial con identidad de marca.
- Catalogo de productos.
- Detalle de producto.
- Navegacion con React Router.
- Buscador y filtro por categoria.
- Diseno responsive para computadora, tablet y celular.
- Fallback de productos mientras se conecta la API.

## Conectar la API

1. Copiar `.env.example` como `.env`.
2. Cambiar `VITE_API_URL` por la URL de la API de productos de la Parte 1.

Ejemplo:

```env
VITE_API_URL=http://localhost:3000/api/products
```

La app acepta productos con nombres de campos como:

- `id` o `_id`
- `name`, `nombre` o `title`
- `price` o `precio`
- `description` o `descripcion`
- `image`, `imagen` o `img`
- `category` o `categoria`

## Ejecutar

Forma simple en Windows:

1. Abrir `iniciar-backend.bat`.
2. Abrir `iniciar-frontend.bat`.

El backend crea automaticamente la base `etoile_blanche` si MySQL esta iniciado.

Backend:

```bash
cd Backend
npm install
npm start
```

Frontend:

```bash
npm install
npm run dev
```

La API debe quedar en `http://localhost:3000/api/products` y React normalmente abre en
`http://localhost:5173`.
