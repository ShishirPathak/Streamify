const express = require("express");
const router = express.Router();
const { uploadVideo } = require("../controllers/uploadVideoController");

router.post("/", uploadVideo);

module.exports = router;
