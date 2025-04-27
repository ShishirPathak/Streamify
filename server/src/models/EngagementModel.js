const mongoose = require("mongoose");
const { create } = require("./userModel");

const engagementSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  userId: { type: String, required: true },
  sessionId: { type: String, required: true },
  eventType: { type: String, required: true },
  timestamp: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const EngagementModel = mongoose.model("Engagement", engagementSchema, "engagements");
module.exports = EngagementModel;
