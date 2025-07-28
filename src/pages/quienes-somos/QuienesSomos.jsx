// src/pages/quienes-somos/QuienesSomos.jsx
import './QuienesSomos.css';

const integrantes = [
  {
    nombre: 'Miguel Angel Escobar Velez',
    imagen: '/images/quienes-somos/miguel.png',
  },
  {
    nombre: 'Heidy Lizbeth Gelpud Acosta',
    imagen: '/images/quienes-somos/heidy.png',
  },
  {
    nombre: 'Leonardo Cuadro',
    imagen: '/images/quienes-somos/leonardo.png',
  },
  {
    nombre: 'Alejandro Guerrero Cano',
    imagen: '/images/quienes-somos/alejandro.png',
  },
];

export default function QuienesSomos() {
  return (
    <div className="quienes-container">
      <h1 className="titulo">SOBRE NOSOTROS</h1>
      <p className="descripcion">
        Somos una empresa dedicada a la creación y producción de páginas interactivas que brindan información sobre el cuerpo humano, para suplir las necesidades conceptuales y técnicas de todo público.
      </p>

      <div className="equipo">
        {integrantes.map((persona, i) => (
          <div className="tarjeta" key={i}>
            <img src={persona.imagen} alt={persona.nombre} className="foto" />
            <p className="nombre">{persona.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
