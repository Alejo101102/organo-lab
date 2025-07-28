import express from 'express';
import QuizProgress from '../models/QuizProgress.js';
import User from '../models/User.js';
import Leaderboard from '../models/Leaderboard.js';

const router = express.Router();

// Middleware para validar firebaseUID
const validateFirebaseUID = (req, res, next) => {
  const firebaseUID = req.params.firebaseUID || req.body.firebaseUID;
  if (!firebaseUID || typeof firebaseUID !== 'string' || firebaseUID.length < 10) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or missing firebaseUID'
    });
  }
  next();
};

// Obtener progreso del usuario
router.get('/progress/:firebaseUID', validateFirebaseUID, async (req, res) => {
  try {
    const { firebaseUID } = req.params;
    console.log(`Getting progress for user: ${firebaseUID}`);
    
    let progress = await QuizProgress.findOne({ firebaseUID });
    
    if (!progress) {
      console.log(`No progress found, creating new for user: ${firebaseUID}`);
      progress = new QuizProgress({ firebaseUID });
      await progress.save();
    }
    
    res.json({
      success: true,
      data: progress,
      message: 'Progress retrieved successfully'
    });
  } catch (error) {
    console.error('Error getting progress:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving progress',
      error: error.message
    });
  }
});

// Actualizar progreso del quiz
router.post('/progress', async (req, res) => {
  try {
    const { 
      firebaseUID, 
      correctAnswers, 
      incorrectAnswers, 
      percentageCompleted,
      completionTime 
    } = req.body;
    
    // Validaciones
    if (!firebaseUID) {
      return res.status(400).json({
        success: false,
        message: 'firebaseUID is required'
      });
    }
    
    console.log(`Updating progress for user: ${firebaseUID}`, {
      correctAnswers,
      incorrectAnswers,
      percentageCompleted,
      completionTime
    });
    
    let progress = await QuizProgress.findOne({ firebaseUID });
    
    if (!progress) {
      progress = new QuizProgress({ firebaseUID });
    }
    
    // Actualizar datos
    progress.correctAnswers = correctAnswers || 0;
    progress.incorrectAnswers = incorrectAnswers || 0;
    progress.percentageCompleted = percentageCompleted || 0;
    
    // Calcular puntaje
    const newScore = progress.calculateScore();
    progress.score = newScore;
    
    // Actualizar mejor puntaje
    if (newScore > progress.bestScore) {
      progress.bestScore = newScore;
    }
    
    // Si completó el quiz
    if (percentageCompleted >= 100) {
      progress.completedAt = new Date();
      
      // Actualizar leaderboard
      await updateLeaderboard(firebaseUID, newScore, correctAnswers, incorrectAnswers, completionTime);
    }
    
    await progress.save();
    console.log(`Progress saved successfully for user: ${firebaseUID}`);
    
    res.json({
      success: true,
      data: progress,
      message: 'Progress updated successfully'
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating progress',
      error: error.message
    });
  }
});

// Obtener leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    
    console.log(`Getting leaderboard - limit: ${limit}, page: ${page}`);
    
    const leaderboard = await Leaderboard
      .find()
      .sort({ bestScore: -1, completionTime: 1, updatedAt: 1 })
      .skip(skip)
      .limit(limit);
    
    // Asignar rankings basados en la posición real
    const rankedLeaderboard = leaderboard.map((entry, index) => ({
      ...entry.toObject(),
      rank: skip + index + 1
    }));
    
    const total = await Leaderboard.countDocuments();
    
    res.json({
      success: true,
      data: rankedLeaderboard,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      },
      message: 'Leaderboard retrieved successfully'
    });
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving leaderboard',
      error: error.message
    });
  }
});

// Obtener top 3 para el podio
router.get('/podium', async (req, res) => {
  try {
    console.log('Getting podium data');
    
    // Agregación para obtener el mejor puntaje de cada usuario único
    const top3 = await Leaderboard.aggregate([
      // Agrupar por firebaseUID y obtener el mejor puntaje de cada usuario
      {
        $group: {
          _id: "$firebaseUID",
          displayName: { $first: "$displayName" },
          bestScore: { $max: "$bestScore" },
          correctAnswers: { $first: "$correctAnswers" },
          incorrectAnswers: { $first: "$incorrectAnswers" },
          completionTime: { $first: "$completionTime" },
          updatedAt: { $first: "$updatedAt" }
        }
      },
      // Ordenar por mejor puntaje descendente, luego por tiempo de completion ascendente
      { 
        $sort: { 
          bestScore: -1, 
          completionTime: 1, 
          updatedAt: 1 
        } 
      },
      // Tomar solo los primeros 3
      { $limit: 3 }
    ]);
    
    const podium = {
      first: top3[0] ? {
        firebaseUID: top3[0]._id,
        displayName: top3[0].displayName,
        bestScore: top3[0].bestScore,
        correctAnswers: top3[0].correctAnswers,
        incorrectAnswers: top3[0].incorrectAnswers,
        completionTime: top3[0].completionTime,
        updatedAt: top3[0].updatedAt
      } : null,
      second: top3[1] ? {
        firebaseUID: top3[1]._id,
        displayName: top3[1].displayName,
        bestScore: top3[1].bestScore,
        correctAnswers: top3[1].correctAnswers,
        incorrectAnswers: top3[1].incorrectAnswers,
        completionTime: top3[1].completionTime,
        updatedAt: top3[1].updatedAt
      } : null,
      third: top3[2] ? {
        firebaseUID: top3[2]._id,
        displayName: top3[2].displayName,
        bestScore: top3[2].bestScore,
        correctAnswers: top3[2].correctAnswers,
        incorrectAnswers: top3[2].incorrectAnswers,
        completionTime: top3[2].completionTime,
        updatedAt: top3[2].updatedAt
      } : null
    };
    
    console.log('Podium data retrieved:', {
      first: podium.first?.displayName || 'Empty',
      second: podium.second?.displayName || 'Empty',
      third: podium.third?.displayName || 'Empty',
      scores: [
        podium.first?.bestScore || 0,
        podium.second?.bestScore || 0,
        podium.third?.bestScore || 0
      ]
    });
    
    res.json({
      success: true,
      data: podium,
      message: 'Podium data retrieved successfully'
    });
  } catch (error) {
    console.error('Error getting podium:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving podium data',
      error: error.message
    });
  }
});

