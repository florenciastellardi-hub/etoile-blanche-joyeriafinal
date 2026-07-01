import React from 'react';
import { Link } from 'react-router-dom';

export default function Cart({ cartItems, onUpdateQuantity, onRemove, onClear }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <section className="section empty-state">
        <p className="section-kicker">Carrito</p>
        <h1>Tu carrito esta vacio</h1>
        <p>Elegí tus joyas favoritas y agregalas para ver el total de la compra.</p>
        <Link className="primary-action" to="/catalogo">
          Ver catalogo
        </Link>
      </section>
    );
  }

  return (
    <section className="section cart-page">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Carrito</p>
          <h1>Tu seleccion</h1>
        </div>
        <button type="button" className="text-button" onClick={onClear}>
          Vaciar carrito
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <span>{item.category}</span>
                <h2>{item.name}</h2>
                <p>${item.price.toLocaleString('es-UY')}</p>
              </div>
              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  aria-label="Restar unidad"
                >
                  -
                </button>
                <strong>{item.quantity}</strong>
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  aria-label="Sumar unidad"
                >
                  +
                </button>
              </div>
              <button type="button" className="remove-button" onClick={() => onRemove(item.id)}>
                Eliminar
              </button>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <p>Resumen</p>
          <div>
            <span>Total</span>
            <strong>${total.toLocaleString('es-UY')}</strong>
          </div>
          <button type="button" className="primary-action">
            Finalizar compra
          </button>
          <Link className="secondary-action" to="/catalogo">
            Seguir comprando
          </Link>
        </aside>
      </div>
    </section>
  );
}
