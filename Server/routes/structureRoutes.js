// routes/structureRoutes.js

const express = require('express');
const router = express.Router();
const structureController = require('../controllers/structureController');


router.get('/dep', structureController.getAlldepartments);
router.get('/post', structureController.getAllposts);

module.exports = router;
