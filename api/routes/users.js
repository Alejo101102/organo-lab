
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Middleware para validar datos de usuario
const validateUserData = (req, res, next) => {
  const { firebaseUID, displayName, email } = req.body;
  
  if (!firebaseUID || typeof firebaseUID !== 'string' || firebaseUID.length < 10) {
    return res.status(400).json({
      success: false,
      message: 'Valid firebaseUID is required'
    });
  }
  
  if (!displayName || typeof displayName !== 'string' || displayName.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Valid displayName is required'
    });
  }
  
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({
      success: false,
      message: 'Valid email is required'
    });
  }
  
  next();
};

// Crear o actualizar usuario
router.post('/sync', validateUserData, async (req, res) => {
  try {
    const { firebaseUID, displayName, email, photoURL } = req.body;
    
    console.log(`Syncing user: ${firebaseUID} - ${displayName}`);
    
    let user = await User.findOne({ firebaseUID });
    
    if (!user) {
      console.log(`Creating new user: ${firebaseUID}`);
      user = new User({
        firebaseUID,
        displayName: displayName.trim(),
        email: email.toLowerCase().trim(),
        photoURL: photoURL || null
      });
    } else {
      console.log(`Updating existing user: ${firebaseUID}`);
      // Actualizar datos del usuario
      user.displayName = displayName.trim();
      user.email = email.toLowerCase().trim();
      user.photoURL = photoURL || user.photoURL;
      user.lastLogin = new Date();
    }
    
    await user.save();
    
    console.log(`User synced successfully: ${firebaseUID}`);
    
    res.json({
      success: true,
      data: {
        _id: user._id,
        firebaseUID: user.firebaseUID,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      },
      message: 'User synchronized successfully'
    });
  } catch (error) {
    console.error('Error syncing user:', error);
    
    // Manejar errores específicos de MongoDB
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with different data',
        error: 'Duplicate key error'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error synchronizing user',
      error: error.message
    });
  }
});

// Obtener usuario por UID
router.get('/:firebaseUID', async (req, res) => {
  try {
    const { firebaseUID } = req.params;
    
    // Validar firebaseUID
    if (!firebaseUID || typeof firebaseUID !== 'string' || firebaseUID.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Valid firebaseUID is required'
      });
    }
    
    console.log(`Getting user: ${firebaseUID}`);
    
    const user = await User.findOne({ firebaseUID });
    
    if (!user) {
      console.log(`User not found: ${firebaseUID}`);
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    console.log(`User found: ${firebaseUID} - ${user.displayName}`);
    
    res.json({
      success: true,
      data: {
        _id: user._id,
        firebaseUID: user.firebaseUID,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      },
      message: 'User retrieved successfully'
    });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving user',
      error: error.message
    });
  }
});

// Obtener todos los usuarios (para administración)
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    
    console.log(`Getting users list - limit: ${limit}, page: ${page}`);
    
    const users = await User
      .find({})
      .select('firebaseUID displayName email photoURL createdAt lastLogin')
      .sort({ lastLogin: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await User.countDocuments();
    
    res.json({
      success: true,
      data: users,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      },
      message: 'Users retrieved successfully'
    });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving users',
      error: error.message
    });
  }
});

// Eliminar usuario (solo para administración)
router.delete('/:firebaseUID', async (req, res) => {
  try {
    const { firebaseUID } = req.params;
    
    console.log(`Deleting user: ${firebaseUID}`);
    
    const user = await User.findOneAndDelete({ firebaseUID });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    console.log(`User deleted successfully: ${firebaseUID}`);
    
    res.json({
      success: true,
      message: 'User deleted successfully',
      data: {
        deletedUser: user.displayName,
        firebaseUID: user.firebaseUID
      }
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
});

export default router;