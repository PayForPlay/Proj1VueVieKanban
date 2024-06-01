//models/Structure.js
const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: { type: String, required : true, unique: true }
});

const postSchema = new mongoose.Schema({
    name: { type: String, require: true, unique: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true }
  });

  exports.Department = mongoose.model("Department", departmentSchema);
  
  exports.Post = mongoose.model("Post", postSchema);

