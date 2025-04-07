const express = require("express");
const router = express.Router();
const adminRoutes = require("./admin/routes");

//=================================
router.use("/api/v1/super-admin", adminRoutes);


//=================================

module.exports = router;
