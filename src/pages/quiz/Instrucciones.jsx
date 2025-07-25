import React, { useState } from 'react';
import './Instrucciones.css';

function Instrucciones({ onClose }) {

  return (
    <div className="instrucciones-overlay">
      <div className="instrucciones-contenedor">
        <span className="instrucciones-alerta">¡Atención!</span>
        <h2 className="instrucciones-titulo">🎯 INSTRUCCIONES</h2>
        <p>En este mini juego, tu misión es hacer que el ojo caiga de la mesa.</p>
        <ul>
          <li>🔹 Responde correctamente las preguntas y cubos grises empezarán a caer.</li>
          <li>🔹 Los cubos caerán uno por uno en el borde derecho de la mesa. ¡Aprovecha su peso para desequilibrarla!</li>
          <li>🔹 Cuando la mesa se incline lo suficiente… ¡el ojo caerá!</li>
        </ul>
        <button className="instrucciones-boton" onClick={onClose}>¡Entendido!</button>

      </div>
    </div>
  );
}

export default Instrucciones;