const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Video title
  description: { type: String, required: true }, // Video description
  videoUrl: { type: String, required: true }, // URL to the video stored in S3
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ID of the uploader
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the video was uploaded
  modifiedAt: { type: Date, default: Date.now },
});

const UploadVideoModel = mongoose.model("Video", videoSchema,"videos");

module.exports = UploadVideoModel;
