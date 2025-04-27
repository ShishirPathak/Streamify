const VideoEventSchema = require("../models/VideoEventSchema");

const engagement = async (req, res) => {
  try {
    const { videoId } = req.params;
    const events = await VideoEventSchema.find({ videoId }).sort({ timestamp: 1 });

    const sessions = {};
    events.forEach((e) => {
      const id = e.sessionId || "unknown";
      if (!sessions[id]) sessions[id] = [];
      sessions[id].push({
        type: e.eventType,
        time: Math.floor(e.playedSeconds),
      });
    });

    const retention = {};
    const skipMap = {};
    const dropOffs = new Set();
    const videoLength = 192; // or set dynamically

    Object.values(sessions).forEach((events) => {
      const watched = new Set();
      let lastPlayed = null;
      const sorted = events.sort((a, b) => a.time - b.time);

      for (let i = 0; i < sorted.length; i++) {
        const e = sorted[i];

        if (e.type === "play" || e.type === "replay") {
          watched.add(e.time);
          lastPlayed = e.time;
        } else if (e.type === "forward" && lastPlayed !== null) {
          const jumpTo = e.time;
          for (let s = lastPlayed + 1; s < jumpTo; s++) {
            skipMap[s] = (skipMap[s] || 0) + 1;
          }
          lastPlayed = jumpTo;
        } else if (e.type === "complete") {
          // Only count completion if the user watched the final 5 seconds before ending
          const endThreshold = videoLength - 5;
          let watchedFinalChunk = false;
        
          for (let sec = endThreshold; sec < videoLength; sec++) {
            if (watched.has(sec)) {
              watchedFinalChunk = true;
              break;
            }
          }
        
          if (watchedFinalChunk) {
            watched.add(videoLength);
            lastPlayed = videoLength;
          }
        }
      }

      watched.forEach((sec) => {
        retention[sec] = (retention[sec] || 0) + 1;
      });

      if (!sorted.some((e) => e.type === "complete") && lastPlayed < videoLength - 5) {
        dropOffs.add(lastPlayed);
      }
    });

    // ✅ Normalize using base = retention[0] || retention[1] || fallback to max
    const fallbackMax = Object.keys(retention).length
      ? Math.max(...Object.values(retention))
      : 1;
    const base = retention[0] || retention[1] || fallbackMax;

    const normalized = {};
    Object.keys(retention).forEach((sec) => {
      const value = (retention[sec] / base) * 100;
      normalized[+sec] = Math.min(+value.toFixed(2), 100);
    });

    // 🧮 Interpolate missing values
    const allSecs = Object.keys(normalized).map(Number).sort((a, b) => a - b);
    const interpolated = {};

    for (let i = 0; i < allSecs.length - 1; i++) {
      const start = allSecs[i];
      const end = allSecs[i + 1];
      const startVal = normalized[start];
      const endVal = normalized[end];

      for (let t = start; t < end; t++) {
        const ratio = (t - start) / (end - start);
        interpolated[t] = +(startVal * (1 - ratio) + endVal * ratio).toFixed(2);
      }
    }

    // Add the last second
    interpolated[allSecs[allSecs.length - 1]] =
      normalized[allSecs[allSecs.length - 1]];

    // 🟦 Final response format
    const result = Object.keys(interpolated).map((sec) => ({
      time: +sec,
      retained: interpolated[sec],
      skipped: skipMap[sec] > 0,
      drop_off: dropOffs.has(+sec),
    }));

    res.json(result);
  } catch (err) {
    console.error("Retention error:", err);
    res.status(500).json({ error: "Retention graph failed" });
  }
};


const retentionGraph = async (req, res) => {
  try {
    const { videoId } = req.params;

    // Fetch only relevant events
    const events = await VideoEventSchema.find({
      videoId,
      eventType: { $in: ["play", "replay", "forward"] },
    }).sort({ timestamp: 1 }); // sort by time for each session

    const sessionMap = {}; // { sessionId: [ {eventType, playedSeconds} ] }
    events.forEach((e) => {
      const sessionId = e.sessionId || "unknown";
      if (!sessionMap[sessionId]) sessionMap[sessionId] = [];
      sessionMap[sessionId].push({
        type: e.eventType,
        time: Math.floor(e.playedSeconds),
      });
    });

    const retention = {}; // total count per second

    // Go session by session
    Object.values(sessionMap).forEach((events) => {
      let prevTime = null;

      for (let i = 0; i < events.length; i++) {
        const curr = events[i];
        const next = events[i + 1];
        const isForward = next && next.type === "forward";

        // Only count if this is play/replay and not followed by forward
        if (curr.type === "play" || curr.type === "replay") {
          const start = prevTime !== null ? prevTime + 1 : curr.time;
          const end = isForward ? curr.time : next ? next.time : curr.time;

          for (let s = start; s <= end; s++) {
            retention[s] = (retention[s] || 0) + 1;
          }

          prevTime = curr.time;
        }

        if (curr.type === "forward") {
          // Reset prevTime because it's a jump
          prevTime = null;
        }
      }
    });

    const allSeconds = Object.keys(retention).map(Number);
    const min = Math.min(...allSeconds);
    const max = Math.max(...allSeconds);
    const maxViewers = Math.max(...Object.values(retention), 1);

    const result = [];
    for (let sec = min; sec <= max; sec++) {
      const count = retention[sec] || 0;
      const percent = (count / maxViewers) * 100;
      result.push({ time: sec, retained: +percent.toFixed(2) });
    }

    // Flag drop-offs (if >30% drop over 15 seconds)
    for (let i = 0; i < result.length - 15; i++) {
      const current = result[i].retained;
      const future = result[i + 15].retained;
      if (current - future > 30) {
        result[i + 15].drop_off = true;
      }
    }

    res.json(result);
  } catch (err) {
    console.error("Retention error:", err);
    res.status(500).json({ error: "Failed to compute retention graph." });
  }
};

const replayForward = async (req, res) => {
  try {
    const { videoId } = req.params;
    const events = await VideoEventSchema.find({
      videoId,
      eventType: { $in: ["rewind", "forward"] },
    });

    const timelineMap = {}; // { second: { time, rewind, forward } }

    events.forEach((event) => {
      const sec = Math.floor(event.playedSeconds);
      if (!timelineMap[sec]) {
        timelineMap[sec] = { time: sec, rewind: 0, forward: 0 };
      }
      if (event.eventType === "rewind") timelineMap[sec].rewind++;
      if (event.eventType === "forward") timelineMap[sec].forward++;
    });

    const result = Object.values(timelineMap).sort((a, b) => a.time - b.time);

    // 🔥 Find top 5 rewatched seconds
    const topRewatches = [...result]
      .sort((a, b) => b.rewind - a.rewind)
      .slice(0, 5)
      .map((d) => d.time);

    const enriched = result.map((d) => ({
      ...d,
      highlight: topRewatches.includes(d.time),
    }));

    res.json(enriched);
  } catch (error) {
    console.error("Replay-Forward API error:", error);
    res.status(500).json({ error: "Failed to get replay/forward timeline" });
  }
};
module.exports = { engagement, retentionGraph, replayForward };
