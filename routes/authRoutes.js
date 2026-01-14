const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isGuest } = require('../middleware/authMiddleware');

router.get('/login', isGuest, authController.formLogin);
router.post('/login', isGuest, authController.processLogin);
router.get('/register', isGuest, authController.formRegister);
router.post('/register', isGuest, authController.processRegister);
router.post('/logout', authController.logout);

module.exports = router;