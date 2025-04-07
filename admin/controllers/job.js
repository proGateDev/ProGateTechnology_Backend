

const jobModel = require("../../models/job");
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
  }
}




