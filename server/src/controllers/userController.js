const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("../models/userModel");
const UserActionModel = require("../models/userActionModel");
const VideoModel = require("../models/VideoModel");

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

    const { firstName, middleName, lastName, dob, email, userId } = req.body;
    var profileImageUrl = "";

    if (req.file && req.file.location) {
      profileImageUrl = req.file.location;
    } else {
      profileImageUrl = "https://i.pravatar.cc/300";
    }

    try {
      const newUser = new User({
        firstName,
        middleName,
        lastName,
        dob,
        email,
        userId,
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

const getUserDetails = async (req, res) => {
  try {
    const email = req.params.email; // Assuming the email is provided as a URL parameter

    const user = await User.findOne({ email: email }); // Find user by email

    if (user) {
      res.status(200).json(user); // Respond with user details if found
    } else {
      res.status(404).json({ message: "User not found" }); // User not found
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user details", error: error.message }); // Error handling
  }
};

const likeDislike = async (req, res) => {
  const { userId, videoId, action } = req.body; // action can be 'like', 'dislike', or 'none'

  // Find the existing user action
  const userAction = await UserActionModel.findOne({ userId, videoId });

  // If the user has not previously liked or disliked the video, create a new user action
  if (!userAction) {
    await UserActionModel.create({ userId, videoId, action });
  } else {
    // If the user has previously liked or disliked the video, update the user action
    userAction.action = action;
    await userAction.save();
  }

  // Update the like and dislike counts for the video
  const likes = await UserActionModel.countDocuments({
    videoId,
    action: "like",
  });
  const dislikes = await UserActionModel.countDocuments({
    videoId,
    action: "dislike",
  });
  await VideoModel.updateOne({ _id: videoId }, { likes, dislikes });

  res.send({ likes, dislikes });
};

const getUserAction = async (req, res) => {
  const { videoId } = req.params;
  const { userId } = req.query;
  try {
    const userAction = await UserActionModel.findOne({ userId, videoId });
    if (userAction) {
      res.json({ userAction: userAction});
    } else {
      res.json({ userAction: "none" });
    }
  } catch (error) {
    console.error(error);
    res
      .json(500)
      .json({ error: "An error occurred while fetching the user action" });
  }
};

module.exports = { uploadUserDetails, getUserDetails, likeDislike, getUserAction };
