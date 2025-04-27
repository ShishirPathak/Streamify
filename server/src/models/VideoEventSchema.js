const mongoose = require('mongoose');

// Define the schema
const VideoEventSchema = new mongoose.Schema({
  videoId: String,
  userId: String,
  sessionId: String,
  playedSeconds:String,
  timestamp: Date,
  eventType: String,
});

module.exports = mongoose.model('VideoEvent', VideoEventSchema);