// ResultadoJuego.jsx
import React from 'react';
import './ResultadoJuego.css';
import { useNavigate } from 'react-router-dom';
import useQuizStore from '../../stores/use-quiz-store';
import useAuthStore from '../../stores/use-auth.store';

export default function ResultadoJuego({ 
  resultado, 
  onRestart 
}) {
  const navigate = useNavigate();
  const { quiz, calculateScore } = useQuizStore();
  const { userLogged } = useAuthStore();

  const irAMedallero = () => {
    navigate('/quiz/cuestionario/medallero');
  };

  const irALeaderboard = () => {
    navigate('/quiz/leaderboard');
  };

  // Calcular el puntaje actual
  const currentScore = calculateScore();

  return (
    <div className="resultado-modal">
      <div className="resultado-content">
        <h2>{resultado === 'ganar' ? '¡Felicitaciones! 🎉' : 'Fin del juego 😔'}</h2>
        
        {userLogged && (
          <div className="player-info">
            <img 
              src={userLogged.photoURL} 
              alt={userLogged.displayName}
              className="player-avatar"
            />
            <h3>{userLogged.displayName}</h3>
          </div>
        )}

        <div className="score-summary">
          <div className="score-item">
            <span className="label">Puntaje obtenido:</span>
            <span className="value">{currentScore}</span>
          </div>
          <div className="score-item">
            <span className="label">Mejor puntaje:</span>
            <span className="value">{quiz.bestScore}</span>
          </div>
          <div className="score-item">
            <span className="label">Respuestas correctas:</span>
            <span className="value correct">{quiz.correctAnswers}</span>
          </div>
          <div className="score-item">
            <span className="label">Respuestas incorrectas:</span>
            <span className="value incorrect">{quiz.incorrectAnswers}</span>
          </div>
          <div className="score-item">
            <span className="label">Progreso completado:</span>
            <span className="value">{quiz.percentageQuizCompleted}%</span>
          </div>
        </div>

        {resultado === 'ganar' && (
          <div className="victory-message">
            <p>🏆 ¡Excelente trabajo! Tu puntaje ha sido guardado.</p>
            <p>Revisa tu posición en el medallero.</p>
          </div>
        )}

        {resultado === 'perder' && (
          <div className="defeat-message">
            <p>No te desanimes, ¡sigue practicando!</p>
            <p>Cada intento te ayuda a mejorar.</p>
          </div>
        )}
        
        <div className="resultado-buttons">
          <button onClick={onRestart} className="btn-restart">
            🔄 Intentar de nuevo
          </button>
          
          <button onClick={irAMedallero} className="btn-medallero">
            🏆 Ver Medallero
          </button>
          
          <button onClick={irALeaderboard} className="btn-leaderboard">
            📊 Ver Ranking Completo
          </button>
        </div>
      </div>
    </div>
  );
}