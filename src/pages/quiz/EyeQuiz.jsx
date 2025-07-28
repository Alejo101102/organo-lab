import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import EyeBalanceScene from './EyeBalanceScene';
import PreguntaCard from './PreguntaCard';
import ResultadoJuego from './ResultadoJuego';
import useQuizStore from '../../stores/use-quiz-store';
import useAuthStore from '../../stores/use-auth.store';
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

function EyeQuiz() {
  // Estados principales del juego (siguiendo tu lógica simple)
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [errores, setErrores] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [puntaje, setPuntaje] = useState(0); // Puntaje acumulativo
  const [completo, setCompleto] = useState(false);
  const [resultadoFinal, setResultadoFinal] = useState(null);
  const [mejorPuntaje, setMejorPuntaje] = useState(0); // Estado local para mejor puntaje
  
  // Estados del archivo original que pueden ser útiles
  const [isAnswering, setIsAnswering] = useState(false);
  
  // Nuevo estado para forzar re-render de la escena 3D
  const [gameKey, setGameKey] = useState(0);
  
  // Stores del archivo original (mantener para compatibilidad) - ✅ AGREGADO resetQuiz
  const {
    quiz,
    incrementQuizProgress,
    incrementCorrectAnswers,
    incrementIncorrectAnswers,
    startQuiz,
    saveProgress,
    loadProgress,
    loadPodium,
    calculateScore,
    resetQuiz // ✅ AGREGADO: función para resetear el quiz
  } = useQuizStore();
  
  const { userLooged } = useAuthStore();
  
  const gameStarted = useRef(false);

  // Función local para obtener el puntaje actual
  const obtenerPuntajeActual = () => {
    return puntaje;
  };

  // Cargar progreso al iniciar (del archivo original)
  useEffect(() => {
    if (userLooged && !gameStarted.current) {
      loadProgress(userLooged.uid);
      startQuiz();
      gameStarted.current = true;
      
      // Inicializar mejor puntaje desde el store
      setMejorPuntaje(quiz.bestScore || 0);
    }
  }, [userLooged, loadProgress, startQuiz, quiz.bestScore]);

  // Función responder adaptada de tu código simple
  const responder = async (indexSeleccionado) => {
    if (isAnswering || completo) return;
    
    setIsAnswering(true);
    
    const esCorrecto = indexSeleccionado === preguntas[preguntaActual].respuestaCorrecta;
    
    // Actualiza los contadores ANTES de evaluar si ganó o perdió
    const nuevosAciertos = esCorrecto ? aciertos + 1 : aciertos;
    const nuevosErrores = !esCorrecto ? errores + 1 : errores;
    
    // Actualizar stores para compatibilidad
    if (esCorrecto) {
      incrementCorrectAnswers();
    } else {
      incrementIncorrectAnswers();
    }
    incrementQuizProgress();
    
    // Verifica si perdió (3 errores)
    if (nuevosErrores === 3) {
      setErrores(nuevosErrores);
      setCompleto(true);
      setResultadoFinal('perder');
      
      // Guardar progreso si hay usuario logueado
      if (userLooged) {
        try {
          await saveProgress(userLooged.uid);
          await loadPodium();
        } catch (error) {
          console.error('Error saving progress on lose:', error);
        }
      }
      setIsAnswering(false);
      return;
    }

    // Actualizar contadores
    if (esCorrecto) {
      setAciertos(nuevosAciertos);
      setPuntaje(prev => prev + 10); // Sumar 10 puntos por respuesta correcta
    } else {
      setErrores(nuevosErrores);
    }

    // Guardar progreso intermedio
    if (userLooged) {
      try {
        await saveProgress(userLooged.uid);
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }

    setTimeout(() => {
      if (preguntaActual + 1 < preguntas.length) {
        setPreguntaActual((p) => p + 1);
      } else {
        // Completó todas las preguntas
        setCompleto(true);
        // Determinar resultado: gana si tiene más aciertos que errores
        const gano = nuevosAciertos > nuevosErrores;
        setResultadoFinal(gano ? 'ganar' : 'perder');
        
        // Actualizar mejor puntaje si es necesario
        const puntajeFinal = puntaje + (esCorrecto ? 10 : 0); // Considerar la última respuesta
        if (puntajeFinal > mejorPuntaje) {
          setMejorPuntaje(puntajeFinal);
        }
        
        // Guardar progreso final
        if (userLooged) {
          try {
            saveProgress(userLooged.uid);
            loadPodium();
          } catch (error) {
            console.error('Error saving final progress:', error);
          }
        }
      }
      setIsAnswering(false);
    }, 1000);
  };

  // ✅ FUNCIÓN RESETGAME CORREGIDA
  const resetGame = () => {
    // Reiniciar estados locales
    setPreguntaActual(0);
    setErrores(0);
    setAciertos(0);
    setPuntaje(0); // Resetear puntaje a 0
    setCompleto(false);
    setResultadoFinal(null);
    setIsAnswering(false);
    gameStarted.current = false;
    
    // Forzar re-render de la escena 3D con un valor único cada vez
    setGameKey(Date.now());
    
    // Reiniciar el quiz usando startQuiz (resetQuiz no existe en el store)
    startQuiz();
    
    console.log('🔄 Game reset! Ready to play again. GameKey:', Date.now());
  };


  if (!userLooged) {
    return (
      <div className="eye-quiz-container">
        <div className="auth-required">
          <h2>Debes iniciar sesión para jugar</h2>
          <p>Por favor, inicia sesión con Google para guardar tu progreso.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* Tarjeta de botones de acción - Solo aparece cuando el juego está completo */}
      {completo && (
        <div className="action-card">
          <div className="game-result-header">
            <h3 className="result-title">
              {resultadoFinal === 'ganar' ? '🎉 ¡Felicidades!' : '😔 Fin del juego'}
            </h3>
            <div className="result-stats">
              <span>✅ Aciertos: {aciertos}</span>
              <span>❌ Errores: {errores}</span>
              <span>🏆 Puntaje: {obtenerPuntajeActual()}</span>
            </div>
          </div>
          <button className="action-btn restart-btn" onClick={resetGame}>
            🔄 Intentar de nuevo
          </button>
        </div>
      )}

      {/* Tarjeta de información del jugador - Derecha */}
      <div className="player-card">
        <div className="player-header">
          <img 
            src={userLooged.photoURL} 
            alt={userLooged.displayName}
            className="player-avatar"
          />
          <span className="player-name">{userLooged.displayName}</span>
        </div>
        <div className="player-stats">
          <div className="stat-item">
            <span className="stat-label">Puntaje actual:</span>
            <span className="stat-value">{obtenerPuntajeActual()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Mejor puntaje:</span>
            <span className="stat-value">{mejorPuntaje}</span>
          </div>
          <div className="game-progress">
            <span className="progress-item">✅ Aciertos: {aciertos}</span>
            <span className="progress-item">❌ Errores: {errores}</span>
            <span className="progress-item">📝 Pregunta: {preguntaActual + 1}/{preguntas.length}</span>
          </div>
        </div>
      </div>

      {/* Escena 3D principal - Ahora con key para forzar re-render */}
      <EyeBalanceScene 
        key={gameKey} 
        errores={errores} 
        aciertos={aciertos} 
      />
      
      {/* Panel de preguntas usando la clase CSS original */}
      {!completo && preguntaActual < preguntas.length && (
        <div className="pregunta-overlay">
          <PreguntaCard
            pregunta={preguntas[preguntaActual].enunciado}
            opciones={preguntas[preguntaActual].opciones}
            onSeleccionar={responder}
            indiceActual={preguntaActual}
            total={preguntas.length}
            disabled={isAnswering}
          />
        </div>
      )}

      {completo && (
        <div style={{ display: 'none' }}>
          <ResultadoJuego 
            resultado={resultadoFinal} 
            onRestart={resetGame}
          />
        </div>
      )}

      {/* Resultado del juego - OCULTO para usar solo nuestras tarjetas */}
      {/* {completo && (
        <ResultadoJuego 
          resultado={resultadoFinal} 
          score={calculateScore()}
          bestScore={quiz.bestScore}
          correctAnswers={aciertos}
          incorrectAnswers={errores}
          onRestart={resetGame}
          onClickPodio={() => console.log('Ir al podio')}
        />
      )} */}
    </div>
  );
}

export default EyeQuiz;