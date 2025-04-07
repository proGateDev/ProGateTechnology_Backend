const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship", "Remote"],
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  vacancies: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: "/default-job.png",
  },
  href: {
    type: String,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    default: 'Admin',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Automatically update the updatedAt timestamp
jobPostSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const JobModel = mongoose.model("Job", jobPostSchema);
module.exports = JobModel;
