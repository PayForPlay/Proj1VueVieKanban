//models/Privilege.js
const mongoose = require("mongoose");

const privilegeSchema = new mongoose.Schema({
    name: { type: String, required : true},
    admin: { type: Boolean, default: false },
    allowAdd: { type: Boolean, default: false },
    allowComment: { type: Boolean, default: false },
    allowDrag: { type: Boolean, default: false },
    allowEdit: { type: Boolean, default: false },
    allowRemove: { type: Boolean, default: false }
});

const Privilege = mongoose.model("Privilege", privilegeSchema);

module.exports = Privilege;
