// routes/userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/',  userController.listUsers);
router.get('/:id',  userController.findUserById);
router.patch('/:id',  userController.updateUserById);
router.delete('/',  userController.deleteUserById);

module.exports = router;
