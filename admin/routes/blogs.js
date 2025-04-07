const express = require("express");
const router = express.Router();
const controller = require("../controllers/blogs");
//==========================================
router.post("/", controller.createBlog);
router.get("/", controller.getAllBlogs);
router.get("/:blogId", controller.getBlogBySlug);

//===========================================================
module.exports = router;
