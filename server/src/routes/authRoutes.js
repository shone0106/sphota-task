const express = require('express');
const { register, login, getAuthenticatedUser, logout } = require('../controllers/authController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, getAuthenticatedUser)
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout)

module.exports = router;

