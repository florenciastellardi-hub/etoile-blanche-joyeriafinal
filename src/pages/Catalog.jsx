import React, { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';

export default function Catalog({ productState, onAddToCart }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');

  const categories = useMemo(() => {
    const unique = new Set(productState.products.map((product) => product.category));
    return ['Todos', ...unique];
  }, [productState.products]);

  const filteredProducts = useMemo(() => {
    return productState.products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'Todos' || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [category, productState.products, search]);

  return (
    <section className="section catalog-page">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Catalogo</p>
          <h1>Productos disponibles</h1>
        </div>
        <p>{filteredProducts.length} productos</p>
      </div>

      <div className="catalog-tools">
        <label>
          Buscar
          <input
            type="search"
            placeholder="Nombre del producto"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <label>
          Categoria
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      {productState.loading && <p className="notice">Cargando productos...</p>}
      {productState.error && <p className="notice">{productState.error}</p>}

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}
