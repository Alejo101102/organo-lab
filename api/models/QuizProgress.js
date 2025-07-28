import mongoose from 'mongoose';

const quizProgressSchema = new mongoose.Schema({
    firebaseUID: {
        type: String,
        required: true,
        ref: 'User'
    },
    correctAnswers: {
        type: Number,
        default: 0
    },
    incorrectAnswers: {
        type: Number,
        default: 0
    },
    percentageCompleted: {
        type: Number,
        default: 0
    },
    score: {
        type: Number,
        default: 0
    },
    completedAt: {
        type: Date,
        default: null
    },
    attempts: {
        type: Number,
        default: 1
    },
    bestScore: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware para actualizar updatedAt
quizProgressSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Método para calcular puntaje
quizProgressSchema.methods.calculateScore = function() {
    const totalQuestions = this.correctAnswers + this.incorrectAnswers;
    if (totalQuestions === 0) return 0;
    
    // Fórmula de puntaje: (correctas * 100 / total) con bonus por completar
    let score = (this.correctAnswers * 100) / totalQuestions;
    
    // Bonus por completar el quiz
    if (this.percentageCompleted === 100) {
        score += 10;
    }
    
    // Penalty por errores
    score -= this.incorrectAnswers * 5;
    
    return Math.max(0, Math.round(score));
};

export default mongoose.model('QuizProgress', quizProgressSchema);