

const jobModel = require("../../models/job");
const JobApplicationModel = require("../../models/jobApplication");
//==================================================



module.exports = {

  createJobPost: async (req, res) => {
    try {
      const {
        title,
        designation,
        location,
        type,
        salary,
        experience,
        vacancies,
        href,
        jobDescription,
      } = req.body;

      // Check for required fields
      // if (
      //   !title ||
      //   !designation ||
      //   !location ||
      //   !type ||
      //   !salary ||
      //   !experience ||
      //   !vacancies ||
      //   !jobDescription
      // ) {
      //   return res.status(400).json({ message: "All required fields must be filled." });
      // }

      // Multer will attach the file to req.file
      const image = req.file ? req.file.path : null;
      const imagePath = `${process.env.MEDIA_BASE_URL}/${image.replace("\\", "/")}`;
      console.log(imagePath);


      const jobPost = new jobModel({
        title,
        designation,
        location,
        type,
        salary,
        experience,
        vacancies,
        image: imagePath, // Stored file path
        href,
        jobDescription,
        createdBy: req.user?._id || "system",
      });

      const savedJob = await jobPost.save();
      return res.status(201).json({ message: "Job posted successfully", data: savedJob });
    } catch (error) {
      console.error("Error creating job post:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  getAllJobs: async (req, res) => {
    try {
      // Optional: you can add query filters here (e.g., by location, type)
      const jobs = await jobModel.find({ isDeleted: false }).sort({ createdAt: -1 });

      return res.status(200).json({
        message: 'Jobs fetched successfully',
        count: jobs.length,
        data: jobs,
      });
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },



  applyToJob: async (req, res) => {
    try {
      const { jobId, name, email, resumeUrl, message, mobile } = req.body;

      // if (!name || !email ) {
      //   return res.status(400).json({ success: false, message: 'All required fields must be filled.' });
      // }

      const newApplication = new JobApplicationModel({
        jobId,
        name,
        mobile,
        email,
        resumeUrl,
        message
      });

      await newApplication.save();

      return res.status(201).json({
        success: true,
        message: 'Application submitted successfully',
        data: newApplication
      });

    } catch (error) {
      console.error('Apply to job error:', error);
      return res.status(500).json({ success: false, message: 'Something went wrong', error });
    }
  },



  getAllAppliedJobs: async (req, res) => {
    try {
      const applications = await JobApplicationModel.find({})
        .sort({ createdAt: -1 })
        .populate({
          path: 'jobId',
          select: 'title location type salary', // Only get necessary fields from job
        });

      // Transform data to include only required fields
      const applicationsData = applications.map((app) => ({
        name: app.name,
        email: app.email,
        mobile: app.mobile,
        jobTitle: app.jobId?.title || '',
        location: app.jobId?.location || '',
        type: app.jobId?.type || '',
        salary: app.jobId?.salary || '',
        appliedAt: app.createdAt,
      }));

      res.status(200).json({
        success: true,
        message: 'Fetched all applied jobs successfully',
        data: applicationsData,
      });
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch applied jobs',
        error: error.message,
      });
    }
  }



}




