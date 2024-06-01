//services/structureService.js
const Department = require('../models/Structure');

exports.getAlldepartments = async () => {
  const departmentList = await Department.Department.find({}, 'name');

  // const departmentList = await Department.find({}, 'name');
  if (!departmentList.length) {
    throw new Error('Подразделения не найдено');
  }
  return departmentList;
};