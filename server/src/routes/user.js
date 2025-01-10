const express = require("express");
const router = express.Router();
const {
  uploadUserDetails,
  getUserDetails,
  likeDislike,
  getUserAction
} = require("../controllers/userController");

router.get("/getUserDetails/:email", getUserDetails);
router.post("/uploadUserDetails", uploadUserDetails);
router.post("/likeDislike", likeDislike);
router.get("/getUserAction/:videoId", getUserAction);

module.exports = router;
