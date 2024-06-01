//services/mailService.js
const Mail = require('../models/Mail');
const User = require('../models/User')

exports.getAllMails = async (req) => {
  const mailList = await Mail.find({
    $or: [
      { 'sender': req.user._id },
      { 'recipients.user': req.user._id, 'recipients.deleted': false }
    ]
  })
  if (!mailList.length) {
    throw new Error('Письмо не найдено');
  }
  return mailList
};

exports.createMail = async (req) => {
  const recipients = req.body.recipients.map(recipient => recipient.user._id);
  const recipientIds = await User.find({ _id: { $in: recipients } }).distinct('_id');
  
  const newMail = new Mail({
    ...req.body,
    recipients: recipientIds.map(userId => ({ user: userId })),
    sender: req.user._id
  });
  
  return await newMail.save();
};

exports.updateMail = async (req) => {
  const response = await Mail.findByIdAndUpdate(req.body._id, req.body, { new: true });
  return response
};

exports.deleteMail = async (req) => {
console.log()
  const updatedMail = {
      ...req.body,
      recipients: req.body.recipients.map(recipient => {
        if (recipient.user._id === req.user._id) {
          return {
            ...recipient,
            deleted: true,
            deletedAt: Date.now()
          };
        }
        return recipient;
      }),
      deleted: req.body.sender._id === req.user._id ? true : req.body.deleted,
      deletedAt: req.body.sender._id === req.user._id ? Date.now() : req.body.deletedAt
    };


  const mail = await Mail.findByIdAndUpdate(updatedMail._id, updatedMail, {new: true });

  // Проверка получателей и отправителя на удаление
  const allDeleted = mail.recipients.every(recipient => recipient.deleted) && mail.deleted;

  if (allDeleted) {
    // Если все удалили, то удалить письмо
    await Mail.findByIdAndDelete(updatedMail._id);
    return null;
  } else {
    // Сохранить обновленное письмо
    return await mail.save();
  }
};