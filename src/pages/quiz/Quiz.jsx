import React from 'react'
import { useCallback } from 'react';
import useQuizStore from '../../stores/use-quiz-store';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

/*
const Quiz = () => {
  const {quiz, incrementQuizProgress } = useQuizStore()
  const handleQuizNext = useCallback(() => {
    incrementQuizProgress();
  }, [incrementQuizProgress]);
  return (
    <div>
      <h1>Quiz</h1>
      <span>Progreso del quiz: {quiz.percentageQuizCompleted} %</span>
      <button onClick={handleQuizNext}>Siguiente</button>
    </div>
  )
}

export default Quiz
*/
// src/pages/quiz/QuizInicio.jsx

const Quiz = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz/preguntas'); // Ruta a la sección real del quiz
  };

  return (
    <>
    <div className="quiz-container">
      <img className="quiz-imagen"
        src="/images/glaucoma/fondo-quiz-completo.png"
        alt="Ilustración"
      />

      <div className="quiz-content">
        <div className="quiz-texto">
          <h1 className="quiz-texto-inicio">
            No hay tiempo que perder,<br />pon a prueba tus<br />conocimientos 
            </h1>
          <button className="quiz-boton" onClick={handleStartQuiz}>
            ¡Empecemos!
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Quiz;
