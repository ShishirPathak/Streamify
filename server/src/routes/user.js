const express = require("express");
const router = express.Router();
const {
  uploadUserDetails,
  getUserDetails,
} = require("../controllers/userController");

router.get("/getUserDetails/:email", getUserDetails);
router.post("/uploadUserDetails", uploadUserDetails);

module.exports = router;
