// services/AuthService.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const secretKey = process.env.JWT_SECRET;

class AuthService {
  static async register(data) {
    console.log(data);
    const user = await User.findOne({ username: data.username });

    if (user) {
      throw new Error("Username уже существует");
    }

    const hash = await bcrypt.hash(data.password, 10);
    const newUser = new User({
      ...data,
      password: hash,
      department: data.department.value,
      post: data.post.value,
      privilege: data.privilege.value,
    });
    await newUser.save();

    return newUser;
  }

  static async login(username, password) {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("Ошибка авторизации");
    }

    const result = await bcrypt.compare(password, user.password);

    if (result) {
      const token = jwt.sign(
        { username: user.username, _id: user._id },
        secretKey,
        { expiresIn: "1w" }
      );
      return token;
    } else {
      throw new Error("Ошибка авторизации");
    }
  }
}

module.exports = AuthService;
