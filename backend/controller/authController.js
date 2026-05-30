const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'saferoute_secret_key';

// ── POST /auth/sign-up ──
const register = async (req, res) => {
  try {
    // 1. Extract values safely supporting all casing variants
    const username = req.body.username || req.body.Username;
    const password = req.body.password || req.body.Password;
    const name = req.body.name || req.body.Name || req.body.fullName || req.body.FullName;
    const phone = req.body.phone || req.body.Phone;
    const guardianPhone = req.body.guardianPhone || req.body.GuardianPhone;

    // 2. Extract fallback fields just in case the database schema still enforces them
    const email = req.body.email || `${username || 'user'}@saferoute.com`; // Fallback unique email
    const department = req.body.department || 'SafeRoute User'; // Fallback department
    const age = req.body.age || 20;

    if (!username || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Username, Password, and Full Name are strictly required fields.',
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists',
      });
    }

    let hashedPassword = password;
    if (!password.startsWith('$2a$') && !password.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // 3. Save ALL fields to keep both old and new database schemas perfectly happy
    const newUser = await User.create({
      username,
      password: hashedPassword,
      name,
      phone,
      guardianPhone,
      email,        // Satisfies old required property
      department,   // Satisfies old required property
      age          // Satisfies optional property
    });

    // 4. Send response structure back both nested and flat for the frontend
    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      username: newUser.username,
      name: newUser.name,
      data: {
        username: newUser.username,
        name: newUser.name
      }
    });

  } catch (error) {
    console.error("❌ Registration Route Crash:", error.message);
    res.status(500).json({
      success: false,
      message: 'Registration failed due to an internal server error',
      error: error.message,
    });
  }
};

// ── POST /auth/sign-in ──
const signIn = async (req, res) => {
  try {
    const username = req.body.username || req.body.Username;
    const password = req.body.password || req.body.Password;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and Password fields are required.',
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send response structure back both nested and flat for the frontend
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      username: user.username, 
      data: {
        username: user.username
      }
    });
  } catch (error) {
    console.error("❌ Login Route Crash:", error.message);
    res.status(500).json({
      success: false,
      message: 'Login failed due to a server error',
      error: error.message,
    });
  }
};

module.exports = { register, signIn };