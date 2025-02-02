// Controller (src/controllers/engagementController.js)
const redis = require("../config/redis");
const EngagementModel = require("../models/EngagementModel"); // MongoDB model

const trackProgress = async (req, res) => {
  const { videoId, sessionId, timestamp, eventType, userId } = req.body;

  // (1) Save to Redis (real-time)
  await redis.zadd(
    `video:${videoId}:timestamps`,
    timestamp,
    `${userId}_${sessionId}_${eventType}_${timestamp}`
  );

  // (2) Async save to MongoDB (durability)
  try {
    await EngagementModel.create({
      videoId,
      userId,
      sessionId,
      timestamp: new Date(timestamp * 1000), // Convert to Date
      eventType,
      
    });
  } catch (error) {
    console.error("MongoDB write failed (async):", error);
  }

  res.status(200).json({ success: true });
};

module.exports = { trackProgress };