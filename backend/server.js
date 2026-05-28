// ── SafeRoute Backend Server ──────────────────────────
// Full Stack MERN Application
// Port: 3000
 
const express = require('express');
const cors = require('cors');
const app = express();
 
// ── Import DB Connection ──────────────────────────────
const connectDB = require('./config/db');
 
// ── Import Middleware ─────────────────────────────────
const logger = require('./middleware/logger');
 
// ── Import Routes ─────────────────────────────────────
const userRoute = require('./Router/userRoute');
const authRoute = require('./Router/authRoute');
 
// ── Connect to MongoDB ────────────────────────────────
connectDB();
 
// ── Built-in Middleware ───────────────────────────────
app.use(cors());           // Allow React frontend to call this API
app.use(express.json());   // Parse incoming JSON
 
// ── Custom Logger Middleware ──────────────────────────
app.use(logger);
 
// ── Routes ────────────────────────────────────────────
app.use('/students', userRoute);   // Student CRUD
app.use('/auth', authRoute);       // Register + Login
 
// ── Root Route ────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: '🛡️ SafeRoute API is running!',
    endpoints: {
      students:  'GET/POST/PUT/DELETE /students',
      register:  'POST /auth/sign-up',
      login:     'POST /auth/sign-in',
    },
  });
});
 
// ── Start Server ──────────────────────────────────────
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📋 Students API: http://localhost:${PORT}/students`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/auth/sign-up`);
});