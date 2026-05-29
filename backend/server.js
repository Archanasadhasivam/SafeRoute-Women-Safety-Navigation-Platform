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
const userRoute   = require('./Router/userRoute');
const authRoute   = require('./Router/authRoute');
const taskRoutes  = require('./Router/taskRoutes');
const routeRoutes = require('./Router/routeRoutes');

// ── Connect to MongoDB ────────────────────────────────
connectDB();

// ── CORS Configuration ────────────────────────────────
app.use(cors({
  origin: [
    'https://saferoute-frontend-three.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ── Built-in Middleware ───────────────────────────────
app.use(express.json());

// ── Custom Logger Middleware ──────────────────────────
app.use(logger);

// ── API Route Registration ────────────────────────────
app.use('/students',   userRoute);
app.use('/auth',       authRoute);
app.use('/tasks',      taskRoutes);
app.use('/api/routes', routeRoutes);

// ── Root Route ────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: '🛡️ SafeRoute Spatial Assessment API Engine is fully active!',
    status: 'ONLINE',
    timestamp: new Date(),
    endpoints: {
      students: 'GET/POST/PUT/DELETE /students',
      auth:     'POST /auth/sign-up | POST /auth/sign-in | GET /auth/users',
      tasks:    'GET/POST/DELETE /tasks',
      routes:   'GET /api/routes',
    }
  });
});

// ── 404 Handler ───────────────────────────────────────
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Cannot execute ${req.method} on ${req.originalUrl}.`,
  });
});

// ── Global Error Handler ──────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Server Internal Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'A critical routing exception occurred.',
    error: err.message,
  });
});

// ── Start Server ──────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`✅ SafeRoute Kernel running on http://localhost:${PORT}`);
  console.log(`======================================================`);
});