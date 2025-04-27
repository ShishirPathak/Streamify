const VideoModel = require("../models/VideoModel.js");

const likeVideo = async (req, res) => {
  console.log("likeVideo called with id: " + req.params.id);
  try {
    const video = await VideoModel.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { likes: 1 },
      },
      {
        new: true,
      }
    );
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const dislikeVideo = async (req, res) => {
  console.log("dislikeVideo called with id: " + req.params.id);

  try {
    const video = await VideoModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { dislikes: 1 } },
      { new: true }
    );
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addComment = async (req, res) => {
  console.log("addComment called with id: " + req.params.id);

  try {
    const video = await VideoModel.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: req.body } },
      { new: true }
    );
    res.json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { likeVideo, dislikeVideo, addComment };
