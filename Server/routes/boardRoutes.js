// routes/boardRoutes.js
const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const { emitUpdateToOthers } = require('../middleware/updatesSubscribe');
const Server = require('../Server')
const io = Server.getIO()


router.get('/', boardController.getBoardData);
router.post('/', emitUpdateToOthers("updateBoard", "updateBoard")(io), boardController.addBoard);
router.put('/', emitUpdateToOthers("updateBoard", "updateBoard")(io), boardController.updateBoard);
router.delete('', emitUpdateToOthers("updateBoard", "updateBoard")(io), boardController.deleteBoard);
router.post('/tasks', emitUpdateToOthers("updateBoard", "updateBoard")(io), boardController.addTask);
router.delete('/tasks', emitUpdateToOthers("updateBoard", "updateBoard")(io), boardController.deleteTask);
router.put('/tasks', emitUpdateToOthers("updateBoard", "updateBoard")(io), boardController.updateTask);
router.put('/subtasks', emitUpdateToOthers("updateBoard", "updateBoard")(io), boardController.updateSubtask);

module.exports = router;