// Reiniciar progreso del usuario
router.delete('/progress/:firebaseUID', validateFirebaseUID, async (req, res) => {
  try {
    const { firebaseUID } = req.params;
    console.log(`Resetting progress for user: ${firebaseUID}`);
    
    const result = await QuizProgress.findOneAndUpdate(
      { firebaseUID },
      {
        correctAnswers: 0,
        incorrectAnswers: 0,
        percentageCompleted: 0,
        score: 0,
        completedAt: null,
        $inc: { attempts: 1 }
      },
      { new: true, upsert: true }
    );
    
    console.log(`Progress reset successfully for user: ${firebaseUID}`);
    
    res.json({
      success: true,
      data: result,
      message: 'Progress reset successfully'
    });
  } catch (error) {
    console.error('Error resetting progress:', error);
    res.status(500).json({
      success: false,
      message: 'Error resetting progress',
      error: error.message
    });
  }
});

// Obtener estadísticas generales
router.get('/stats', async (req, res) => {
  try {
    console.log('Getting general stats');
    
    const totalUsers = await Leaderboard.countDocuments();
    const totalQuizzes = await QuizProgress.countDocuments({ completedAt: { $ne: null } });
    
    const avgScore = await Leaderboard.aggregate([
      {
        $group: {
          _id: null,
          averageScore: { $avg: '$bestScore' },
          highestScore: { $max: '$bestScore' },
          lowestScore: { $min: '$bestScore' }
        }
      }
    ]);
    
    const stats = {
      totalUsers,
      totalCompletedQuizzes: totalQuizzes,
      averageScore: Math.round(avgScore[0]?.averageScore || 0),
      highestScore: avgScore[0]?.highestScore || 0,
      lowestScore: avgScore[0]?.lowestScore || 0
    };
    
    res.json({
      success: true,
      data: stats,
      message: 'Stats retrieved successfully'
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving stats',
      error: error.message
    });
  }
});

// Función auxiliar para actualizar leaderboard
async function updateLeaderboard(firebaseUID, score, correctAnswers, incorrectAnswers, completionTime) {
  try {
    console.log(`Updating leaderboard for user: ${firebaseUID}`);
    
    const user = await User.findOne({ firebaseUID });
    if (!user) {
      console.log(`User not found in database: ${firebaseUID}`);
      return;
    }
    
    let leaderboardEntry = await Leaderboard.findOne({ firebaseUID });
    
    if (!leaderboardEntry) {
      console.log(`Creating new leaderboard entry for user: ${firebaseUID}`);
      leaderboardEntry = new Leaderboard({
        firebaseUID,
        displayName: user.displayName,
        bestScore: score,
        correctAnswers,
        incorrectAnswers,
        completionTime: completionTime || 0
      });
    } else {
      // Solo actualizar si es mejor puntaje
      if (score > leaderboardEntry.bestScore) {
        console.log(`Updating leaderboard entry for user: ${firebaseUID} - new best score: ${score}`);
        leaderboardEntry.bestScore = score;
        leaderboardEntry.correctAnswers = correctAnswers;
        leaderboardEntry.incorrectAnswers = incorrectAnswers;
        leaderboardEntry.completionTime = completionTime || 0;
        leaderboardEntry.displayName = user.displayName; // Actualizar nombre por si cambió
      } else {
        console.log(`Score ${score} not better than current best ${leaderboardEntry.bestScore} for user: ${firebaseUID}`);
        return; // No actualizar si no es mejor puntaje
      }
    }
    
    await leaderboardEntry.save();
    console.log(`Leaderboard updated successfully for user: ${firebaseUID}`);
  } catch (error) {
    console.error('Error updating leaderboard:', error);
  }
}

export default router;