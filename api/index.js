import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './database/database.js';
import quizRoutes from './routes/quiz.js';
import userRoutes from './routes/users.js';

// Configurar __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
const envPath = path.join(__dirname, '.env');
dotenv.config({ path: envPath });

console.log('🚀 Iniciando servidor...');
console.log('📁 Directorio actual:', __dirname);
console.log('📄 Archivo .env:', envPath);

// Debug de variables de entorno
console.log('🔑 Variables de entorno cargadas:');
console.log('   - PORT:', process.env.PORT);
console.log('   - NODE_ENV:', process.env.NODE_ENV || 'no definido');
console.log('   - MONGO_URI:', process.env.MONGO_URI ? '✅ Definida' : '❌ No definida');
console.log('   - MONGODB_URI:', process.env.MONGODB_URI ? '✅ Definida' : '❌ No definida');

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Para React/Vite
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/api/quiz', quizRoutes);
app.use('/api/users', userRoutes);

// Ruta de prueba mejorada
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: '🚀 Server is running perfectly!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: 'Connected to MongoDB',
    port: PORT
  });
});

// Ruta para debug de variables de entorno
app.get('/api/debug/env', (req, res) => {
  res.json({
    success: true,
    env: {
      PORT: process.env.PORT,
      NODE_ENV: process.env.NODE_ENV,
      MONGO_URI_EXISTS: !!process.env.MONGO_URI,
      MONGODB_URI_EXISTS: !!process.env.MONGODB_URI
    }
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? {
      message: err.message,
      stack: err.stack
    } : {}
  });
});

// Ruta no encontrada
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

app.listen(PORT, () => {
  console.log('\n🎉 ====================================');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔧 Debug env: http://localhost:${PORT}/api/debug/env`);
  console.log('🎉 ====================================\n');
});

export default app;