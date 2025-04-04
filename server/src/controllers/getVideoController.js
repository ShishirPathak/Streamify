const VideoModel = require("../models/VideoModel");

const getAllVideo = async (req, res) => {
  try {
    const email = req.params.email;
    // const videoDetails = await VideoModel.find({ email: email });
    const videoDetails = await VideoModel.find();
    if (videoDetails) {
      console.log("getAllVideo");
      res.status(200).json(videoDetails);
    } else {
      res.status(400).json({ message: "No videos found !!" });
    }
  } catch (error) {
    console.error("getAllVideo", error);
  }
};

const getOneVideo = async (req, res) => {
  try {
    console.log("getOneVideo");
    const id = req.params.id;
    const videoDetails = await VideoModel.findOne({ _id: id });
    if (videoDetails) {
      res.status(200).json(videoDetails);
    } else {
      res.status(400).json({ message: "No videos found !!" });
    }

  } catch (error) {
    console.error("getOneVideo", error);

  }
};

module.exports = { getAllVideo, getOneVideo };
