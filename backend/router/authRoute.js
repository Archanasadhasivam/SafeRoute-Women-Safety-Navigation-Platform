'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');

// ─────────────────────────────────────────────
// Import Auth Controller Functions
// ─────────────────────────────────────────────
const { register, signIn } = require(path.join(__dirname, '..', 'controller', 'authController'));

// POST   /auth/sign-up   → Register a new user
router.post('/sign-up', register);

// POST   /auth/sign-in   → Log in an existing user
router.post('/sign-in', signIn);

module.exports = router;