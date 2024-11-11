const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("../models/userModel");


require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { S3Client } = require("@aws-sdk/client-s3");
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const multer = require("multer");
const multerS3 = require("multer-s3");

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, `profile-images/${Date.now()}_${file.originalname}`);
    },
  }),
}).single("profileImage");

const uploadUserDetails = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("S3 Upload Error:", err);
      return res.status(500).json({ error: "Error uploading file to S3" });
    }

    const { firstName, middleName, lastName, dob, email } = req.body;
    const profileImageUrl = req.file.location;

    try {
      const newUser = new User({
        firstName,
        middleName,
        lastName,
        dob,
        email,
        profileImageUrl,
      });

      await newUser.save();
      res.status(201).json({ message: "User and image saved successfully!" });
    } catch (error) {
      console.error("Error saving user to MongoDB:", error);
      res.status(500).json({ error: "Error saving user data" });
    }
  });
};

module.exports = { uploadUserDetails };
