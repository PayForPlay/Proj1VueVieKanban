//services/structureService.js
const Post = require('../models/Structure');

exports.getAllposts = async () => {
  const postList = await Post.Post.find({}, 'name');
  if (!postList.length) {
    throw new Error('Должность не найдена');
  }
  return postList;
};