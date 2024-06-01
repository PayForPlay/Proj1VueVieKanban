// routes/mailRoutes.js

const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');
const { emitUpdateToOthers } = require('../middleware/updatesSubscribe');
const Server = require('../Server')
const io = Server.getIO()

router.get('/', mailController.getAllMails);
router.post('/', emitUpdateToOthers("updateMail", "updateMail")(io), mailController.createMail);
router.put('/', emitUpdateToOthers("updateMail", "updateMail")(io), mailController.updateMail);
router.delete('/', emitUpdateToOthers("updateMail", "updateMail")(io), mailController.deleteMail);

module.exports = router;
