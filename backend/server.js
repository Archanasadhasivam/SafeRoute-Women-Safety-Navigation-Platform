// ── SafeRoute Backend Server ──────────────────────────
// Student Management REST API
// Port: 3000
 
const express = require('express');
const app = express();
 
// ── Import Middleware ─────────────────────────────────
const logger = require('./middleware/logger');
 
// ── Import Routes ─────────────────────────────────────
const userRoute = require('./Router/userRoute');
 
// ── Built-in Middleware ───────────────────────────────
app.use(express.json()); // Parse incoming JSON request body
 
// ── Custom Logger Middleware ──────────────────────────
// Logs METHOD + URL for every request
app.use(logger);
 
// ── Routes ────────────────────────────────────────────
app.use('/students', userRoute);
 
// ── Root Route ────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: '🛡️ SafeRoute Student Management API is running!',
    endpoints: {
      fetchAll:  'GET    /students',
      addNew:    'POST   /students',
      update:    'PUT    /students/:id',
      delete:    'DELETE /students/:id',
    },
  });
});
 
// ── Start Server ──────────────────────────────────────
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`📋 Student API ready at http://localhost:${PORT}/students`);
});
 
