const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { generateToken } = require('../utils/jwt');
// Inside POST /login handler
const token = generateToken(user);
res.json({ message: 'Login successful', token, user: { id: user._id, name: user.name, isAdmin: user.isAdmin } });

router.post('/register', register);
router.post('/login', login);

module.exports = router;

