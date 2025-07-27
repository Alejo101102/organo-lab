// ResultadoJuego.jsx
import React from 'react';
import './ResultadoJuego.css';
import { useNavigate } from 'react-router-dom';
import Medallero from './Medallero'  

export default function ResultadoJuego({ resultado }) {

  const navigate = useNavigate();

  const irAMedallero = () => {
    navigate('/quiz/cuestionario/medallero');
  };


  return (
    <div className="overlay-resultado">
      <div className="modal-resultado">
        <h2 className="titulo-resultado">
          {resultado === 'ganar' ? '¡Ganaste!' : 'Perdiste :('}
        </h2>
        <button className="boton-resultado" onClick={irAMedallero}>
          Ir al podio
        </button>
      </div>
    </div>
  );
}
