//models/Mail.js
const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  sender: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    autopopulate: { select: '-password'}
   },
  recipients: [ {
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
      autopopulate: { select: '-password'}
    },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    readStatus: { type: Boolean, default: false }
  }],
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

emailSchema.plugin(require('mongoose-autopopulate'));
const Email = mongoose.model('Email', emailSchema);

module.exports = Email;