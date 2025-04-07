const express = require("express");
const router = express.Router();
const adminAuthRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job");
const blogsRoutes = require("./routes/blogs");

//===========================================================

router.use("/auth", adminAuthRoutes);
router.use("/job", jobRoutes);
router.use("/blogs", blogsRoutes);


//===========================================================


module.exports = router;

