import { useState } from 'react';
import EyeBalanceScene from './EyeBalanceScene';
import PreguntaCard from './PreguntaCard';
import ResultadoJuego from './ResultadoJuego';
import './EyeQuiz.css';

const preguntas = [
  {
    enunciado: "¿Qué estructura se ve afectada por el glaucoma?",
    opciones: ["Retina", "Nervio óptico", "Cristalino", "Párpado"],
    respuestaCorrecta: 1,
  },
  {
    enunciado: "¿Cuál es un síntoma común del glaucoma?",
    opciones: ["Dolor de cabeza", "Pérdida de visión periférica", "Picazón", "Visión doble"],
    respuestaCorrecta: 1,
  },
  {
    enunciado: "¿Qué examen detecta la presión ocular?",
    opciones: ["Tonometría", "Angiografía", "Ecografía", "Topografía"],
    respuestaCorrecta: 0,
  },
  {
    enunciado: "¿El glaucoma es curable?",
    opciones: ["Sí", "No", "Solo con cirugía", "Depende del paciente"],
    respuestaCorrecta: 1,
  },
  {
    enunciado: "¿Cuál es un tratamiento común para el glaucoma?",
    opciones: ["Gotas oculares", "Lentes de contacto", "Vitaminas", "Cirugía plástica"],
    respuestaCorrecta: 0,
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
  
  if (!esCorrecto) {
    setErrores((e) => e + 1);
  } else {
    setAciertos((a) => a + 1);
  }

  if (preguntaActual + 1 < preguntas.length) {
    setPreguntaActual((p) => p + 1);
  } else {
    setCompleto(true);
    const gano = errores < 3 && (aciertos + (esCorrecto ? 1 : 0)) >= 3;
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
