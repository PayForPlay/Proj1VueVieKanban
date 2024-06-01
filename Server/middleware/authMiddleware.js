// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

 exports.authenticate = async (req, res, next) => {
  // Получение токена из cookies
  let token = req.cookies.token;
  
  // проверка наличия токена
  if (!token) {
    return res.status(401).json({ message: 'Нет токена.', valid: false });
  }

  try {

    
    // Верификация токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userService.findUserById(decoded._id)

    if (!user) {
      return res.status(401).json({ message: 'Пользователдь не найден.', valid: false });
    }
    // Сохранение пользовательской информации
    req.user = decoded;
      req.user.isAdmin = user.privilege.admin

    // дальше
    next();
  } catch (error) {
    res.status(401).json({ message: 'Токен неверный.', valid: false });
  }
};
