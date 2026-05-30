const express = require('express');
const router = express.Router();

// ─────────────────────────────────────────────
// Import Auth Controller Functions
// ─────────────────────────────────────────────
const { register, signIn } = require('../Controller/authController');

// POST   /auth/sign-up   → Register a new user (Matches frontend request)
router.post('/sign-up', register);

// POST   /auth/sign-in   → Log in an existing user
router.post('/sign-in', signIn);

module.exports = router;