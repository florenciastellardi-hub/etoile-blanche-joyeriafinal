import React from 'react';

export default function About() {
  return (
    <section className="section about-page">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Identidad de marca</p>
          <h1>Etoile Blanche</h1>
        </div>
      </div>

      <div className="brand-system">
        <article>
          <h2>Nombre comercial</h2>
          <p>Etoile Blanche</p>
        </article>
        <article>
          <h2>Rubro comercial</h2>
          <p>Tienda online de joyas: anillos, pulseras, collares, aros y accesorios elegantes.</p>
        </article>
        <article>
          <h2>Publico objetivo</h2>
          <p>Personas que buscan joyas delicadas para regalar, usar a diario o completar un look especial.</p>
        </article>
        <article>
          <h2>Eslogan</h2>
          <p>Brillá con elegancia.</p>
        </article>
      </div>

      <div className="design-rationale">
        <h2>Justificacion de diseno</h2>
        <p>
          La paleta combina tonos profundos, claros y acentos calidos para transmitir elegancia,
          delicadeza y confianza. Las imagenes tienen mucho protagonismo porque en joyeria el
          detalle visual es clave. La navegacion es simple para que el cliente pueda recorrer,
          comparar y elegir con comodidad desde computadora, tablet o celular.
        </p>
        <div className="palette">
          <span className="swatch dark">#1F1915</span>
          <span className="swatch coral">#B88A44</span>
          <span className="swatch mint">#EEE5D8</span>
          <span className="swatch cream">#FBF8F2</span>
        </div>
      </div>
    </section>
  );
}
