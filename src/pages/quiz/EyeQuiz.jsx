import { useState } from 'react';
import EyeBalanceScene from './EyeBalanceScene';
import PreguntaCard from './PreguntaCard';
import ResultadoJuego from './ResultadoJuego';
import './EyeQuiz.css';

const preguntas = [
  {
    enunciado: "¿Qué enfermedad ocular causa visión nublada y es común en adultos mayores?",
    opciones: ["Glaucoma", "Cataratas", "Conjuntivitis", "Agujero macular"],
    respuestaCorrecta: 1,
  },
  {
    enunciado: "¿Cuál de los siguientes síntomas es típico del agujero macular?",
    opciones: ["Dolor de cabeza", "Visión doble", "Pérdida de visión central", "Ojos rojos"],
    respuestaCorrecta: 2,
  },
  {
    enunciado: "¿Qué parte del ojo se inflama con mayor frecuencia en la conjuntivitis?",
    opciones: ["Córnea", "Cristalino", "Conjuntiva", "Nervio óptico"],
    respuestaCorrecta: 2,
  },
  {
    enunciado: "¿Qué enfermedad ocular puede causar pérdida de visión periférica progresiva?",
    opciones: ["Cataratas", "Agujero macular", "Glaucoma", "Miopía"],
    respuestaCorrecta: 2,
  },
  {
    enunciado: "¿Cuál de los siguientes es un buen hábito para cuidar la salud visual?",
    opciones: [
      "Evitar la luz natural",
      "Dormir menos de 4 horas",
      "Usar gafas de sol con filtro UV",
      "Mirar pantallas sin parpadear"
    ],
    respuestaCorrecta: 2,
  },
];


export default function EyeQuiz() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [errores, setErrores] = useState(0);
  const [completo, setCompleto] = useState(false);
  const [resultadoFinal, setResultadoFinal] = useState(null); 
  const [aciertos, setAciertos] = useState(0);



const responder = (indexSeleccionado) => {
  const esCorrecto = indexSeleccionado === preguntas[preguntaActual].respuestaCorrecta;

  // Actualiza los contadores ANTES de evaluar si ganó o perdió
  const nuevosAciertos = esCorrecto ? aciertos + 1 : aciertos;
  const nuevosErrores = !esCorrecto ? errores + 1 : errores;

  // Verifica condiciones de victoria o derrota
  if (nuevosAciertos === 3) {
    setAciertos(nuevosAciertos);
    setCompleto(true);
    setResultadoFinal('ganar');
    return;
  }

  if (nuevosErrores === 3) {
    setErrores(nuevosErrores);
    setCompleto(true);
    setResultadoFinal('perder');
    return;
  }

    // Si aún no ha ganado ni perdido, continúa el juego
  if (esCorrecto) {
    setAciertos(nuevosAciertos);
  } else {
    setErrores(nuevosErrores);
  }

  if (preguntaActual + 1 < preguntas.length) {
    setPreguntaActual((p) => p + 1);
  } else {
    // Si terminó las preguntas sin cumplir condiciones anteriores
    setCompleto(true);
    const gano = nuevosAciertos >= 3;
    setResultadoFinal(gano ? 'ganar' : 'perder');
  }
};

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <EyeBalanceScene errores={errores} aciertos={aciertos} />

      {!completo && (
        <div className="pregunta-overlay">
          <PreguntaCard
            pregunta={preguntas[preguntaActual].enunciado}
            opciones={preguntas[preguntaActual].opciones}
            onSeleccionar={responder}
            indiceActual={preguntaActual}
            total={preguntas.length}
          />
        </div>
      )}

      {completo && (
        <ResultadoJuego resultado={resultadoFinal} onClickPodio={() => console.log('Ir al podio')} />
      )}

    </div>
  );
}
