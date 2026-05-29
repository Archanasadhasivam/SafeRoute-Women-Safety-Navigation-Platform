// ── Student Model ─────────────────────────────────────
// Mongoose Schema and Model for Student
// As taught by teacher: name(String), age(Number), email(String)
 
const mongoose = require('mongoose');
 
// ── Define Schema ─────────────────────────────────────
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  department: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});
 
// ── Create Model from Schema ──────────────────────────
const User = mongoose.model('User', userSchema);
 
module.exports = User;