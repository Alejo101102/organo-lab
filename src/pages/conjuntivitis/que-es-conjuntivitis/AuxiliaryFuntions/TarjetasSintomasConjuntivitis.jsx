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
    <div className="catarata-contenedor-tarjetas">
      {sintomasConjuntivitis.map((sintoma, i) => (
        <div className="catarata-tarjetas-sintomas" key={i}>
          <div className="catarata-imagen-tarjeta-sintomas">
            <div className="catarata-imagen-con-borde">
              <span style={{ fontSize: "4rem" }}>{sintoma.emoji}</span>
            </div>
          </div>
          <h4 className="catarata-tarjeta-sintomas-titulo">{sintoma.titulo}</h4>
          <p className="catarata-tarjeta-sintomas-descripcion">{sintoma.descripcion}</p>
        </div>
      ))}
    </div>
  );
};

export default TarjetasSintomasConjuntivitis;
