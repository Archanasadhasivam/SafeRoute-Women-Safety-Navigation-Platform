// ── MongoDB Connection ────────────────────────────────
// Connects to local MongoDB using Mongoose
// As taught by teacher: config folder → db.js file
 
const mongoose = require('mongoose');
 
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/saferoute');
    console.log('✅ MongoDB Connected Successfully!');
    console.log('📦 Database: saferoute');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1); // Stop server if DB fails
  }
};
 
module.exports = connectDB;