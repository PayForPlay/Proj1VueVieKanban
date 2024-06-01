//services/privilegeService.js
const privilege = require('../models/Privilege');

exports.getAllprivilege = async () => {
  const privilegeList = await privilege.find({}, 'name');

  if (!privilegeList.length) {
    throw new Error('Привилегия не найдена');
  }
  return privilegeList;
};