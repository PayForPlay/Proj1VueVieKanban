//controllers/structurecontroller.js
const departmentService = require('../services/departmentService');
const postService = require('../services/postService')

exports.getAlldepartments = async (req, res) => {
  try {
    const departmentList = await departmentService.getAlldepartments();
    res.status(200).json(departmentList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllposts = async (req, res) => {
  try {
    const postList = await postService.getAllposts();
    res.status(200).json(postList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};