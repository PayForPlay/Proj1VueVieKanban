//models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  secondName: { type: String, required: true },
  department: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Department', 
    required : true,
    autopopulate: {select: 'name -_id', maxDepth: 1}
  },//ref
  post: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post', 
    required : true,
    autopopulate: {select: 'name -_id', maxDepth: 1}
  },//ref
  // email: { type: String, unique: true },
  phone: { type: String },
  image: { type: String },
  privilege: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Privilege', 
    required: true,
    autopopulate: {maxDepth: 1}
  }
});
userSchema.plugin(require('mongoose-autopopulate'));
const User = mongoose.model("User", userSchema);

module.exports = User;


