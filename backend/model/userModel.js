const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: false },
  guardianPhone: { type: String, required: false },
  // Setting required to false elements ensures old collections don't block new registrations
  age: { type: Number, required: false },
  department: { type: String, required: false },
  email: { type: String, required: false } 
});

const User = mongoose.model('User', userSchema);
module.exports = User;