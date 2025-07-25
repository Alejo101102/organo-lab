// ResultadoJuego.jsx
import React from 'react';
import './ResultadoJuego.css';

export default function ResultadoJuego({ resultado, onClickPodio }) {
  return (
    <div className="overlay-resultado">
      <div className="modal-resultado">
        <h2 className="titulo-resultado">
          {resultado === 'ganar' ? '¡Ganaste!' : 'Perdiste :('}
        </h2>
        <button className="boton-resultado" onClick={onClickPodio}>
          Ir al podio
        </button>
      </div>
    </div>
  );
}
