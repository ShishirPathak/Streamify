const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true }, // Video title
  description: { type: String, required: true }, // Video description
  videoUrl: { type: String, required: true }, // URL to the video stored in S3
  userId: { type: String, required: true }, // ID of the uploader
  email: { type: String, required: true }, // email of the uploader
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
  category: { type: String, required: true },
});

const UploadVideoModel = mongoose.model("Video", videoSchema, "videos");

module.exports = UploadVideoModel;
