const express = require("express");
const router = express.Router();
const controller = require("../controllers/job");
const upload = require("../../middleware/upload");

//==========================================
router.post("/", upload.single('resume'),controller.createJobPost);
router.get("/",controller.getAllJobs);

router.post("/apply", controller.applyToJob);
router.get("/applied", controller.getAllAppliedJobs);
//===========================================================
module.exports = router;
