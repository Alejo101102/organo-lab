import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  try {
    console.log('🔌 Testing MongoDB connection...');
    console.log('🌐 Testing with URI:', process.env.MONGO_URI.replace(/:[^:]*@/, ':****@'));
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      connectTimeoutMS: 10000, // 10 second timeout
    });
    
    console.log('✅ MongoDB connected successfully!');
    console.log('🏠 Host:', conn.connection.host);
    console.log('📊 Database:', conn.connection.name);
    console.log('🔗 Ready state:', conn.connection.readyState);
    
    // Test a simple operation
    const admin = conn.connection.db.admin();
    const result = await admin.ping();
    console.log('🏓 Ping result:', result);
    
    await mongoose.disconnect();
    console.log('👋 Disconnected successfully');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('   Message:', error.message);
    console.error('   Code:', error.code);
    console.error('   Codename:', error.codeName);
    process.exit(1);
  }
};

testConnection();