import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ProductDetail({ products, onAddToCart }) {
  const { id } = useParams();
  const product = products.find((item) => String(item.id) === id);

  if (!product) {
    return (
      <section className="section empty-state">
        <h1>Producto no encontrado</h1>
        <p>Puede que el producto ya no este disponible o que la ruta no sea correcta.</p>
        <Link className="primary-action" to="/catalogo">
          Volver al catalogo
        </Link>
      </section>
    );
  }

  return (
    <section className="section detail-page">
      <div className="detail-media">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="detail-info">
        <p className="section-kicker">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="detail-price">${product.price.toLocaleString('es-UY')}</p>
        <p>{product.description}</p>
        <div className="detail-actions">
          <button type="button" className="primary-action" onClick={() => onAddToCart(product)}>
            Agregar al carrito
          </button>
          <Link className="secondary-action" to="/catalogo">
            Seguir viendo
          </Link>
        </div>
      </div>
    </section>
  );
}
