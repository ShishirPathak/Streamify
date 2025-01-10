const mongoose = require('mongoose');

const userActionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
    action: { type: String, enum: ['like', 'dislike', 'none'], default: 'none' },
    comment: { type: String },
    commentCreatedAt: { type: Date },
    watchTime: { type: Number, default: 0 },
    replays: { type: Number, default: 0 },
    segmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Segment' },
  });

  const UserActionModel = mongoose.model("UserAction", userActionSchema, "userActions");
  module.exports = UserActionModel ;