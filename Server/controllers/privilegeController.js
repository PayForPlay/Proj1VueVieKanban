//controllers/privilegecontroller.js
const privilegeService = require('../services/privilegeService');

exports.getAllprivilege = async (req, res) => {
  try {
    const privilegeList = await privilegeService.getAllprivilege();
    res.status(200).json(privilegeList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}