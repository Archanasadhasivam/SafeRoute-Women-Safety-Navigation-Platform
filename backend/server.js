const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ─────────────────────────────────────────────
// Import DB Connection
// ─────────────────────────────────────────────
const connectDB = require('./config/db');

// ─────────────────────────────────────────────
// Import Middleware
// ─────────────────────────────────────────────
const logger = require('./middleware/logger');

// ─────────────────────────────────────────────
// Import Routes
// ─────────────────────────────────────────────
const userRoute = require('./Router/userRoute');
const authRoute = require('./Router/authRoute');

// ─────────────────────────────────────────────
// Connect Database
// ─────────────────────────────────────────────
connectDB();

// ─────────────────────────────────────────────
// Allowed Frontend Origins
// ─────────────────────────────────────────────
const allowedOrigins = [
  'https://saferoute-frontend-three.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
];

// ─────────────────────────────────────────────
// CORS Configuration
// ─────────────────────────────────────────────
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman/mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS Not Allowed'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ─────────────────────────────────────────────
// Global Middleware
// ─────────────────────────────────────────────
app.use(express.json());
app.use(logger);

// ─────────────────────────────────────────────
// Root Route
// ─────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🛡️ SafeRoute API is running!',
    status: 'ONLINE',
    timestamp: new Date(),
  });
});

// ─────────────────────────────────────────────
// Health Check Route
// ─────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
  });
});

// ─────────────────────────────────────────────
// API Routes
// ─────────────────────────────────────────────
app.use('/students', userRoute);
app.use('/auth', authRoute);

// ─────────────────────────────────────────────
// 404 Route Handler
// ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// ─────────────────────────────────────────────
// Global Error Handler
// ─────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message,
  });
});

// ─────────────────────────────────────────────
// Local Development Server
// ─────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}

// ─────────────────────────────────────────────
// Export App
// ─────────────────────────────────────────────
module.exports = app;