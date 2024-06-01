// services/userService.js

const User = require('../models/User');


exports.createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return { _id: user._id, username: user.username };
}

exports.listUsers = async () => {
  const users = await User.find().select('-password');
  
  const formattedUsers = users.map((user) => {
    return {
      ...user._doc,
      fullName: user.name + ' ' + user.secondName + ' ' + user.lastName,
    };
  });
  
  return formattedUsers;
};

exports.findUserById = async (userid) => {
  return await User.findById(userid).select('_id username');
}


exports.updateUserById = async (userId, updateData) => {
  const user = await User.findById(userId);
  if (!user) {
    return null;
  }
  Object.keys(updateData).forEach((update) => user[update] = updateData[update]);
  await user.save();
  return { _id: user._id, username: user.username };
}

exports.deleteUserById = async(userId) => {
  return await User.findByIdAndDelete(userId);
}