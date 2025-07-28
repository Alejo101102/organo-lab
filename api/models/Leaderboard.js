import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
    firebaseUID: {
        type: String,
        required: true,
        ref: 'User'
    },
    displayName: {
        type: String,
        required: true
    },
    bestScore: {
        type: Number,
        required: true
    },
    correctAnswers: {
        type: Number,
        required: true
    },
    incorrectAnswers: {
        type: Number,
        required: true
    },
    completionTime: {
        type: Number, // en segundos
        default: 0
    },
    rank: {
        type: Number,
        default: 0
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Índice para ordenar por mejor puntaje
leaderboardSchema.index({ bestScore: -1, completionTime: 1 });

export default mongoose.model('Leaderboard', leaderboardSchema);