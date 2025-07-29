// src/stores/use-quiz-store.js
import { create } from "zustand";

// AGREGAR ESTA LÍNEA AL INICIO DEL ARCHIVO
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Configuración del quiz
const TOTAL_QUESTIONS = 5; // Total de preguntas del quiz
const PROGRESS_INCREMENT = 100 / TOTAL_QUESTIONS; // 20% por pregunta (100/5)

const useQuizStore = create((set, get) => ({
  quiz: {
    correctAnswers: 0,
    incorrectAnswers: 0,
    percentageQuizCompleted: 0,
    score: 0,
    bestScore: 0,
    isCompleted: false,
    startTime: null,
    completionTime: 0
  },
  leaderboard: [],
  podium: {
    first: null,
    second: null,
    third: null
  },
  loading: false,
  error: null,

  // Inicializar quiz
  startQuiz: () => 
    set((state) => ({
      quiz: {
        ...state.quiz,
        startTime: Date.now(),
        isCompleted: false,
        percentageQuizCompleted: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        score: 0
      }
    })),

  // Incrementar progreso del quiz (CORREGIDO)
  incrementQuizProgress: () =>
    set((state) => {
      const newPercentage = Math.min(
        state.quiz.percentageQuizCompleted + PROGRESS_INCREMENT, // Ahora 20% por pregunta
        100
      );
      
      const isCompleted = newPercentage >= 100;
      const completionTime = isCompleted && state.quiz.startTime 
        ? Math.round((Date.now() - state.quiz.startTime) / 1000)
        : state.quiz.completionTime;

      console.log(`📊 Progress updated: ${newPercentage}% (increment: ${PROGRESS_INCREMENT}%) - Completed: ${isCompleted}`);

      return {
        quiz: {
          ...state.quiz,
          percentageQuizCompleted: newPercentage,
          isCompleted,
          completionTime
        }
      };
    }),

  // Incrementar respuestas correctas
  incrementCorrectAnswers: () =>
    set((state) => ({
      quiz: {
        ...state.quiz,
        correctAnswers: state.quiz.correctAnswers + 1
      }
    })),

  // Incrementar respuestas incorrectas
  incrementIncorrectAnswers: () =>
    set((state) => ({
      quiz: {
        ...state.quiz,
        incorrectAnswers: state.quiz.incorrectAnswers + 1
      }
    })),

  // Limpiar quiz
  clearQuiz: () =>
    set({
      quiz: {
        correctAnswers: 0,
        incorrectAnswers: 0,
        percentageQuizCompleted: 0,
        score: 0,
        bestScore: 0,
        isCompleted: false,
        startTime: null,
        completionTime: 0
      },
    }),

  // Cargar progreso desde MongoDB
  loadProgress: async (firebaseUID) => {
    set({ loading: true, error: null });
    
    try {
      // CAMBIAR ESTA LÍNEA:
      const response = await fetch(`${API_BASE_URL}/quiz/progress/${firebaseUID}`);
      const result = await response.json();
      
      if (result.success) {
        set((state) => ({
          quiz: {
            ...state.quiz,
            correctAnswers: result.data.correctAnswers,
            incorrectAnswers: result.data.incorrectAnswers,
            percentageQuizCompleted: result.data.percentageCompleted,
            score: result.data.score,
            bestScore: result.data.bestScore,
            isCompleted: result.data.completedAt !== null
          },
          loading: false
        }));
      }
    } catch (error) {
      console.error('❌ Error loading progress:', error);
      set({ error: error.message, loading: false });
    }
  },

  // Guardar progreso en MongoDB
  saveProgress: async (firebaseUID) => {
    set({ loading: true, error: null });
    
    try {
      const { quiz } = get();
      
      // CAMBIAR ESTA LÍNEA:
      const response = await fetch(`${API_BASE_URL}/quiz/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firebaseUID,
          correctAnswers: quiz.correctAnswers,
          incorrectAnswers: quiz.incorrectAnswers,
          percentageCompleted: quiz.percentageQuizCompleted,
          completionTime: quiz.completionTime
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Progress saved successfully!');
        set((state) => ({
          quiz: {
            ...state.quiz,
            score: result.data.score,
            bestScore: result.data.bestScore
          },
          loading: false
        }));
      }
    } catch (error) {
      console.error('❌ Error saving progress:', error);
      set({ error: error.message, loading: false });
    }
  },

  // Cargar leaderboard
  loadLeaderboard: async (limit = 10) => {
    set({ loading: true, error: null });
    
    try {
      // CAMBIAR ESTA LÍNEA:
      const response = await fetch(`${API_BASE_URL}/quiz/leaderboard?limit=${limit}`);
      const result = await response.json();
      
      if (result.success) {
        set({ leaderboard: result.data, loading: false });
      }
    } catch (error) {
      console.error('❌ Error loading leaderboard:', error);
      set({ error: error.message, loading: false });
    }
  },

  // Cargar datos del podio
  loadPodium: async () => {
    set({ loading: true, error: null });
    
    try {
      // CAMBIAR ESTA LÍNEA:
      const response = await fetch(`${API_BASE_URL}/quiz/podium`);
      const result = await response.json();
      
      if (result.success) {
        set({ 
          podium: result.data,
          loading: false 
        });
      }
    } catch (error) {
      console.error('❌ Error loading podium:', error);
      set({ error: error.message, loading: false });
    }
  },

  // Reiniciar progreso
  resetProgress: async (firebaseUID) => {
    set({ loading: true, error: null });
    
    try {
      // CAMBIAR ESTA LÍNEA:
      const response = await fetch(`${API_BASE_URL}/quiz/progress/${firebaseUID}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (result.success) {
        get().clearQuiz();
        set({ loading: false });
      }
    } catch (error) {
      console.error('❌ Error resetting progress:', error);
      set({ error: error.message, loading: false });
    }
  },

  // Calcular puntaje local (para preview)
  calculateScore: () => {
    const { quiz } = get();
    const totalQuestions = quiz.correctAnswers + quiz.incorrectAnswers;
    
    if (totalQuestions === 0) return 0;
    
    let score = (quiz.correctAnswers * 100) / TOTAL_QUESTIONS; // Usar TOTAL_QUESTIONS constante
    
    // Bonus por completar
    if (quiz.percentageQuizCompleted === 100) {
      score += 10;
    }
    
    // Penalty por errores
    score -= quiz.incorrectAnswers * 5;
    
    return Math.max(0, Math.round(score));
  }
}));

export default useQuizStore;