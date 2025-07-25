// src/PreguntaCard.jsx
import './PreguntaCard.css';

function PreguntaCard({ pregunta, opciones, onSeleccionar, indiceActual, total }) {
  return (
    <div className="card-pregunta">
      <div className="pregunta-titulo">{pregunta}</div>

      <div className="opciones">
        {opciones.map((opcion, index) => (
          <button key={index} className="boton-opcion" onClick={() => onSeleccionar(index)}>
            {opcion}
          </button>
        ))}
      </div>

      <div className="indicador">
        {[...Array(total)].map((_, i) => (
          <span key={i} className={`punto ${i === indiceActual ? 'activo' : ''}`} />
        ))}
      </div>
    </div>
  );
}

export default PreguntaCard;
