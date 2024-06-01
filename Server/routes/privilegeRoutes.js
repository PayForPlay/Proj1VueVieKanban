// routes/privilegeRoutes.js

const express = require('express');
const router = express.Router();
const privilegeController = require('../controllers/privilegeController');

router.get('/', privilegeController.getAllprivilege);

module.exports = router;
