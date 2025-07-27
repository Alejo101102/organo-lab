import React from 'react'
import { useCallback } from 'react';
import useQuizStore from '../../stores/use-quiz-store';
import { useNavigate } from 'react-router-dom';
import { Podium } from './models-3d/Podium';
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { Outlet } from 'react-router-dom';
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
    navigate('/quiz/cuestionario'); // Ruta a la sección real del quiz
  };

  // Ejemplo de datos
  const topPlayers = [
    { name: "María", score: 95, position: [0, 0, 0], scale: 1.2 }, // 🥇 Primer lugar (centro, más alto)
    { name: "Juan", score: 90, position: [-2.5, -0.5, 0], scale: 1 }, // 🥈 Segundo lugar (izquierda, medio)
    { name: "Luisa", score: 85, position: [2.5, -1, 0], scale: 0.9 }  // 🥉 Tercer lugar (derecha, más bajo)
  ];

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
