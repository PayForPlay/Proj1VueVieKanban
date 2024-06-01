// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware')
const { Init }  = require('../models/InitDB')
router.get('/InitDB', Init);


router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/checkToken', authenticate, (req, res) => {
  res.status(200).json({ valid: true, userId: req.user._id, isAdmin: req.user.isAdmin});

});

module.exports = router;
