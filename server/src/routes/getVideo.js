const express = require("express");
const router = express.Router();
const { getVideoDetails } = require("../controllers/getVideoController");

router.get("/getVideoDetails/:email", getVideoDetails);

module.exports = router;
