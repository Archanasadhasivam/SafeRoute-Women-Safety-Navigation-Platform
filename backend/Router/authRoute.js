const express = require('express');
const router = express.Router();
const { register, signIn } = require('../Controller/authController');

router.post('/register', register);
router.post('/sign-in', signIn);

module.exports = router;