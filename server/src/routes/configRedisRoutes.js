const express = require("express");
const router = express.Router();

const { trackProgress, addToMongoDB } = require("../controllers/trackProgress");

router.post("/track-progress", trackProgress);
router.post("/add-to-mongodb/:videoId", addToMongoDB);

module.exports = router;
