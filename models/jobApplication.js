const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  name: String,
  mobile: String,
  email: String,
  resumeUrl: String,
  message: String,
  appliedAt: {
    type: Date,
    default: Date.now
  }
});
const JobApplicationModel = mongoose.model("JobApplication", JobApplicationSchema);
module.exports = JobApplicationModel;

