const express = require("express");
const router = express.Router();

const { engagement, retentionGraph, replayForward} = require("../controllers/engagementController");

router.get("/engagement/:videoId", engagement);
router.get("/retention/:videoId", retentionGraph);
router.get("/replayForward/:videoId", replayForward);

module.exports = router;
