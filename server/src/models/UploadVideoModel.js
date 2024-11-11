const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Video title
  description: { type: String, required: true }, // Video description
  videoUrl: { type: String, required: true }, // URL to the video stored in S3
  userId: { type: String, required: true }, // ID of the uploader
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

const UploadVideoModel = mongoose.model("Video", videoSchema, "videos");

module.exports = UploadVideoModel;
