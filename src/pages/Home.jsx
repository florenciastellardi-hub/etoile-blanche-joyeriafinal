import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';

const collections = [
  {
    title: 'Anillos',
    text: 'Piezas delicadas para sellar momentos y elevar lo cotidiano.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Cadenas',
    text: 'Brillo sutil, terminaciones finas y diseno para todos los dias.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Pulseras',
    text: 'Detalles elegantes para combinar, regalar y recordar.',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80',
  },
];

export default function Home({ featuredProducts, productState }) {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Joyeria fina</p>
          <h1>Etoile Blanche</h1>
          <p className="hero-copy">
            Joyas delicadas, modernas y elegantes para acompanar momentos especiales con brillo,
            estilo y personalidad.
          </p>
          <div className="hero-actions">
            <Link className="primary-action" to="/catalogo">
              Ver coleccion
            </Link>
            <Link className="secondary-action" to="/marca">
              Conocer la marca
            </Link>
          </div>
        </div>
      </section>

      <section className="section intro-band">
        <div>
          <p className="section-kicker">Nuestro sello</p>
          <h2>Elegancia en cada detalle.</h2>
        </div>
        <p>
          Etoile Blanche nace para quienes buscan joyas delicadas, luminosas y faciles de combinar.
          Cada pieza esta pensada para regalar, celebrar o sumar un brillo sutil al dia a dia.
        </p>
      </section>

      <section className="section collections-section">
        <div className="section-heading centered-heading">
          <div>
            <p className="section-kicker">Colecciones</p>
            <h2>Elegí por categoría</h2>
          </div>
        </div>

        <div className="collection-grid">
          {collections.map((collection) => (
            <article className="collection-card" key={collection.title}>
              <img src={collection.image} alt={collection.title} />
              <div>
                <h3>{collection.title}</h3>
                <p>{collection.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Destacados</p>
            <h2>Joyas destacadas</h2>
          </div>
          <Link to="/catalogo">Ver catalogo</Link>
        </div>

        {productState.error && <p className="notice">{productState.error}</p>}

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="service-strip">
        <article>
          <strong>Envíos</strong>
          <span>A todo el país</span>
        </article>
        <article>
          <strong>Regalos</strong>
          <span>Presentación cuidada</span>
        </article>
        <article>
          <strong>Materiales</strong>
          <span>Selección delicada</span>
        </article>
      </section>
    </>
  );
}
