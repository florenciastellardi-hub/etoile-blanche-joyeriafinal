import { useEffect, useState } from 'react';
import { fallbackProducts } from '../data/fallbackProducts.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/products';
const API_ORIGIN = new URL(API_URL).origin;

function getImageUrl(value) {
  const fallback =
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80';

  if (!value) {
    return fallback;
  }

  if (value.startsWith('http')) {
    return value;
  }

  return `${API_ORIGIN}/${value.replace(/^\/+/, '')}`;
}

function normalizeProduct(product, index) {
  const image = product.image ?? product.imagen ?? product.img ?? product.foto;

  return {
    id: product.id ?? product._id ?? `api-${index + 1}`,
    name: product.name ?? product.nombre ?? product.title ?? 'Producto sin nombre',
    price: Number(product.price ?? product.precio ?? 0),
    description:
      product.description ??
      product.descripcion ??
      'Joya seleccionada por Etoile Blanche para sumar brillo, delicadeza y estilo.',
    image: getImageUrl(image),
    category: product.category ?? product.categoria ?? 'Destacado',
  };
}

export function useProducts() {
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('No se pudo conectar con la API');
        }

        const data = await response.json();
        const list = Array.isArray(data) ? data : data.products ?? data.productos ?? [];

        if (active && list.length > 0) {
          const apiProducts = list.map(normalizeProduct);
          const apiIds = new Set(apiProducts.map((product) => String(product.id)));
          const extraProducts = fallbackProducts.filter((product) => !apiIds.has(String(product.id)));

          setProducts([...apiProducts, ...extraProducts]);
          setError('');
        }
      } catch (err) {
        if (active) {
          setError('Mostrando productos de ejemplo hasta conectar la API.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  return { products, loading, error };
}
