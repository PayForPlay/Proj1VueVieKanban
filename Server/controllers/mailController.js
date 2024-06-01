const MailService = require('../services/mailService');

exports.getAllMails = async (req, res) => {
  try {
    const mailList = await MailService.getAllMails(req);
    res.status(200).json(mailList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMail = async (req, res) => {
  try {
    const newMail = await MailService.createMail(req);
    res.status(201).json(newMail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMail = async (req, res) => {
  try {
    const updatedMail = await MailService.updateMail(req);
    res.status(201).json({message: 'обновление письма прошло успешно', updatedMail});
    return updatedMail
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMail = async (req, res) => {
  try {
    const updatedMail = await MailService.deleteMail(req);
    if (updatedMail === null) {
      res.status(202).json({message: 'удаление письма прошло успешно', updatedMail});
    } else {
      res.status(201).json({message: 'обновление письма прошло успешно', updatedMail});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};