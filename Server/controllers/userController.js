// controllers/userController.js

const userService = require('../services/userService');

exports.createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

exports.listUsers = async (req, res) => {
  try {
    const users = await userService.listUsers();
    if (!users) throw new Error('No users found.');
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

exports.findUserById = async (req, res) => {
  try {
    const user = await userService.findUserById(req.params.id);
    if (!user) throw new Error('User not found');
    return res.status(200).json(user);
  } catch (error) {
    return res.status(error.message === 'User not found' ? 404 : 500).json({ message: error.message });
  }
}

exports.findUserByName = async (req, res) =>  {
  try {
    const user = await userService.findUserByName(req.params.username);
    if (!user) throw new Error('User not found');
    return res.status(200).json(user);
  } catch (error) {
    return res.status(error.message === 'User not found' ? 404 : 500).json({ message: error.message });
  }
}

exports.updateUserById = async (req, res) => {
  try {
    const user = await userService.updateUserById(req.params.id, req.body);
    if (!user) throw new Error('Пользователь не найден');
    return res.status(200).json(user);
  } catch (error) {
    return res.status(error.message === 'Пользователь не найден' ? 404 : 500).json({ message: error.message });
  }
}

exports.deleteUserById = async (req, res) =>  {
  try {
    console.log(req.data);
    const user = await userService.deleteUserById(req.body._id);
    if (!user) throw new Error('Пользователь не найден');
    return res.status(200).json("Удаление прошло успешно");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}