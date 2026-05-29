const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/saferoute';
    await mongoose.connect(uri);
    console.log('✅ MongoDB Connected Successfully!');
    console.log('📦 Database: saferoute');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;