import './TarjetasSintomasConjuntivitis.css';

const sintomasConjuntivitis = [
  {
    emoji: "👁️",
    titulo: "Enrojecimiento",
    descripcion: "Enrojecimiento de uno o ambos ojos."
  },
  {
    emoji: "😣",
    titulo: "Picazón o ardor",
    descripcion: "Molestia ocular persistente."
  },
  {
    emoji: "🟡",
    titulo: "Secreción espesa",
    descripcion: "Puede formar costras, especialmente al despertar."
  },
  {
    emoji: "💧",
    titulo: "Lagrimeo excesivo",
    descripcion: "Aumento de la producción de lágrimas."
  },
  {
    emoji: "🪟",
    titulo: "Sensación arenosa",
    descripcion: "Como si tuvieras arena en el ojo."
  },
  {
    emoji: "📉",
    titulo: "Visión borrosa",
    descripcion: "Por acumulación de secreciones."
  },
  {
    emoji: "⚡",
    titulo: "Fotofobia",
    descripcion: "Sensibilidad a la luz."
  }
];

const TarjetasSintomasConjuntivitis = () => {
  return (
    <div className="conjuntivitis-contenedor-tarjetas">
      {sintomasConjuntivitis.map((sintoma, i) => (
        <div className="conjuntivitis-tarjetas-sintomas" key={i}>
          <div className="conjuntivitis-imagen-tarjeta-sintomas">
            <div className="conjuntivitis-imagen-con-borde">
              <span style={{ fontSize: "2.5rem" }}>{sintoma.emoji}</span>
            </div>
          </div>
          <h2 className="conjuntivitis-tarjeta-sintomas-titulo">{sintoma.titulo}</h2>
          <p className="conjuntivitis-tarjeta-sintomas-descripcion">{sintoma.descripcion}</p>
        </div>
      ))}
    </div>
  );
};

export default TarjetasSintomasConjuntivitis;
