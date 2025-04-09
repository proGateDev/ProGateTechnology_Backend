const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  mail: { type: String, required: true },
  message: { type: String, required: true },
  designation: { type: String, required: false },
}, { timestamps: true });



const contactUsModel = mongoose.model("ContactUs", contactMessageSchema);
module.exports = contactUsModel;
