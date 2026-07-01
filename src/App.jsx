import React, { useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { useProducts } from './hooks/useProducts.js';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import About from './pages/About.jsx';
import Cart from './pages/Cart.jsx';

const navItems = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catalogo' },
  { to: '/carrito', label: 'Carrito' },
  { to: '/marca', label: 'Marca' },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const productsState = useProducts();

  const featuredProducts = useMemo(
    () => productsState.products.slice(0, 4),
    [productsState.products],
  );

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  function addToCart(product) {
    setCartItems((items) => {
      const existingItem = items.find((item) => String(item.id) === String(product.id));

      if (existingItem) {
        return items.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...items, { ...product, quantity: 1 }];
    });
  }

  function updateCartQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((items) =>
      items.map((item) =>
        String(item.id) === String(productId) ? { ...item, quantity } : item,
      ),
    );
  }

  function removeFromCart(productId) {
    setCartItems((items) => items.filter((item) => String(item.id) !== String(productId)));
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">E</span>
          <span>
            <strong>Etoile</strong>
            <small>Blanche</small>
          </span>
        </Link>

        <button
          className="menu-button"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {item.label}
              {item.to === '/carrito' && cartCount > 0 ? ` (${cartCount})` : ''}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={<Home featuredProducts={featuredProducts} productState={productsState} />}
          />
          <Route
            path="/catalogo"
            element={<Catalog productState={productsState} onAddToCart={addToCart} />}
          />
          <Route
            path="/producto/:id"
            element={<ProductDetail products={productsState.products} onAddToCart={addToCart} />}
          />
          <Route
            path="/carrito"
            element={
              <Cart
                cartItems={cartItems}
                onUpdateQuantity={updateCartQuantity}
                onRemove={removeFromCart}
                onClear={clearCart}
              />
            }
          />
          <Route path="/marca" element={<About />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div>
          <strong>Etoile Blanche</strong>
          <p>Joyas delicadas, elegantes y pensadas para iluminar cada momento especial.</p>
        </div>
        <Link to="/catalogo">Ver productos</Link>
      </footer>
    </div>
  );
}
