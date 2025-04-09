const express = require("express");
const router = express.Router();
const adminAuthRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job");
const blogsRoutes = require("./routes/blogs");
const contactUsRoutes = require("./routes/contactUs");

//===========================================================

router.use("/auth", adminAuthRoutes);
router.use("/job", jobRoutes);
router.use("/blogs", blogsRoutes);
router.use("/contact-us", contactUsRoutes);


//===========================================================


module.exports = router;

