import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <Link to={`/producto/${product.id}`} className="product-image">
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="product-body">
        <span>Envio disponible · {product.category}</span>
        <h3>{product.name}</h3>
        <div className="product-meta">
          <strong>${product.price.toLocaleString('es-UY')}</strong>
          <Link to={`/producto/${product.id}`}>Ver detalle</Link>
        </div>
        {onAddToCart && (
          <button type="button" className="card-cart-button" onClick={() => onAddToCart(product)}>
            Agregar al carrito
          </button>
        )}
      </div>
    </article>
  );
}
