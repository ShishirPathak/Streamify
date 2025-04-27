// Controller (src/controllers/engagementController.js)
const redis = require("../config/redis");
const VideoEvent = require("../models/VideoEventSchema"); // MongoDB model
const EngagementModel = require("../models/EngagementModel"); // MongoDB model

const trackProgress = async (req, res) => {
  const { videoId, sessionId, timestamp, playedSeconds, eventType, userId } = req.body;

  // (1) Save to Redis (real-time)
  await redis.zadd(
    `video:${videoId}:timestamps`,
    playedSeconds,
    `${userId}_${sessionId}_${eventType}_${timestamp}_${playedSeconds}`
  );
  res.status(200).json({ success: true });
};

const addToMongoDB = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    console.log("Fetching data from Redis for video id:", videoId);
    const data = await redis.zrange(`video:${videoId}:timestamps`, 0, -1);
// pathakshishir123_session_34nc0iobwwy_forward_2025-02-23T01:30:42.652Z_64

    const promises = data.map(async (item) => {
      const [userId, sessionId, eventType, timestamp, playedSeconds] = item.split("_");
      const event = new VideoEvent({
        videoId,
        userId,
        sessionId,
        eventType,
        playedSeconds,
        timestamp,
      });
      await event.save();
    });
    await Promise.all(promises)

    await redis.del(`video:${videoId}:timestamps`);
    console.log("Data saved to MongoDB");

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error fetching data from Redis:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { trackProgress, addToMongoDB };