const express = require("express");
const router = express.Router();
const {
  getAllVideo,
  getOneVideo,
} = require("../controllers/getVideoController");
const {
  likeVideo,
  dislikeVideo,
  addComment,
} = require("../controllers/videoController");

router.get("/getAllVideo/:email", getAllVideo);
router.get("/getOneVideo/:id", getOneVideo);
router.post("/likeVideo/:id", likeVideo);
router.post("/dislikeVideo/:id", dislikeVideo);
router.post("/addComment/:id", addComment);

module.exports = router;
