const express = require('express');
const cors = require('cors');
const app = express();

// ── Import DB Connection ──
const connectDB = require('./config/db');

// ── Import Middleware ──
const logger = require('./middleware/logger');

// ── Import Routes (Fixed casing to lowercase 'router') ──
const userRoute = require('./router/userRoute');
const authRoute = require('./router/authRoute');

// Connect to MongoDB
connectDB();

// ── CORS Configuration ──
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

// ── Global Middleware ──
app.use(express.json());
app.use(logger);

// ── API Routes ──
app.use('/students', userRoute);
app.use('/auth', authRoute);

// ── Root Endpoint ──
app.get('/', (req, res) => {
  res.json({
    message: '🛡️ SafeRoute API is running!',
    status: 'ONLINE',
    timestamp: new Date(),
  });
});

// ── 404 Handler (Catch-all for undefined routes) ──
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// ── Global Error Handling Middleware ──
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: err.message,
  });
});

// ── For local development ──
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;