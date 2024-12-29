const express = require("express");
const router = express.Router();
const { getAllVideo, getOneVideo } = require("../controllers/getVideoController");

router.get("/getAllVideo/:email", getAllVideo);
router.get("/getOneVideo/:id", getOneVideo);

module.exports = router;
