const mongoose = require("mongoose");

//===================================
const adminSchema = new mongoose.Schema({
  name: String,
  // role: { type: String },
  role: { type: String },

  email: { type: String, unique: true },
  mobile: String,
  password: String,

  password: { type: String, required: true },



  isDeleted: { type: Boolean, default: false },
  createdBy: { type: String, default: "system" },
  updatedBy: { type: String, default: "system" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },




});

adminSchema.pre('save', function (next) {

  this.updatedAt = Date.now();
  next();
});

const adminModel = mongoose.model('admin', adminSchema);
module.exports = adminModel;
