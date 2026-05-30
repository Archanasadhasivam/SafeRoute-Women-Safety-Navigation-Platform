'use strict';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

// ─── Vercel Serverless MongoDB Connection Cache ────────────────────────────────
// Cached at module scope so the connection persists across warm invocations.
// On a cold start, connectDB() awaits a fresh connection before handlers run.
let cachedConnection = null;

async function connectDB() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('❌ MongoDB URI is not defined in environment variables.');
  }

  try {
    const conn = await mongoose.connect(uri, {
      // These options prevent Vercel from hanging on cold starts
      serverSelectionTimeoutMS: 5000,   // fail fast if Atlas is unreachable
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 1,
      // Keeps the connection alive between serverless invocations
      bufferCommands: false,
    });

    cachedConnection = conn;
    console.log('✅ MongoDB connected:', mongoose.connection.host);
    return conn;
  } catch (err) {
    cachedConnection = null;
    console.error('❌ MongoDB connection error:', err.message);
    throw err;
  }
}

// ─── Express App ───────────────────────────────────────────────────────────────
const app = express();

// CORS — allow your Vercel frontend + localhost dev
const allowedOrigins = [
  'https://saferoute-frontend-three.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS blocked: origin ${origin} not allowed`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── DB-aware middleware ───────────────────────────────────────────────────────
// Every request awaits a live DB connection BEFORE reaching any route handler.
// This is the key fix for Vercel cold-start race conditions.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB connection middleware failed:', err.message);
    return res.status(503).json({
      success: false,
      message: 'Database unavailable. Please try again shortly.',
      error: err.message,
    });
  }
});

// ─── Optional request logger (safe for serverless) ────────────────────────────
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ─── Routes ───────────────────────────────────────────────────────────────────
// Use path.join for Linux case-sensitivity safety.
// All folder names are lowercased here — rename your folders on disk to match.
const userRoute = require(path.join(__dirname, 'router', 'userRoute'));
const authRoute = require(path.join(__dirname, 'router', 'authRoute'));

app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: '🛡️ SafeRoute API is running!',
    status: 'ONLINE',
    dbState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.use('/students', userRoute);
app.use('/auth', authRoute);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ─── Local dev server (Vercel ignores this block) ─────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`✅ Local server running → http://localhost:${PORT}`)
  );
}

module.exports = app;