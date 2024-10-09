const express = require('express')
const { register, login, registerAdmin } = require('../Controllers/auth.controller')

const router = express.Router()

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Register as Admin
router.post('/register-admin', registerAdmin);

module.exports = router;