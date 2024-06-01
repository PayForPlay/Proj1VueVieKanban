// models/Board.js
const mongoose = require('mongoose');
const subtaskSchema = new mongoose.Schema({
  title: { type: String, required : true },
  isCompleted: {type: Boolean, default: false},
})

const taskSchema = new mongoose.Schema({
  title: { type: String, require: true },
  priority: { type: String, default: "Avarege"},
  description: String,
  status: { type: Boolean, default: false },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    autopopulate: { select: '-password'}
   },
  createdAt: {type: Date, default: Date.now},
  responsibleAt: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    autopopulate: { select: '-password' }
   },
  dueAt: {type: Date, required : true},
  subtasks: [subtaskSchema],
});

const columnSchema = new mongoose.Schema({
  name: { type: String, required : true },
  tasks: [taskSchema],
  status: { type: Boolean, default: false}
});

const boardSchema = new mongoose.Schema({
  name: { type: String, required : true },
  columns: {
    type: [columnSchema],
    autopopulate: true,
  },
  status: { type: Boolean, default: false}
});
boardSchema.plugin(require('mongoose-autopopulate'));
const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
