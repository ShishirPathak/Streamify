const redis = require("../config/redis");

const trackProgress = async (req, res) => {
  const { videoId, sessionId, timestamp, eventType, userId } = req.body;
  try {
    if (!videoId || !sessionId || !timestamp || !eventType || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await redis.zadd(
      `video:${videoId}:timestamps`,
      timestamp,
      `${userId}_${sessionId}_${eventType}_${timestamp}`
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("trackProgress Error: ", error);
    res.status(500).json({ error: "Failed to track progress" });
  }
};

module.exports = { trackProgress };
