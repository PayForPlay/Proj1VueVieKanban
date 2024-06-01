// controllers/authController.js
const AuthService = require('../services/AuthService');

async function register(req, res) {
  try {
    await AuthService.register(req.body);
    res.status(201).json({ message: "Пользователь создан успешно" });
  } catch (error) {
    if (error.message === "Username уже существует") {
      return res.status(409).json({ message: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const token = await AuthService.login(username, password);

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Авторизация успешна", token });
  } catch (error) {
    if (error.message === "Авторизация провалена") {
      return res.status(401).json({ message: error.message });
    }
    
    return res.status(500).json({ error: error.message });
  }
}

function logout(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "Выход из под пользователя успешен" });
}

module.exports = {
  register,
  login,
  logout
};
