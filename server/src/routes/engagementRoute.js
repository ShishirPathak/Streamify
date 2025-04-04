const express = require("express");
const router = express.Router();

const { engagement, retentionGraph} = require("../controllers/engagementController");

router.get("/engagement/:videoId", engagement);
router.get("/retention/:videoId", retentionGraph);

module.exports = router;
