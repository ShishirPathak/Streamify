const express = require("express");
const router = express.Router();
const { uploadUserDetails } = require("../controllers/userController");

router.post("/uploadUserDetails", uploadUserDetails);

module.exports = router;
