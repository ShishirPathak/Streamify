const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: String,
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

const segmentSchema = new mongoose.Schema({
  start: Number,
  end: Number,
  watchTime: { type: Number, default: 0 },
  replays: { type: Number, default: 0 },
});

const videoSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  userId: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
  category: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  watchTime: { type: Number, default: 0 },
  replays: { type: Number, default: 0 },
  comments: [commentSchema],
  segments: [segmentSchema],
});

const VideoModel = mongoose.model("Video", videoSchema, "videos");
module.exports = VideoModel;