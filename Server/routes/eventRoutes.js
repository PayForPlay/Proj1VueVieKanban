// routes/eventRoutes.js

const { Router } = require('express');
const eventController = require('../controllers/eventController');

const router = Router();

router.get('/', eventController.getEvents);
router.post('/',  eventController.addEvent);
router.delete('/',  eventController.deleteEvent);
router.put('/',  eventController.updateEvent);

module.exports = router;
