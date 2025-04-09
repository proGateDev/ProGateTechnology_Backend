const express = require("express");
const router = express.Router();
const controller = require("../controllers/contactUs");
const upload = require("../../middleware/upload");

//==========================================
router.post("/",controller.submitContactForm);
router.get("/",controller.getAllContactMessages);

//===========================================================
module.exports = router;
