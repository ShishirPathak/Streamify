const express = require("express");
const router = express.Router();

const { trackProgress } = require("../controllers/trackProgress");

router.post("/track-progress", trackProgress);

module.exports = router;
