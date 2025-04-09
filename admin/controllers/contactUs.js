

const contactUsModel = require("../../models/contactUs");
const jobModel = require("../../models/job");
const { contactUsValidation } = require("../validation/contactUs");
//==================================================



module.exports = {

  submitContactForm: async (req, res) => {
    try {
      const { error, value } = contactUsValidation.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: 400,
          message: error.details[0].message
        });
      }

      const contactMessage = new contactUsModel(value);
      await contactMessage.save();

      res.status(201).json({
        status: 201,
        message: 'Message submitted successfully'
      });
    } catch (err) {
      console.error('Contact Form Error:', err);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getAllContactMessages: async (req, res) => {
    try {
      const contactMessages = await contactUsModel.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        total: contactMessages.length,
        data: contactMessages
      });
    } catch (err) {
      console.error('Fetch Contact Messages Error:', err);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }



}




